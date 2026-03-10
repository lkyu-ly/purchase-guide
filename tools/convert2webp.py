#!/usr/bin/env python3
"""
convert2webp.py - 将 VitePress 项目中被引用的图片批量转换为 WebP 格式

用法：
    python convert2webp.py              # 预扫描，生成报告（不修改任何文件）
    python convert2webp.py --confirm    # 执行实际转换

执行流程：
    阶段1（默认）：扫描所有 .md 文件 → 提取图片引用 → 验证文件存在性
                   → 计算未引用图片 → 写入报告（只读，不修改任何文件）
    阶段2（--confirm）：备份 .md → 转换 PNG/JPG→WebP → 原子更新 .md 引用
                        → 移动原始图片到 test/ → 移动未引用图片到 test/
                        → 追加执行报告（任一步失败则完整回滚）

依赖：
    pip install Pillow
"""

import argparse
import re
import shutil
import sys
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from urllib.parse import unquote

try:
    from PIL import Image
except ImportError:
    print("错误：缺少 Pillow 库，请执行 pip install Pillow")
    sys.exit(1)

# ─── 路径配置 ──────────────────────────────────────────────────────────────────

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DOCS_ROOT = PROJECT_ROOT / "docs"

SCAN_DIRS = [
    DOCS_ROOT / "evaluation",
    DOCS_ROOT / "introduction",
    DOCS_ROOT / "recommend",
    DOCS_ROOT / "misc",
]

OUTPUT_DIR = Path("/home/lkyu/git-repo/test")
REPORT_FILE = OUTPUT_DIR / "convert2webp_report.txt"

# 支持扫描和转换的图片后缀（小写）
IMAGE_SUFFIXES = {".png", ".jpg", ".jpeg", ".svg"}

# 匹配标准 ./assets/ 引用：
#   <img src="./assets/foo.png" />  或  <img src='./assets/foo.jpg'>
#   ![alt](./assets/foo.png)
IMG_PATTERN = re.compile(
    r'(?:src=["\'])(\.\/assets\/[^"\']+?\.(?:png|jpg|jpeg|svg))(?:["\'])'
    r"|"
    r'(?:!\[[^\]]*\]\()(\.\/assets\/[^)]+?\.(?:png|jpg|jpeg|svg))(?:\))',
    re.IGNORECASE,
)

# 匹配跨目录引用（如 ../evaluation/assets/foo.jpg），仅用于保护，不转换
CROSS_DIR_PATTERN = re.compile(
    r'(?:src=["\'])(\.\.[^"\']+?\.(?:png|jpg|jpeg|svg))(?:["\'])'
    r"|"
    r'(?:!\[[^\]]*\]\()(\.\.[^)]+?\.(?:png|jpg|jpeg|svg))(?:\))',
    re.IGNORECASE,
)


# ─── 数据结构 ──────────────────────────────────────────────────────────────────

@dataclass
class ImageRef:
    """表示 .md 文件中的一个图片引用"""
    md_file: Path       # 来源 .md 文件的绝对路径
    original_ref: str   # 引用路径原文（可能含 %20 等 URL 编码）
    decoded_ref: str    # URL 解码后的引用路径（用于解析磁盘路径）
    abs_path: Path      # 引用图片的实际磁盘绝对路径
    line_num: int       # 在 .md 中的行号（1-based）
    full_match: str     # 完整匹配串（如 src="./assets/foo.png"），用于精确替换


