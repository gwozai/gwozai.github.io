/**
 * 自动导航系统 - 扫描工具目录并生成导航
 */
class AutoNav {
    constructor() {
        this.categories = {
            'dev': { name: '🛠️ 开发工具', color: '#007acc', description: '开发环境配置和编程工具' },
            'security': { name: '🔐 安全工具', color: '#dc3545', description: '加密解密和安全检测工具' },
            'media': { name: '🎵 媒体工具', color: '#28a745', description: '音视频处理和媒体相关工具' },
            'fun': { name: '🎮 娱乐功能', color: '#ffc107', description: '趣味工具和互动娱乐' },
            'utility': { name: '⚙️ 实用工具', color: '#6c757d', description: '日常使用的便民工具' }
        };
        
        this.toolsData = this.getToolsData();
    }

    // 手动配置的工具数据（避免文件系统扫描限制）
    getToolsData() {
        return {
            'dev': [
                { file: 'conda_path_generator.html', title: 'Conda路径生成器', desc: 'Conda环境变量配置生成工具' },
                { file: 'java_env.html', title: 'Java环境配置', desc: 'Java环境变量生成工具' },
                { file: 'java_powershell.html', title: 'Java PowerShell工具', desc: 'Java相关PowerShell脚本' },
                { file: 'mysql-setup.html', title: 'MySQL安装配置', desc: 'MySQL数据库安装配置指南' },
                { file: 'nvm-guide.html', title: 'NVM 安装指南', desc: 'macOS 上的 NVM 安装与卸载完整指南，支持官方脚本和 Homebrew 两种方式' },
                { file: 'springboot.html', title: 'SpringBoot工具', desc: 'SpringBoot开发辅助工具' }
            ],
            'security': [
                { file: 'md5.html', title: 'MD5哈希工具', desc: 'MD5加密和验证工具' },
                { file: 'encrypt-tool.html', title: '加密工具', desc: '文本加密解密和压缩工具' }
            ],
            'media': [
                { file: 'video-player.html', title: '视频播放器', desc: '智能视频播放器，支持本地视频动态加载和在线播放' },
                { file: 'random.html', title: '随机图片', desc: '随机二次元图片展示' }
            ],
            'fun': [
                { file: 'ai.html', title: 'AI聊天助手', desc: 'AI对话和智能问答' },
                { file: 'danmaku-wall.html', title: '弹幕墙', desc: '动态弹幕展示墙' },
                { file: 'random-text.html', title: '随机一句', desc: '随机文字生成器' }
            ],
            'utility': [
                { file: 'currenttime.html', title: '当前时间', desc: '实时时间显示工具' },
                { file: 'miniolink.html', title: 'MinIO连接', desc: 'MinIO对象存储管理' },
                { file: 'text-converter.html', title: '文本转换器', desc: '将文本转换为不同格式的实用工具' }
            ]
        };
    }

    // 生成导航卡片HTML
    generateToolCard(tool, category) {
        const categoryInfo = this.categories[category];
        return `
            <div class="tool-card" data-category="${category}">
                <a href="tools/${category}/${tool.file}" class="tool-link">
                    <div class="tool-content">
                        <h3 class="tool-title">${tool.title}</h3>
                        <p class="tool-desc">${tool.desc}</p>
                        <div class="tool-category" style="background-color: ${categoryInfo.color}">
                            ${categoryInfo.name}
                        </div>
                    </div>
                    <div class="tool-arrow">→</div>
                </a>
            </div>
        `;
    }

    // 生成分类导航
    generateCategoryNav() {
        let navHTML = '<div class="category-nav">';
        navHTML += '<button class="category-btn active" data-category="all">🌟 全部工具</button>';
        
        Object.entries(this.categories).forEach(([key, category]) => {
            const count = this.toolsData[key]?.length || 0;
            navHTML += `<button class="category-btn" data-category="${key}">${category.name} (${count})</button>`;
        });
        
        navHTML += '</div>';
        return navHTML;
    }

    // 生成完整导航
    generateNavigation() {
        let html = this.generateCategoryNav();
        html += '<div class="tools-grid">';
        
        // 按分类生成工具卡片
        Object.entries(this.toolsData).forEach(([category, tools]) => {
            tools.forEach(tool => {
                html += this.generateToolCard(tool, category);
            });
        });
        
        html += '</div>';
        return html;
    }

