def convert_to_markdown_table(text):
    # 将英文分号替换为中文分号
    text = text.replace(";", "；")
    text = text.replace(": ", ":")
    text = text.replace("*", r"\*")

    # 按行分割文本
    lines = text.strip().split("\n")

    # 初始化表格内容
    table = "|   项目   |                    参数                     |\n"
    table += "| :------: | :-----------------------------------------: |\n"

    # 处理每一行
    for line in lines:
        # 去除项目前的序号（例如 "1.机身参数" -> "机身参数"）
        key = line.split("：", 1)[0]  # 提取序号和项目
        key = key.split(".", 1)[-1]  # 去除序号
        value = line.split("：", 1)[1]  # 提取参数
        # 添加到表格中
        table += f"| {key} | {value} |\n"

    return table


# 从 test.txt 文件中读取文本
def read_text_from_file(filename):
    with open(filename, "r", encoding="utf-8") as file:
        return file.read()


# 文件路径
filename = "test.txt"

# 读取文件内容
text = read_text_from_file(filename)

# 转换为 Markdown 表格
markdown_table = convert_to_markdown_table(text)
print(markdown_table)
