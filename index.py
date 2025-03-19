import pandas as pd
from collections import defaultdict

# 读取 Excel 文件
excel_file = "navigation.xlsx"  # Excel 文件名
data = pd.read_excel(excel_file)

# 按分组组织数据
grouped_pages = defaultdict(list)
for _, row in data.iterrows():
    grouped_pages[row["分组"]].append({
        "file": row["文件名"],
        "description": row["功能描述"]
    })

# HTML 模板
html_template = """
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>网页导航</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-r from-blue-50 to-blue-100 text-gray-800 font-sans">
    <div class="max-w-6xl mx-auto p-6">
        <!-- 页面标题 -->
        <header class="mb-8 text-center">
            <h1 class="text-4xl font-bold text-blue-600">网页导航</h1>
            <p class="text-gray-600 mt-2">快速访问分组页面，提升效率</p>
        </header>

        <!-- 分组内容 -->
        {categories}
    </div>
</body>
</html>
"""

# 生成分组 HTML
categories_html = ""
for category, pages in grouped_pages.items():
    categories_html += f"""
    <section class="mb-12">
        <h2 class="text-2xl font-semibold text-blue-600 border-b-2 border-blue-600 pb-2 mb-6">{category}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    """
    for page in pages:
        categories_html += f"""
        <a href="{page['file']}" class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <div>
                <h2 class="text-lg font-semibold text-blue-600 mb-2">{page['file']}</h2>
                <p class="text-gray-600 mb-4">{page['description']}</p>
            </div>
            <span class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">访问页面</span>
        </a>
        """
    categories_html += "</div></section>"

# 写入 HTML 文件
output_file = "index.html"
with open(output_file, "w", encoding="utf-8") as f:
    f.write(html_template.format(categories=categories_html))

print(f"导航页面已生成：{output_file}")
