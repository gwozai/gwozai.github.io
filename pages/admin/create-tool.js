#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');

// 创建命令行交互界面
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 分类配置
const categories = {
  '1': { name: 'dev', display: '🛠️  开发工具', folder: 'dev' },
  '2': { name: 'security', display: '🔐 安全工具', folder: 'security' },
  '3': { name: 'media', display: '🎵 媒体工具', folder: 'media' },
  '4': { name: 'fun', display: '🎮 娱乐功能', folder: 'fun' },
  '5': { name: 'utility', display: '⚙️  实用工具', folder: 'utility' }
};

// 页面模板
const templates = {
  '1': {
    name: 'basic',
    display: '基础页面',
    content: `    <div class="container">
        <h1>{{TITLE}}</h1>
        <p>{{DESCRIPTION}}</p>
        
        <!-- 在这里添加你的工具功能 -->
        <div class="content">
            <p>工具内容区域</p>
        </div>
    </div>`
  },
  '2': {
    name: 'form',
    display: '表单工具',
    content: `    <div class="container">
        <h1>{{TITLE}}</h1>
        <p>{{DESCRIPTION}}</p>
        
        <form id="toolForm">
            <div class="form-group">
                <label>输入内容：</label>
                <input type="text" id="input" placeholder="请输入内容">
            </div>
            <button type="submit">处理</button>
        </form>
        
        <div id="result" class="result">
            <h3>结果：</h3>
            <div id="output"></div>
        </div>
    </div>
    
    <script>
        document.getElementById('toolForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const input = document.getElementById('input').value;
            
            // 在这里处理输入
            const result = processInput(input);
            document.getElementById('output').textContent = result;
            document.getElementById('result').style.display = 'block';
        });
        
        function processInput(input) {
            // 添加你的处理逻辑
            return '处理结果: ' + input;
        }
    </script>`
  },
  '3': {
    name: 'converter',
    display: '转换工具',
    content: `    <div class="container">
        <h1>{{TITLE}}</h1>
        <p>{{DESCRIPTION}}</p>
        
        <div class="converter">
            <div class="input-section">
                <label>输入：</label>
                <textarea id="input" placeholder="粘贴要转换的内容"></textarea>
            </div>
            
            <div class="controls">
                <button onclick="convert()">🔄 转换</button>
                <button onclick="copyResult()">📋 复制</button>
                <button onclick="clearAll()">🗑️ 清空</button>
            </div>
            
            <div class="output-section">
                <label>输出：</label>
                <textarea id="output" readonly></textarea>
            </div>
        </div>
    </div>
    
    <script>
        function convert() {
            const input = document.getElementById('input').value;
            
            // 在这里实现转换逻辑
            const result = convertInput(input);
            document.getElementById('output').value = result;
        }
        
        function convertInput(input) {
            // 添加你的转换逻辑
            return '转换结果:\\n' + input;
        }
        
        function copyResult() {
            const output = document.getElementById('output');
            output.select();
            document.execCommand('copy');
            showMessage('已复制到剪贴板！');
        }
        
        function clearAll() {
            document.getElementById('input').value = '';
            document.getElementById('output').value = '';
        }
        
        function showMessage(msg) {
            const div = document.createElement('div');
            div.textContent = msg;
            div.style.cssText = 'position:fixed;top:20px;right:20px;background:#4CAF50;color:white;padding:10px;border-radius:4px;z-index:1000;';
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 2000);
        }
    </script>`
  }
};

// 询问函数
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// 生成文件名
function generateFileName(title) {
  return title.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-\u4e00-\u9fa5]/g, '')
    .substring(0, 50);
}