@dataclass
class ScanResult:
    """预扫描阶段的全量结果"""
    md_files: list = field(default_factory=list)
    # 所有 ./assets/ 标准引用（含 SVG）
    all_refs: list = field(default_factory=list)
    # 跨目录引用指向的绝对路径集合（保护这些文件不被误移）
    cross_protected: set = field(default_factory=set)
    # 引用存在但图片文件缺失的引用列表
    missing_refs: list = field(default_factory=list)
    # 所有 assets/ 子目录下扫描到的图片文件（绝对路径集合）
    all_asset_images: set = field(default_factory=set)
    # 被 ./assets/ 引用覆盖的图片路径集合
    referenced_paths: set = field(default_factory=set)
    # 未被任何引用覆盖的图片（将移动到 test/）
    unreferenced_images: set = field(default_factory=set)
    # 被引用的 SVG 图片路径（跳过转换，不移动，不修改引用）
    svg_paths: set = field(default_factory=set)
    # 待转换的唯一图片路径集合（PNG/JPG，已去重）
    images_to_convert: set = field(default_factory=set)
    # 是否存在致命错误（有缺失引用时为 True）
    has_error: bool = False


# ─── 阶段1：预扫描（只读）────────────────────────────────────────────────────

def find_md_files(dirs: list) -> list:
    """
    递归查找目标目录中的所有内容 .md 文件。
    排除 CLAUDE.md（项目内部文档，可能含示例图片引用，不应纳入扫描）。
    """
    result = []
    for d in dirs:
        d = Path(d)
        if d.is_dir():
            for f in sorted(d.rglob("*.md")):
                if f.name != "CLAUDE.md":
                    result.append(f)
    return result


def extract_refs(md_file: Path) -> tuple:
    """
    从单个 .md 文件中提取所有图片引用。

    返回:
        standard_refs: List[ImageRef] - ./assets/ 格式的引用（需处理）
        cross_protected: Set[Path]    - 跨目录引用解析后的绝对路径（仅用于保护）
    """
    standard_refs = []
    cross_protected = set()

    try:
        content = md_file.read_text(encoding="utf-8")
    except OSError as e:
        raise RuntimeError(f"无法读取文件 {md_file}: {e}")

    for line_num, line in enumerate(content.splitlines(), start=1):
        # 提取标准 ./assets/ 引用
        for m in IMG_PATTERN.finditer(line):
            ref = m.group(1) or m.group(2)
            decoded = unquote(ref)
            abs_path = (md_file.parent / decoded).resolve()
            standard_refs.append(
                ImageRef(
                    md_file=md_file,
                    original_ref=ref,
                    decoded_ref=decoded,
                    abs_path=abs_path,
                    line_num=line_num,
                    full_match=m.group(0),
                )
            )

        # 提取跨目录引用（仅收集绝对路径，防止被误判为未引用）
        for m in CROSS_DIR_PATTERN.finditer(line):
            ref = m.group(1) or m.group(2)
            abs_path = (md_file.parent / unquote(ref)).resolve()
            cross_protected.add(abs_path)

    return standard_refs, cross_protected


def scan_asset_images(dirs: list) -> set:
    """
    扫描所有 assets/ 子目录中的图片文件（完整递归）。
    - 找出各扫描目录下所有名为 assets/ 的目录（如 recommend/old/assets/）
    - 对每个 assets/ 目录进行完整递归扫描，包含其下的 old/ 等子目录
      （如 evaluation/assets/old/、introduction/assets/old/）
    返回绝对路径集合。
    """
    images = set()
    for d in dirs:
        for assets_dir in Path(d).rglob("assets"):
            if assets_dir.is_dir():
                for f in assets_dir.rglob("*"):
                    if f.is_file() and f.suffix.lower() in IMAGE_SUFFIXES:
                        images.add(f.resolve())
    return images


