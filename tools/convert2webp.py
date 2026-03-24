#!/usr/bin/env python3
"""
将当前目录中的常见位图图片就地转换为无损 WebP。

用法：
    python tools/convert2webp.py

依赖：
    pip install Pillow
"""

from __future__ import annotations

import sys
from dataclasses import dataclass
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("错误：缺少 Pillow 库，请执行 pip install Pillow")
    sys.exit(1)


IMAGE_SUFFIXES = {".png", ".jpg", ".jpeg", ".bmp", ".tif", ".tiff"}
SCRIPT_DIR = Path(__file__).resolve().parent


@dataclass
class ConversionResult:
    source: Path
    before_size: int
    after_size: int

    @property
    def compression_rate(self) -> float:
        if self.before_size == 0:
            return 0.0
        return (self.before_size - self.after_size) / self.before_size * 100


def find_images(directory: Path) -> list[Path]:
    return sorted(
        path
        for path in directory.iterdir()
        if path.is_file() and path.suffix.lower() in IMAGE_SUFFIXES
    )


def convert_image(source: Path) -> ConversionResult:
    target = source.with_suffix(".webp")

    with Image.open(source) as image:
        image.save(target, "WEBP", lossless=True, quality=100)

    return ConversionResult(
        source=source,
        before_size=source.stat().st_size,
        after_size=target.stat().st_size,
    )


def format_size(size: int) -> str:
    units = ["B", "KB", "MB", "GB"]
    value = float(size)

    for unit in units:
        if value < 1024 or unit == units[-1]:
            return f"{value:.2f} {unit}"
        value /= 1024


def print_report(results: list[ConversionResult], failures: list[tuple[Path, str]]) -> None:
    if not results and not failures:
        print(f"未在 {SCRIPT_DIR} 找到可转换图片。")
        return

    if results:
        print("转换报告:")
        for result in results:
            print(
                f"- {result.source.name}: "
                f"{format_size(result.before_size)} -> {format_size(result.after_size)}, "
                f"压缩率 {result.compression_rate:.2f}%"
            )

        average_rate = sum(result.compression_rate for result in results) / len(results)
        print(f"\n平均压缩率: {average_rate:.2f}%")

    if failures:
        print("\n转换失败:")
        for path, error in failures:
            print(f"- {path.name}: {error}")


def main() -> None:
    results: list[ConversionResult] = []
    failures: list[tuple[Path, str]] = []

    for image_path in find_images(SCRIPT_DIR):
        try:
            results.append(convert_image(image_path))
        except Exception as exc:
            failures.append((image_path, str(exc)))

    print_report(results, failures)


if __name__ == "__main__":
    main()
