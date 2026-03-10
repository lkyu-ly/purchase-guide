import re  # 导入正则表达式模块

def parse_line(line_content, prefix):
    """
    解析单行文本（例如："优点：1.项目A 2.项目B"）并提取项目列表。
    该函数会：
    1. 去除所有空格。
    2. 移除指定的前缀（如 "优点："）。
    3. 根据 "数字." 的模式分割字符串以提取各个项目。

    参数:
        line_content (str): 待解析的单行原始文本。
        prefix (str): 需要移除的行前缀 (例如 "优点：" 或 "缺点：")。

    返回:
        list: 包含解析出的项目的列表。如果行不以前缀开头或没有项目，则返回空列表。
    """
    # 步骤1: 去掉字符串的所有空格
    line_content_no_space = line_content.replace(" ", "")

    # 步骤2: 检查并移除前缀
    if line_content_no_space.startswith(prefix):
        items_text = line_content_no_space[len(prefix) :]

        if not items_text:  # 如果移除前缀后文本为空
            return []

        # 步骤3: 根据 "数字." 模式分割字符串
        raw_items = re.split(r"\d+\.", items_text)
        items = [item for item in raw_items if item]  # 过滤掉分割产生的空字符串
        return items
    return []


def create_markdown_table(advantages, disadvantages):
    """
    根据优点列表和缺点列表生成Markdown格式的表格字符串。
    表格将居中对齐。

    参数:
        advantages (list): 优点项目列表。
        disadvantages (list): 缺点项目列表。

    返回:
        str: Markdown格式的表格文本。
    """
    markdown_lines = []
    markdown_lines.append("| 优点 | 缺点 |")
    markdown_lines.append("|:---:|:---:|")

    max_len = max(len(advantages), len(disadvantages))

    for i in range(max_len):
        adv = advantages[i] if i < len(advantages) else ""
        disadv = disadvantages[i] if i < len(disadvantages) else ""
        markdown_lines.append(f"| {adv} | {disadv} |")

    return "\n".join(markdown_lines)


def main():
    file_path = "test.txt"  # 定义输入文件名

    # 直接读取文件内容，不进行复杂的错误处理
    with open(file_path, "r", encoding="utf-8") as f:
        line1_adv_raw = f.readline().strip()
        line2_disadv_raw = f.readline().strip()

    advantages = parse_line(line1_adv_raw, "优点：")
    disadvantages = parse_line(line2_disadv_raw, "缺点：")

    markdown_output = create_markdown_table(advantages, disadvantages)

    # 直接打印最终的Markdown表格
    print(markdown_output)


if __name__ == "__main__":
    main()