def do_prescan(dirs: list) -> ScanResult:
    """
    预扫描主函数：只读操作，不修改任何文件。

    执行步骤：
      1. 递归查找所有内容 .md 文件
      2. 从每个 .md 文件提取图片引用
      3. 验证所有引用图片是否在磁盘存在（有缺失则设置 has_error=True 并提前返回）
      4. 扫描所有 assets/ 目录下的图片文件
      5. 分类：SVG（跳过）、待转换（PNG/JPG）、已引用路径
      6. 计算未引用图片（排除跨目录引用保护的文件）
    """
    result = ScanResult()

    # 1. 找出所有内容 .md 文件
    result.md_files = find_md_files(dirs)

    # 2. 提取所有图片引用
    for md_file in result.md_files:
        std_refs, cross = extract_refs(md_file)
        result.all_refs.extend(std_refs)
        result.cross_protected.update(cross)

    # 3. 验证所有引用图片存在性
    for ref in result.all_refs:
        if not ref.abs_path.exists():
            result.missing_refs.append(ref)

    if result.missing_refs:
        result.has_error = True
        return result  # 有缺失则立即终止，不进行后续扫描

    # 4. 扫描 assets/ 目录下的所有图片
    result.all_asset_images = scan_asset_images(dirs)

    # 5. 分类已引用图片（SVG vs 待转换）
    result.referenced_paths = {ref.abs_path for ref in result.all_refs}
    for ref in result.all_refs:
        if ref.abs_path.suffix.lower() == ".svg":
            result.svg_paths.add(ref.abs_path)
        else:
            result.images_to_convert.add(ref.abs_path)

    # 6. 计算未引用图片
    #    从所有 assets 图片中减去：已引用图片 + 跨目录引用保护图片
    result.unreferenced_images = (
        result.all_asset_images
        - result.referenced_paths
        - result.cross_protected
    )

    return result


# ─── 报告写入 ──────────────────────────────────────────────────────────────────

def _rel(p: Path) -> str:
    """格式化为相对于 PROJECT_ROOT 的路径字符串（用于报告可读性）"""
    try:
        return str(p.relative_to(PROJECT_ROOT))
    except ValueError:
        return str(p)


def write_prescan_report(result: ScanResult, report_path: Path) -> None:
    """写入预扫描报告（覆盖写）"""
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    lines = ["# convert2webp 扫描报告", f"生成时间: {now}", ""]

    if result.has_error:
        lines += [
            "## ❌ 错误（程序已终止，无任何文件被修改）",
            "",
            f"发现 {len(result.missing_refs)} 个引用图片文件缺失：",
            "",
        ]
        for ref in result.missing_refs:
            lines += [
                f"  来源文件  : {_rel(ref.md_file)}",
                f"  引用字符串: {ref.original_ref}",
                f"  期望路径  : {ref.abs_path}",
                f"  行号      : {ref.line_num}",
                "",
            ]
    else:
        lines += [
            "## 统计信息",
            f"  扫描 .md 文件数         : {len(result.md_files)}",
            f"  总图片引用数            : {len(result.all_refs)}",
            f"  唯一被引用图片数        : {len(result.referenced_paths)}",
            f"    其中 SVG（跳过转换）  : {len(result.svg_paths)}",
            f"    其中待转换（PNG/JPG） : {len(result.images_to_convert)}",
            f"  跨目录引用保护图片数    : {len(result.cross_protected)}",
            f"  未引用图片数（待移动）  : {len(result.unreferenced_images)}",
            "",
        ]

        if result.cross_protected:
            lines.append("## ℹ️ 跨目录引用保护（不转换，不移动）")
            for p in sorted(result.cross_protected):
                lines.append(f"  {_rel(p)}")
            lines.append("")

        if result.svg_paths:
            lines.append("## ℹ️ SVG 文件（跳过转换，保持原样）")
            for p in sorted(result.svg_paths):
                lines.append(f"  {_rel(p)}")
            lines.append("")

        lines.append("## 📋 待转换计划（PNG/JPG → WebP）")
        for p in sorted(result.images_to_convert):
            lines.append(f"  {_rel(p)}")
        lines.append("")

        if result.unreferenced_images:
            lines.append("## 🗑️ 未引用图片（将移动到 test/）")
            for p in sorted(result.unreferenced_images):
                lines.append(f"  {_rel(p)}")
            lines.append("")

        lines.append(
            "## 💡 提示\n"
            "  1. 请仔细检查以上列表（特别是「未引用图片」）\n"
            "  2. 确认无误后，运行 --confirm 参数执行实际转换\n"
            "  3. 注：SVG 文件不转换，其 Markdown 引用不会被修改"
        )

    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text("\n".join(lines), encoding="utf-8")


