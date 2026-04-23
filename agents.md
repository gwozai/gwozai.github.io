# Gwozai Tools 项目指南

## 项目概述

这是一个工具导航网站，每个工具都是独立的 HTML 页面，通过 `js/auto-nav.js` 自动生成导航菜单。

## 目录结构

```
gwozai.github.io/
├── index.html                    # 主页面（工具导航入口）
├── js/
│   └── auto-nav.js               # 导航配置（工具列表在此）
├── tools/
│   ├── dev/                      # 🛠️ 开发工具
│   │   └── *.html
│   ├── security/                  # 🔐 安全工具
│   │   └── *.html
│   ├── media/                     # 🎵 媒体工具
│   │   └── *.html
│   ├── fun/                      # 🎮 娱乐功能
│   │   └── *.html
│   └── utility/                  # ⚙️ 实用工具
│       └── *.html
├── css/                          # 样式文件
├── assets/                       # 静态资源
├── components/                   # 可复用组件
└── pages/                       # 管理页面
```

## 添加新工具的流程

### 1. 创建工具页面

在对应的分类目录下创建 HTML 文件：

- 开发工具 → `tools/dev/xxx.html`
- 安全工具 → `tools/security/xxx.html`
- 媒体工具 → `tools/media/xxx.html`
- 娱乐功能 → `tools/fun/xxx.html`
- 实用工具 → `tools/utility/xxx.html`

### 2. 页面模板

新页面应包含以下结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>工具名称 - Gwozai工具导航</title>
  <style>
    /* 样式... */
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 980px;
      margin: 0 auto;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,.15);
      padding: 28px;
    }
    .page-header {
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 2px solid #f0f0f0;
    }
    .page-header h1 { margin: 0 0 8px; font-size: 28px; }
    .page-header .back-link {
      display: inline-block;
      color: #667eea;
      text-decoration: none;
      font-size: 14px;
    }
    .page-header .back-link:hover { color: #764ba2; }
  </style>
</head>
<body>
  <div class="container">
    <div class="page-header">
      <a href="../index.html" class="back-link">← 返回导航</a>
      <h1>工具名称</h1>
    </div>
    <!-- 工具内容 -->
  </div>

  <!-- Gwozai Brand -->
  <div class="gwozai-brand" onclick="window.location.href='../index.html'">
    <div class="gwozai-logo">
      <span class="gwozai-text">gwozai</span>
      <span class="gwozai-dot">.</span>
      <span class="gwozai-tech">tech</span>
    </div>
    <div class="gwozai-tagline">打造实用工具集</div>
  </div>
  <style>
    .gwozai-brand { /* 同其他页面 */ }
  </style>
</body>
</html>
```

### 3. 注册到导航

编辑 `js/auto-nav.js`，在对应分类的 `toolsData` 中添加：

```javascript
getToolsData() {
  return {
    'dev': [
      // ... 现有工具
      { file: '你的文件名.html', title: '显示名称', desc: '简短描述' },
    ],
    // 其他分类...
  };
}
```

## 分类说明

| 分类 | 目录 | 说明 |
|------|------|------|
| 🛠️ 开发工具 | `tools/dev/` | 开发环境配置、编程工具 |
| 🔐 安全工具 | `tools/security/` | 加密解密、安全检测 |
| 🎵 媒体工具 | `tools/media/` | 音视频处理、图片相关 |
| 🎮 娱乐功能 | `tools/fun/` | 趣味工具、互动娱乐 |
| ⚙️ 实用工具 | `tools/utility/` | 日常便民工具 |

## 开发提示

- 页面需要响应式设计，支持移动端
- 按钮使用渐变背景 `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- 保持页面风格一致性
- 所有工具页面路径：`tools/{分类}/{文件名}.html`