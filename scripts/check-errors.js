#!/usr/bin/env node

/**
 * 错误检查脚本
 * 扫描代码中的常见问题
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 开始检查代码错误...\n');

let errorCount = 0;
let warningCount = 0;

// 检查重复的 key 问题
function checkDuplicateKeys(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const issues = [];
  
  lines.forEach((line, index) => {
    // 检查使用动态值作为 key 的情况
    if (line.includes('key={') && !line.includes('key="') && !line.includes("key='")) {
      // 检查是否使用了可能重复的值（如数字）
      const keyMatch = line.match(/key=\{([^}]+)\}/);
      if (keyMatch) {
        const keyValue = keyMatch[1];
        // 检查是否是数字或可能为0的值
        if (keyValue.match(/\.(seconds|minutes|hours|days|months|years)/) ||
            keyValue.match(/\[?\d+\]?/) ||
            keyValue.match(/index/)) {
          issues.push({
            line: index + 1,
            code: line.trim(),
            issue: `可能的重复 key: key={${keyValue}}`
          });
        }
      }
    }
  });
  
  return issues;
}

// 检查 map 循环中的 key
function checkMapKeys(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // 查找 map 函数
  const mapRegex = /\.map\s*\(([^)]+)\)\s*=>\s*[\(\{]/g;
  let match;
  
  while ((match = mapRegex.exec(content)) !== null) {
    const mapBlock = content.substring(match.index, Math.min(match.index + 500, content.length));
    
    // 检查是否有 key prop
    if (!mapBlock.includes('key=')) {
      const lineNumber = content.substring(0, match.index).split('\n').length;
      issues.push({
        line: lineNumber,
        code: match[0],
        issue: 'map 循环可能缺少 key'
      });
    }
  }
  
  return issues;
}

// 递归查找文件的函数
function findFiles(dir, pattern, files = []) {
  if (!fs.existsSync(dir)) return files;
  
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      findFiles(fullPath, pattern, files);
    } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.jsx'))) {
      files.push(fullPath);
    }
  }
  return files;
}

// 检查 TSX/JSX 文件
const tsxFiles = findFiles('components', /\.(tsx|jsx)$/);

console.log(`📁 找到 ${tsxFiles.length} 个组件文件\n`);

tsxFiles.forEach(file => {
  const filePath = path.resolve(file);
  const duplicateKeyIssues = checkDuplicateKeys(filePath);
  const mapKeyIssues = checkMapKeys(filePath);
  
  if (duplicateKeyIssues.length > 0 || mapKeyIssues.length > 0) {
    console.log(`📄 ${file}`);
    
    duplicateKeyIssues.forEach(issue => {
      console.log(`  ❌ 行 ${issue.line}: ${issue.issue}`);
      console.log(`     ${issue.code}`);
      errorCount++;
    });
    
    mapKeyIssues.forEach(issue => {
      console.log(`  ⚠️  行 ${issue.line}: ${issue.issue}`);
      console.log(`     ${issue.code}`);
      warningCount++;
    });
    
    console.log('');
  }
});

// 检查环境变量
console.log('🔧 检查环境变量配置...\n');

const envVars = [
  'EMAILJS_SERVICE_ID',
  'EMAILJS_TEMPLATE_ID',
  'EMAILJS_PUBLIC_KEY',
  'DATABASE_URL',
  'NEXT_PUBLIC_WEB_URL'
];

const missingEnvVars = envVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.log('⚠️  缺少的环境变量:');
  missingEnvVars.forEach(varName => {
    console.log(`  - ${varName}`);
    warningCount++;
  });
  console.log('\n  提示: 在 .env.local 中配置这些变量');
  console.log('');
}

// 总结
console.log('📊 检查结果:');
console.log(`  ❌ 错误: ${errorCount}`);
console.log(`  ⚠️  警告: ${warningCount}`);

if (errorCount === 0 && warningCount === 0) {
  console.log('\n✅ 没有发现问题!');
} else if (errorCount > 0) {
  console.log('\n❌ 发现错误，请修复后再部署');
  process.exit(1);
} else {
  console.log('\n⚠️  有一些警告，但不影响运行');
}