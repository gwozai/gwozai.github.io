# Gwozai 品牌组件集成文档

## 概述

本文档详细说明了如何在项目的各个页面中集成 gwozai.tech 品牌组件，确保整个工具集合的视觉一致性和品牌识别度。

## 品牌组件结构

### HTML 结构

```html
<!-- Gwozai Brand Component -->
<div class="gwozai-brand">
    <div class="gwozai-logo">
        <span class="gwozai-text">gwozai</span>
        <span class="gwozai-dot">.</span>
        <span class="gwozai-tech">tech</span>
    </div>
    <div class="gwozai-tagline">打造实用工具集</div>
</div>
```

### CSS 样式

```css
<style>
    .gwozai-brand {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 16px;
        padding: 12px 16px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
        cursor: pointer;
        user-select: none;
    }

    .gwozai-brand:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        background: rgba(255, 255, 255, 1);
    }

    .gwozai-logo {
        display: flex;
        align-items: center;
        font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-weight: 700;
        font-size: 16px;
        line-height: 1;
        margin-bottom: 2px;
    }

    .gwozai-text {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100());
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
    }

    .gwozai-dot {
        color: #ff6b6b;
        margin: 0 1px;
    }

    .gwozai-tech {
        color: #4ecdc4;
    }

    .gwozai-tagline {
        font-size: 10px;
        color: #666;
        text-align: center;
        font-weight: 500;
        opacity: 0.8;
    }

    @media (max-width: 768px) {
        .gwozai-brand {
            bottom: 15px;
            right: 15px;
            padding: 10px 12px;
        }
        
        .gwozai-logo {
            font-size: 14px;
        }
        
        .gwozai-tagline {
            font-size: 9px;
        }
    }

    @media (prefers-color-scheme: dark) {
        .gwozai-brand {
            background: rgba(30, 30, 30, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .gwozai-brand:hover {
            background: rgba(40, 40, 40, 1);
        }
        
        .gwozai-tagline {
            color: #aaa;
        }
    }
</style>
```

### JavaScript 交互

```javascript
<script>
    document.querySelector('.gwozai-brand').addEventListener('click', function() {
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/');
        
        let homePath = '/';
        if (pathSegments.includes('tools')) {
            homePath = '../../index.html';
        } else if (pathSegments.includes('pages')) {
            homePath = '../index.html';
        }
        
        window.location.href = homePath;
    });
</script>
```

## 集成步骤

### 1. 手动添加到现有页面

对于现有的 HTML 页面，在 `</body>` 标签之前添加完整的品牌组件代码：

```html
<!DOCTYPE html>
<html>
<head>
    <!-- 页面头部内容 -->
</head>
<body>
    <!-- 页面主要内容 -->
    
    <!-- Gwozai Brand Component -->
    <div class="gwozai-brand">
        <div class="gwozai-logo">
            <span class="gwozai-text">gwozai</span>
            <span class="gwozai-dot">.</span>
            <span class="gwozai-tech">tech</span>
        </div>
        <div class="gwozai-tagline">打造实用工具集</div>
    </div>

    <style>
        /* 完整的 CSS 样式代码 */
    </style>

    <script>
        /* JavaScript 交互代码 */
    </script>
</body>
</html>
```

### 2. 自动化添加脚本

使用项目中的自动化脚本为所有页面添加品牌组件：

```bash
# 在项目根目录运行
node add-brand-component.js
```

### 3. 模板文件集成

品牌组件已经集成到 `pages/admin/create-tool.js` 模板生成器中，所有新创建的工具都会自动包含品牌组件。

## 设计规范

### 视觉特性

- **位置**: 固定在右下角，确保在所有页面中保持一致的位置
- **层级**: z-index 设置为 1000，确保在其他元素之上
- **背景**: 半透明毛玻璃效果，适应不同背景
- **动画**: 悬停时轻微上浮和阴影增强
- **响应式**: 在移动设备上适当缩小尺寸

### 颜色方案

- **gwozai**: 紫色渐变 (#667eea → #764ba2)
- **点号**: 红色 (#ff6b6b)
- **tech**: 青色 (#4ecdc4)
- **标语**: 灰色 (#666)

### 字体规范

- **主字体**: SF Pro Display 系列
- **备用字体**: 系统默认无衬线字体
- **字重**: 700 (Bold)
- **大小**: 16px (桌面), 14px (移动)

## 交互功能

### 点击行为

品牌组件具有智能导航功能：

- **主页**: 点击后保持在当前页面
- **工具页面**: 返回到 `../../index.html`
- **页面目录**: 返回到 `../index.html`

### 路径检测逻辑

```javascript
const currentPath = window.location.pathname;
const pathSegments = currentPath.split('/');

let homePath = '/';
if (pathSegments.includes('tools')) {
    homePath = '../../index.html';
} else if (pathSegments.includes('pages')) {
    homePath = '../index.html';
}
```

## 兼容性考虑

### 浏览器支持

- **现代浏览器**: 完全支持所有效果
- **Safari**: 完全支持 backdrop-filter
- **Firefox**: 降级到普通半透明背景
- **移动浏览器**: 优化的响应式设计

### 深色模式支持

```css
@media (prefers-color-scheme: dark) {
    .gwozai-brand {
        background: rgba(30, 30, 30, 0.95);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .gwozai-brand:hover {
        background: rgba(40, 40, 40, 1);
    }
    
    .gwozai-tagline {
        color: #aaa;
    }
}
```

## 维护指南

### 更新品牌组件

1. **修改模板**: 更新 `pages/admin/create-tool.js` 中的模板代码
2. **批量更新**: 运行自动化脚本更新所有现有页面
3. **测试验证**: 检查各页面的显示效果和交互功能

### 添加新页面

对于新创建的页面：

1. **使用工具创建**: 推荐使用 `create-tool.js` 脚本
2. **手动添加**: 复制完整的品牌组件代码
3. **验证功能**: 确保点击导航正常工作

## 示例文件

项目中已经集成品牌组件的文件：

- `index.html` - 主页
- `tools/dev/nvm-guide.html` - NVM安装指南
- `tools/fun/random-text.html` - 随机一句工具
- `tools/media/video-player.html` - 视频播放器
- 以及其他 20+ 个工具页面

## 注意事项

1. **保持一致性**: 所有页面都应使用相同的品牌组件代码
2. **测试导航**: 确保在不同目录层级下点击导航正常工作
3. **响应式设计**: 验证在移动设备上的显示效果
4. **性能考虑**: 品牌组件使用 CSS 动画，不影响页面性能

## 总结

gwozai 品牌组件为整个工具集合提供了统一的视觉识别和导航体验。通过标准化的集成流程，确保了品牌的一致性和用户体验的连贯性。所有新页面都应该包含此组件，以维护项目的整体品牌形象。