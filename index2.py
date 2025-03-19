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
    <style>
        :root{{--bg-color:#f4f4f8;--card-bg:#fff;--text-color:#333;--hover-color:#e6e6f0;--primary-color:#4a6cf7}}*{{margin:0;padding:0;box-sizing:border-box}}body{{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;background-color:var(--bg-color);line-height:1.6;color:var(--text-color)}}.container{{max-width:1200px;margin:0 auto;padding:2rem}}.page-title{{text-align:center;margin-bottom:2rem;font-size:2.5rem;color:var(--primary-color)}}.category-title{{margin:2rem 0 1rem;font-size:1.8rem;color:var(--primary-color);border-bottom:2px solid var(--primary-color);padding-bottom:.5rem}}.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:1.5rem}}.card{{background-color:var(--card-bg);border-radius:12px;padding:1.5rem;box-shadow:0 10px 25px rgba(0,0,0,.05);transition:all .3s ease;text-decoration:none;display:flex;flex-direction:column;justify-content:space-between}}.card:hover{{transform:translateY(-10px);box-shadow:0 15px 35px rgba(0,0,0,.1);background-color:var(--hover-color)}}.card-title{{font-size:1.2rem;font-weight:600;color:var(--primary-color);margin-bottom:.5rem}}.card-description{{color:#666;margin-bottom:1rem}}.card-link{{align-self:flex-start;background-color:var(--primary-color);color:#fff;padding:.5rem 1rem;border-radius:6px;text-decoration:none;transition:background-color .3s ease}}.card-link:hover{{background-color:#3a5aff}}@media (max-width:768px){{.grid{{grid-template-columns:1fr}}}}
    </style>
</head>
<body>
    <div class="container">
        <h1 class="page-title">网页导航</h1>
        {categories}
    </div>
</body>
</html>
"""

# 生成分组 HTML
categories_html = ""
for category, pages in grouped_pages.items():
    categories_html += f'<h2 class="category-title">{category}</h2><div class="grid">'
    for page in pages:
        categories_html += f"""
        <a href="{page['file']}" class="card">
            <div>
                <h2 class="card-title">{page['file']}</h2>
                <p class="card-description">{page['description']}</p>
            </div>
            <span class="card-link">访问页面</span>
        </a>
        """
    categories_html += "</div>"


# 写入 HTML 文件
output_file = "index.html"
with open(output_file, "w", encoding="utf-8") as f:
    f.write(html_template.format(categories=categories_html))

print(f"导航页面已生成：{output_file}")
