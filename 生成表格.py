import pandas as pd

# 定义导航数据
data = [
    {"文件名": "index.html", "功能描述": "主页", "分组": "主页集合"},
    {"文件名": "home.html", "功能描述": "主页/首页", "分组": "主页集合"},
    {"文件名": "index1.html", "功能描述": "主页1", "分组": "主页集合"},
    {"文件名": "index2.html", "功能描述": "主页2", "分组": "主页集合"},
    {"文件名": "index3.html", "功能描述": "主页3", "分组": "主页集合"},
    {"文件名": "conda_path_generator.html", "功能描述": "Conda路径生成工具", "分组": "工具页面"},
    {"文件名": "random.html", "功能描述": "随机图片", "分组": "功能页面"},
    {"文件名": "sese.html", "功能描述": "网址导航", "分组": "功能页面"},
    {"文件名": "ai.html", "功能描述": "AI问答页面", "分组": "功能页面"},
    {"文件名": "java_env.html", "功能描述": "Java环境变量生成", "分组": "功能页面"}
]

# 将数据转换为 Pandas DataFrame
df = pd.DataFrame(data)

# 保存为 Excel 文件
output_file = "navigation.xlsx"
df.to_excel(output_file, index=False, engine="openpyxl")

print(f"Excel 文件已生成：{output_file}")
