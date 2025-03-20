import os
import requests
import json

# 创建 img 文件夹（如果不存在）
if not os.path.exists('img'):
    os.makedirs('img')

# 原始图片 URL 字典
images = {
    "downloadMysql": "https://i-blog.csdnimg.cn/blog_migrate/4cc3c67b996ff7909a4e4bf63cb36917.png",
    "myiniLocation": "https://i-blog.csdnimg.cn/blog_migrate/affc30806db6662047125862f606e630.png",
    "cmdAdmin": "https://i-blog.csdnimg.cn/blog_migrate/5066be03edc234f1d5b5ca37050edadf.png",
    "initPassword": "https://i-blog.csdnimg.cn/blog_migrate/577a24863ea7d1a88557eedc554cd279.png",
    "dataFolder": "https://i-blog.csdnimg.cn/blog_migrate/76bee9147a12e2f39045c0e2fb19727b.png",
    "startMysql": "https://i-blog.csdnimg.cn/blog_migrate/a02e31b836e85400dbe8ca10d5deae6d.png",
    "loginMysql": "https://i-blog.csdnimg.cn/blog_migrate/7e89cf4eed3dbe7a84952ebcef73ad5e.png",
    "changePassword": "https://i-blog.csdnimg.cn/blog_migrate/f371df9be03194c2933c9d01af3d672a.png",
    "verifyConfig": "https://i-blog.csdnimg.cn/blog_migrate/37ad034deb7e32a9924e718d109d6897.png",
    "exitMysql": "https://i-blog.csdnimg.cn/blog_migrate/fbb9bc3e866b487b869aba3523c9b168.png",
    "oneLineLogin": "https://i-blog.csdnimg.cn/blog_migrate/80d47025ea8d7953a141db6897eacbab.png",
    "envVariable1": "https://i-blog.csdnimg.cn/blog_migrate/326377e4af19e6f1918c2aad53f1174c.png",
    "envVariable2": "https://i-blog.csdnimg.cn/blog_migrate/f3abb4fb034ec19345615c3f8af77c16.png",
    "envVariable3": "https://i-blog.csdnimg.cn/blog_migrate/8cfd9d22253125ea29c3ede9cb2eebca.png",
    "verifyEnv": "https://i-blog.csdnimg.cn/blog_migrate/3d2fbbb3e61f3fc7a5895a5b1406e8b3.png",
    "stopMysql": "https://i-blog.csdnimg.cn/blog_migrate/5e5e626684a16feeace8a3d999cba6ee.png",
    "deleteDataFolder": "https://i-blog.csdnimg.cn/blog_migrate/a1315e940e30e8cccb1ff894247e4478.png",
    "skipPassword": "https://i-blog.csdnimg.cn/blog_migrate/d653e5c47e3ff4897a56c031a336fe10.png",
    "noPasswordLogin": "https://i-blog.csdnimg.cn/blog_migrate/32e7a393eb9275a9aeb2d4b9a79f7709.png",
    "resetPassword": "https://i-blog.csdnimg.cn/blog_migrate/fb7c8d5610a17b15d99fa02562fff117.png",
    "closeCmd": "https://i-blog.csdnimg.cn/blog_migrate/2cdbc841a977404d482ad730b6258e0d.png",
    "restartMysql": "https://i-blog.csdnimg.cn/blog_migrate/3d5e599e51b165445c8ff69b07352d5e.png",
    "emptyPasswordLogin": "https://i-blog.csdnimg.cn/blog_migrate/b1dab3925dd28da0009fc1953abb3be3.png",
    "setNewPassword": "https://i-blog.csdnimg.cn/blog_migrate/8f61b5c696df5d13fb4549dbb4d51159.png",
    "exitAfterReset": "https://i-blog.csdnimg.cn/blog_migrate/69110d60be44e8034ab933fee5b513c4.png"
}

# 新的图片路径字典
new_images = {}

# 下载图片并更新字典
for key, url in images.items():
    # 从 URL 中提取文件名
    filename = url.split('/')[-1]
    # 设置保存路径
    save_path = os.path.join('img', filename)

    try:
        # 下载图片
        response = requests.get(url)
        response.raise_for_status()  # 确保请求成功

        # 保存图片
        with open(save_path, 'wb') as f:
            f.write(response.content)

        # 更新字典中的路径
        new_images[key] = f"./img/{filename}"
        print(f"已下载: {key} -> {save_path}")

    except Exception as e:
        print(f"下载失败 {key}: {e}")
        # 如果下载失败，保留原始 URL
        new_images[key] = url

# 生成新的 JavaScript 变量声明
js_code = "const images = " + json.dumps(new_images, indent=4, ensure_ascii=False) + ";"

# 保存到文件
with open('images.js', 'w', encoding='utf-8') as f:
    f.write(js_code)

print("\n新的 images 变量已保存到 images.js 文件")