def append_execute_report(
    report_path: Path,
    converted: list,
    updated_mds: list,
    moved_orig: list,
    moved_unref: list,
    exec_errors: list,
) -> None:
    """将执行结果追加到已有报告文件末尾"""
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    lines = ["", "=" * 60, "# 执行结果", f"执行时间: {now}", ""]

    if exec_errors:
        lines += ["## ❌ 执行失败（已完整回滚）", ""]
        for e in exec_errors:
            lines.append(f"  {e}")
        lines.append("")
    else:
        lines += [
            "## ✅ 执行成功",
            f"  转换图片数       : {len(converted)}",
            f"  更新 .md 文件数  : {len(updated_mds)}",
            f"  移动原始图片数   : {len(moved_orig)}",
            f"  移动未引用图片数 : {len(moved_unref)}",
            "",
        ]

    if converted:
        lines.append("## 转换记录（PNG/JPG → WebP）")
        for src, dst in converted:
            lines.append(f"  {_rel(src)}  →  {dst.name}")
        lines.append("")

    if updated_mds:
        lines.append("## 更新的 .md 文件")
        for md in updated_mds:
            lines.append(f"  {_rel(md)}")
        lines.append("")

    if moved_orig:
        lines.append("## 移动的原始图片（转换后归档到 test/）")
        for src, dst in moved_orig:
            lines.append(f"  {_rel(src)}  →  {dst}")
        lines.append("")

    if moved_unref:
        lines.append("## 移动的未引用图片")
        for src, dst in moved_unref:
            lines.append(f"  {_rel(src)}  →  {dst}")
        lines.append("")

    with report_path.open("a", encoding="utf-8") as f:
        f.write("\n".join(lines))


# ─── 阶段2：执行（含回滚）────────────────────────────────────────────────────

def convert_image(src: Path, dst: Path) -> None:
    """
    将 PNG/JPG 图片无损转换为 WebP 格式。
    - lossless=True：无损压缩（不降质）
    - quality=100：压缩效率最大化（在 lossless 模式下控制压缩速度/比率）
    - 分辨率不变（不做缩放）
    """
    with Image.open(src) as img:
        img.save(dst, "WEBP", lossless=True, quality=100)


def update_md_file(md_file: Path, replacements: dict) -> None:
    """
    原子写入：将 .md 文件中的图片引用路径替换为对应 WebP 引用。

    replacements: {old_full_match: new_full_match}
      例：{'src="./assets/foo.png"': 'src="./assets/foo.webp"'}

    使用「写临时文件 → rename」模式保证写入原子性。
    """
    content = md_file.read_text(encoding="utf-8")
    for old, new in replacements.items():
        content = content.replace(old, new)

    tmp = md_file.with_suffix(".md.tmp")
    try:
        tmp.write_text(content, encoding="utf-8")
        tmp.rename(md_file)  # 原子替换
    except Exception:
        tmp.unlink(missing_ok=True)
        raise


def get_test_path(src: Path, docs_root: Path, output_dir: Path) -> Path:
    """
    计算图片在 test/ 目录下的对应路径，保留 docs/ 下的相对目录结构。
    例：docs/recommend/assets/foo.png → test/recommend/assets/foo.png
    """
    try:
        rel = src.relative_to(docs_root)
    except ValueError:
        rel = Path(src.name)
    return output_dir / rel


def safe_move(src: Path, dst: Path) -> None:
    """安全移动文件，自动创建目标目录（含所有父级目录）"""
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.move(str(src), str(dst))