    // 添加样式
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .category-nav {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-bottom: 30px;
                justify-content: center;
            }
            
            .category-btn {
                padding: 8px 16px;
                border: 2px solid #e1e5e9;
                background: white;
                border-radius: 25px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 500;
            }
            
            .category-btn:hover,
            .category-btn.active {
                background: #667eea;
                color: white;
                border-color: #667eea;
                transform: translateY(-2px);
            }
            
            .tools-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }
            
            .tool-card {
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
                overflow: hidden;
            }
            
            .tool-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            }
            
            .tool-link {
                display: flex;
                align-items: center;
                padding: 20px;
                text-decoration: none;
                color: inherit;
            }
            
            .tool-content {
                flex: 1;
            }
            
            .tool-title {
                margin: 0 0 8px 0;
                font-size: 1.2em;
                color: #333;
                font-weight: 600;
            }
            
            .tool-desc {
                margin: 0 0 12px 0;
                color: #666;
                font-size: 0.9em;
                line-height: 1.4;
            }
            
            .tool-category {
                display: inline-block;
                padding: 4px 8px;
                border-radius: 12px;
                color: white;
                font-size: 0.8em;
                font-weight: 500;
            }
            
            .tool-arrow {
                font-size: 1.5em;
                color: #667eea;
                margin-left: 15px;
                transition: transform 0.3s ease;
            }
            
            .tool-card:hover .tool-arrow {
                transform: translateX(5px);
            }
            
            .tool-card[style*="display: none"] {
                display: none !important;
            }
            
            .tool-card.search-match {
                animation: searchPulse 0.5s ease-in-out;
            }
            
            @keyframes searchPulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.02); }
                100% { transform: scale(1); }
            }
            
            @media (max-width: 768px) {
                .tools-grid {
                    grid-template-columns: 1fr;
                }
                
                .category-nav {
                    justify-content: flex-start;
                    overflow-x: auto;
                    padding-bottom: 10px;
                }
                
                .category-btn {
                    white-space: nowrap;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // 添加分类筛选功能
    addFilterFunctionality() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                // 更新按钮状态
                document.querySelectorAll('.category-btn').forEach(btn => 
                    btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // 筛选工具
                const category = e.target.dataset.category;
                const toolCards = document.querySelectorAll('.tool-card');
                
                toolCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    }

    // 初始化导航系统
    init(containerId = 'auto-nav') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Auto-nav container not found');
            return;
        }
        
        // 添加样式
        this.addStyles();
        
        // 生成导航内容
        container.innerHTML = this.generateNavigation();
        
        // 添加筛选功能
        this.addFilterFunctionality();
        
        console.log('Auto navigation system initialized');
    }

    // 添加新工具（供外部调用）
    addTool(category, tool) {
        if (!this.toolsData[category]) {
            this.toolsData[category] = [];
        }
        this.toolsData[category].push(tool);
        
        // 重新初始化导航
        this.init();
    }
    
    // 搜索工具并高亮显示
    searchAndHighlight(query) {
        const toolCards = document.querySelectorAll('.tool-card');
        let hasResults = false;
        
        toolCards.forEach(card => {
            const title = card.querySelector('.tool-title').textContent.toLowerCase();
            const desc = card.querySelector('.tool-desc').textContent.toLowerCase();
            
            if (title.includes(query.toLowerCase()) || desc.includes(query.toLowerCase())) {
                card.style.display = 'block';
                card.classList.add('search-match');
                hasResults = true;
                
                // 移除动画类
                setTimeout(() => card.classList.remove('search-match'), 500);
            } else {
                card.style.display = 'none';
            }
        });
        
        return hasResults;
    }
    
    // 重置搜索显示
    resetSearch() {
        const toolCards = document.querySelectorAll('.tool-card');
        toolCards.forEach(card => {
            card.style.display = 'block';
            card.classList.remove('search-match');
        });
    }

    // 获取工具统计
    getStats() {
        const stats = {};
        let total = 0;
        
        Object.entries(this.toolsData).forEach(([category, tools]) => {
            stats[category] = tools.length;
            total += tools.length;
        });
        
        stats.total = total;
        return stats;
    }
}

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    window.autoNav = new AutoNav();
    if (document.getElementById('auto-nav')) {
        window.autoNav.init();
    }
});

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutoNav;
}