// 生成HTML内容
function generateHTML(title, description, category, template) {
  const templateContent = templates[template].content
    .replace(/\{\{TITLE\}\}/g, title)
    .replace(/\{\{DESCRIPTION\}\}/g, description);

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <!-- desc: ${description} -->
    <style>
        * { box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            padding: 30px; 
            border-radius: 12px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        h1 { 
            color: #333; 
            margin-bottom: 10px;
            font-size: 2.5em;
            text-align: center;
        }
        p { 
            color: #666; 
            margin-bottom: 30px;
            text-align: center;
            font-size: 1.1em;
        }
        .form-group { 
            margin: 20px 0; 
        }
        label { 
            display: block; 
            margin-bottom: 8px; 
            font-weight: 600;
            color: #333;
        }
        input, textarea, select { 
            width: 100%; 
            padding: 12px; 
            border: 2px solid #e1e5e9; 
            border-radius: 6px; 
            font-size: 14px;
            transition: border-color 0.3s ease;
        }
        input:focus, textarea:focus { 
            outline: none;
            border-color: #667eea;
        }
        button { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            padding: 12px 24px; 
            border: none; 
            border-radius: 6px; 
            cursor: pointer; 
            margin: 8px 4px;
            font-size: 14px;
            font-weight: 600;
            transition: transform 0.2s ease;
        }
        button:hover { 
            transform: translateY(-2px);
        }
        .converter { 
            display: grid; 
            grid-template-columns: 1fr auto 1fr; 
            gap: 20px; 
            align-items: start; 
        }
        .controls {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px 0;
        }
        .result {
            margin-top: 20px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 6px;
            display: none;
        }
        textarea {
            min-height: 200px;
            resize: vertical;
        }
        @media (max-width: 768px) { 
            .converter { 
                grid-template-columns: 1fr; 
            }
            .controls {
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
            }
        }
    </style>
</head>
<body>
${templateContent}
</body>
</html>`;
}

// 主函数
async function main() {
  console.log('\n🚀 新工具页面创建向导\n');
  console.log('================================\n');

  // 显示分类选项
  console.log('📂 选择工具分类：');
  Object.entries(categories).forEach(([key, cat]) => {
    console.log(`  ${key}. ${cat.display}`);
  });
  
  const categoryChoice = await question('\n请选择分类 (1-5): ');
  
  if (!categories[categoryChoice]) {
    console.log('❌ 无效的分类选择！');
    rl.close();
    return;
  }

  const category = categories[categoryChoice];
  console.log(`✅ 已选择：${category.display}\n`);

  // 输入标题
  const title = await question('📝 请输入工具名称: ');
  
  if (!title.trim()) {
    console.log('❌ 工具名称不能为空！');
    rl.close();
    return;
  }

  // 输入描述
  const description = await question('📄 请输入工具描述: ');

  // 显示模板选项
  console.log('\n🎨 选择页面模板：');
  Object.entries(templates).forEach(([key, template]) => {
    console.log(`  ${key}. ${template.display}`);
  });
  
  const templateChoice = await question('\n请选择模板 (1-3): ');
  
  if (!templates[templateChoice]) {
    console.log('❌ 无效的模板选择！');
    rl.close();
    return;
  }

  const template = templates[templateChoice];
  console.log(`✅ 已选择：${template.display}\n`);

  // 生成文件名
  const fileName = generateFileName(title);
  const folderPath = path.join('tools', category.folder);
  const filePath = path.join(folderPath, `${fileName}.html`);

  // 确认创建
  console.log('📋 创建预览：');
  console.log(`   工具名称：${title}`);
  console.log(`   工具描述：${description}`);
  console.log(`   分类：${category.display}`);
  console.log(`   模板：${template.display}`);
  console.log(`   文件路径：${filePath}\n`);

  const confirm = await question('确认创建？(y/n): ');
  
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ 已取消创建');
    rl.close();
    return;
  }

  // 创建目录
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`📁 已创建目录：${folderPath}`);
  }

  // 生成HTML内容
  const htmlContent = generateHTML(title, description, category.name, templateChoice);

  // 写入文件
  try {
    fs.writeFileSync(filePath, htmlContent, 'utf8');
    console.log(`\n🎉 工具创建成功！`);
    console.log(`📄 文件路径：${filePath}`);
    console.log(`🌐 访问地址：${filePath.replace(/\\/g, '/')}`);
    console.log(`\n💡 提示：`);
    console.log(`   1. 在浏览器中打开文件测试功能`);
    console.log(`   2. 根据需要修改 HTML/CSS/JavaScript 代码`);
    console.log(`   3. 主导航页面会自动识别这个新工具\n`);
  } catch (error) {
    console.log(`❌ 创建失败：${error.message}`);
  }

  rl.close();
}

// 运行主函数
main().catch(console.error);