def execute(
    scan_result: ScanResult,
    output_dir: Path,
    report_file: Path,
    docs_root: Path,
) -> None:
    """
    执行阶段主函数。

    安全机制：
      - 修改前备份所有 .md 文件（.md.bak）
      - 任一步骤失败时：恢复 .md 备份 + 删除已创建的 WebP 文件
      - 原子写入 .md 文件（.md.tmp → rename）
      - 最终追加执行报告（无论成功或失败）
    """
    converted: list = []    # [(src_path, webp_path)]
    updated_mds: list = []  # [md_path]
    moved_orig: list = []   # [(src_path, test_path)]
    moved_unref: list = []  # [(src_path, test_path)]
    backup_files: list = [] # [(bak_path, orig_md_path)]
    created_webps: list = []# 已创建的 WebP，回滚时需删除
    exec_errors: list = []

    # 预计算：图片绝对路径 → WebP 绝对路径（与原文件同目录，仅改后缀）
    path_to_webp: dict = {
        img: img.with_suffix(".webp")
        for img in scan_result.images_to_convert
    }

    # 预计算：每个 .md 文件的替换映射
    #   key: old_full_match（如 src="./assets/foo.png"）
    #   val: new_full_match（如 src="./assets/foo.webp"）
    # 通过替换 full_match 整体字符串来保证只修改图片路径部分
    md_replacements: dict = {}
    for ref in scan_result.all_refs:
        if ref.abs_path.suffix.lower() == ".svg":
            continue  # SVG 完全跳过
        if ref.abs_path not in path_to_webp:
            continue
        # 保持 original_ref 的 URL 编码形式，仅将后缀改为 .webp
        new_ref = ref.original_ref[: ref.original_ref.rfind(".")] + ".webp"
        new_full = ref.full_match.replace(ref.original_ref, new_ref)
        md_replacements.setdefault(ref.md_file, {})[ref.full_match] = new_full

    try:
        # ── 步骤1：备份所有将被修改的 .md 文件 ──────────────────────────────
        print(f"  备份 {len(md_replacements)} 个 .md 文件...")
        for md_file in md_replacements:
            bak = md_file.with_suffix(".md.bak")
            shutil.copy2(str(md_file), str(bak))
            backup_files.append((bak, md_file))

        # ── 步骤2：转换 PNG/JPG → WebP ─────────────────────────────────────
        print(f"\n  转换 {len(path_to_webp)} 张图片...")
        for src, dst in sorted(path_to_webp.items(), key=lambda x: x[0].name):
            try:
                convert_image(src, dst)
                created_webps.append(dst)
                converted.append((src, dst))
                print(f"    ✓ {src.name} → {dst.name}")
            except Exception as e:
                raise RuntimeError(f"转换图片失败 [{src.name}]: {e}")

        # ── 步骤3：原子更新 .md 文件中的图片路径引用 ─────────────────────
        print(f"\n  更新 {len(md_replacements)} 个 .md 文件...")
        for md_file, replacements in md_replacements.items():
            try:
                update_md_file(md_file, replacements)
                updated_mds.append(md_file)
                print(f"    ✓ {md_file.name} ({len(replacements)} 处引用)")
            except Exception as e:
                raise RuntimeError(f"更新 .md 失败 [{md_file.name}]: {e}")

        # ── 步骤4：移动原始图片到 test/（转换后归档） ─────────────────────
        print(f"\n  归档 {len(path_to_webp)} 张原始图片到 test/...")
        for src in sorted(path_to_webp.keys(), key=lambda p: p.name):
            dst = get_test_path(src, docs_root, output_dir)
            safe_move(src, dst)
            moved_orig.append((src, dst))
            print(f"    ✓ {src.name}")

        # ── 步骤5：移动未引用图片到 test/ ────────────────────────────────
        if scan_result.unreferenced_images:
            print(f"\n  移动 {len(scan_result.unreferenced_images)} 个未引用图片到 test/...")
            for img in sorted(scan_result.unreferenced_images, key=lambda p: p.name):
                dst = get_test_path(img, docs_root, output_dir)
                safe_move(img, dst)
                moved_unref.append((img, dst))
                print(f"    ✓ {img.name}")

        # ── 步骤6：清理 .bak 备份文件（成功后方可删除） ──────────────────
        for bak, _ in backup_files:
            bak.unlink(missing_ok=True)

    except Exception as e:
        # ── 回滚 ──────────────────────────────────────────────────────────
        exec_errors.append(f"执行中断: {e}")
        print(f"\n⚠️  执行失败，正在回滚...")

        # 恢复 .md 文件备份
        for bak, orig in backup_files:
            if bak.exists():
                try:
                    shutil.copy2(str(bak), str(orig))
                    bak.unlink(missing_ok=True)
                    print(f"    回滚: {orig.name} ✓")
                except Exception as re_err:
                    exec_errors.append(f"恢复 {orig.name} 备份失败: {re_err}")

        # 删除已创建的 WebP 文件
        for webp in created_webps:
            if webp.exists():
                try:
                    webp.unlink()
                    print(f"    删除: {webp.name} ✓")
                except Exception as re_err:
                    exec_errors.append(f"删除 WebP {webp.name} 失败: {re_err}")

        exec_errors.append("回滚完成")

    # ── 追加执行报告（无论成功或失败）────────────────────────────────────
    append_execute_report(
        report_file, converted, updated_mds, moved_orig, moved_unref, exec_errors
    )

    if exec_errors:
        print(f"\n❌ 执行失败，已回滚。详见报告: {report_file}")
        sys.exit(1)
    else:
        print(f"\n✅ 执行完成！详见报告: {report_file}")
        print(f"   转换图片: {len(converted)} 个")
        print(f"   更新 .md: {len(updated_mds)} 个文件")
        print(f"   移动原始图片: {len(moved_orig)} 个")
        print(f"   移动未引用图片: {len(moved_unref)} 个")


