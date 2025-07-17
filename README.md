# 🚀 Gwozai 工具导航

> 一站式智能工具集合，提升效率从这里开始

## 📋 项目简介

这是一个个人工具集合网站，包含多种实用工具和娱乐功能。项目采用自动化管理结构，支持快速添加新工具并自动集成到导航系统中。

## 🏗️ 项目结构

```
gwozai.github.io/
├── 📄 index.html                 # 主导航页面
├── 📄 README.md                  # 项目文档
├── 📁 tools/                     # 工具目录（按分类组织）
│   ├── 📁 dev/                   # 🛠️ 开发工具
│   │   ├── conda_path_generator.html
│   │   ├── java_env.html
│   │   ├── java_powershell.html
│   │   ├── mysql-setup.html
│   │   └── springboot.html
│   ├── 📁 security/             # 🔐 安全工具
│   │   ├── md5.html
│   │   └── encrypt-tool.html
│   ├── 📁 media/                # 🎵 媒体工具
│   │   ├── video-player.html
│   │   └── random.html
│   ├── 📁 fun/                  # 🎮 娱乐功能
│   │   ├── ai.html
│   │   ├── danmaku-wall.html
│   │   └── random-text.html
│   └── 📁 utility/              # ⚙️ 实用工具
│       ├── currenttime.html
│       └── miniolink.html
├── 📁 pages/                    # 页面管理
│   ├── 📁 home/                 # 主页变体
│   │   └── main-home.html       # 个人主页
│   └── 📁 admin/                # 管理工具
│       ├── all.html             # 文件管理
│       ├── site-navigation.html # 网址导航
│       ├── navigation.html      # 导航配置
│       └── create-tool.js       # 工具创建脚本
├── 📁 assets/                   # 静态资源
├── 📁 css/                      # 样式文件
├── 📁 js/                       # JavaScript文件
│   └── auto-nav.js              # 自动导航系统
├── 📁 archive/                  # 归档文件（旧版本备份）
└── 📁 img/, videos/, etc.       # 其他资源文件
```

## 🌟 主要功能

### 🛠️ 开发工具
- **Conda路径生成器**: 自动生成Conda环境变量配置
- **Java环境配置**: Java环境变量生成工具
- **MySQL安装配置**: 数据库安装配置指南
- **SpringBoot工具**: SpringBoot开发辅助

### 🔐 安全工具
- **MD5哈希工具**: MD5加密和验证
- **加密工具**: 文本加密解密和压缩

### 🎵 媒体工具
- **视频播放器**: 在线视频播放
- **随机图片**: 随机二次元图片展示

### 🎮 娱乐功能
- **AI聊天助手**: AI对话和智能问答
- **弹幕墙**: 动态弹幕展示
- **随机一句**: 随机文字生成器

### ⚙️ 实用工具
- **当前时间**: 实时时间显示
- **MinIO连接**: 对象存储管理工具

## 🚀 快速开始

### 访问网站
直接访问 `index.html` 即可打开主导航页面。

### 添加新工具

#### 方法1: 使用创建脚本（推荐）
```bash
# 在项目根目录运行
node pages/admin/create-tool.js
```

然后按照提示：
1. 选择工具分类（开发/安全/媒体/娱乐/实用）
2. 输入工具名称和描述
3. 选择页面模板（基础/表单/转换器）
4. 确认创建

#### 方法2: 手动创建
1. 在对应的 `tools/分类/` 目录下创建HTML文件
2. 在文件 `<title>` 后添加描述注释：
   ```html
   <title>工具名称</title>
   <!-- desc: 工具描述 -->
   ```
3. 刷新主页，工具自动出现在导航中

### 工具分类说明
- `tools/dev/` - 开发工具
- `tools/security/` - 安全工具  
- `tools/media/` - 媒体工具
- `tools/fun/` - 娱乐功能
- `tools/utility/` - 实用工具

## 🎯 自动化特性

### 自动导航系统
- **智能扫描**: 自动识别新添加的工具
- **分类管理**: 按目录自动分类
- **动态生成**: 实时更新导航界面
- **筛选功能**: 支持按分类筛选工具

### 零配置添加
- 只需按目录结构放置文件
- 系统自动识别并集成
- 无需手动更新配置文件

## 🛠️ 技术栈

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **样式**: 原生CSS + 响应式设计
- **脚本**: Node.js (工具创建脚本)
- **部署**: GitHub Pages

## 📱 响应式设计

项目完全支持响应式设计，在桌面端和移动端都有良好的体验：
- 桌面端：网格布局，悬停效果
- 移动端：单列布局，触摸优化

## 🔧 自定义配置

### 修改工具分类
编辑 `js/auto-nav.js` 中的 `categories` 对象：
```javascript
this.categories = {
    'new-category': { 
        name: '🆕 新分类', 
        color: '#ff6b6b', 
        description: '新分类描述' 
    }
};
```

### 添加新的页面模板
编辑 `pages/admin/create-tool.js` 中的 `templates` 对象。

## 📊 项目统计

- **总工具数**: 12个
- **分类数**: 5个
- **模板数**: 3个（基础/表单/转换器）
- **支持功能**: 自动导航、筛选、响应式

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 添加新工具或改进现有功能
4. 提交 Pull Request

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🔗 相关链接

- **个人主页**: [main-home.html](pages/home/main-home.html)
- **文件管理**: [all.html](pages/admin/all.html)
- **网址导航**: [site-navigation.html](pages/admin/site-navigation.html)

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- GitHub Issues
- 项目主页留言

---

**⭐ 如果这个项目对你有帮助，请给个 Star！**

*最后更新: 2025年*