# ─── 主函数 ────────────────────────────────────────────────────────────────────

def main() -> None:
    parser = argparse.ArgumentParser(
        description="将 VitePress 项目中被引用的图片批量转换为 WebP 格式",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "示例:\n"
            "  # 第一步：扫描并生成报告\n"
            "  python tools/convert2webp.py\n\n"
            "  # 第二步：确认报告无误后执行转换\n"
            "  python tools/convert2webp.py --confirm"
        ),
    )
    parser.add_argument(
        "--confirm",
        action="store_true",
        help="执行实际转换（默认仅扫描生成报告，不修改任何文件）",
    )
    args = parser.parse_args()

    print("🔍 开始预扫描...")
    result = do_prescan(SCAN_DIRS)

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    write_prescan_report(result, REPORT_FILE)

    if result.has_error:
        print(f"❌ 预扫描失败：发现 {len(result.missing_refs)} 个图片引用文件缺失")
        for ref in result.missing_refs[:5]:
            print(f"   缺失: {ref.abs_path}")
            print(f"   引用于: {ref.md_file.name} 第 {ref.line_num} 行")
        if len(result.missing_refs) > 5:
            print(f"   ...（共 {len(result.missing_refs)} 个，详见报告）")
        print(f"📄 报告: {REPORT_FILE}")
        sys.exit(1)

    print("✅ 预扫描完成")
    print(f"   .md 文件数    : {len(result.md_files)}")
    print(f"   待转换图片    : {len(result.images_to_convert)} 个")
    print(f"   未引用图片    : {len(result.unreferenced_images)} 个")
    print(f"   SVG（跳过）   : {len(result.svg_paths)} 个")
    print(f"📄 报告: {REPORT_FILE}")

    if not args.confirm:
        print("\n💡 检查报告无误后，添加 --confirm 参数执行转换")
        return

    print("\n🚀 开始执行转换...")
    execute(result, OUTPUT_DIR, REPORT_FILE, DOCS_ROOT)


if __name__ == "__main__":
    main()
