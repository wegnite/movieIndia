#!/usr/bin/env node

/**
 * 路由验证脚本
 * 用于检查 sitemap 中的所有路径是否可访问
 * 
 * 使用方法：
 * 1. 启动开发服务器: pnpm dev
 * 2. 在新终端运行: node docs/verify-routes.js
 */

const fs = require('fs');
const path = require('path');

// 配置
const config = {
  baseUrl: 'http://localhost:3000', // 本地开发服务器
  sitemapPath: './app/sitemap.ts',  // sitemap 文件路径
  timeout: 5000,                    // 请求超时时间（毫秒）
};

// ANSI 颜色码
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

/**
 * 从 sitemap.ts 文件提取所有URL
 */
function extractUrlsFromSitemap() {
  const sitemapContent = fs.readFileSync(config.sitemapPath, 'utf-8');
  
  // 提取所有URL（简单的正则匹配）
  const urlPattern = /url:\s*[`'"]([^`'"]+)[`'"]/g;
  const urls = [];
  let match;
  
  while ((match = urlPattern.exec(sitemapContent)) !== null) {
    urls.push(match[1]);
  }
  
  // 也提取使用模板字符串的URL
  const templatePattern = /url:\s*`\${baseUrl}([^`]*)`/g;
  while ((match = templatePattern.exec(sitemapContent)) !== null) {
    const path = match[1].replace(/\$\{locale\}/g, 'en');
    urls.push(`https://mahavatar-narsimha.com${path}`);
  }
  
  return [...new Set(urls)]; // 去重
}

/**
 * 检查单个URL是否可访问
 */
async function checkUrl(url) {
  // 将生产URL转换为本地URL
  const localUrl = url.replace('https://mahavatar-narsimha.com', config.baseUrl);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);
    
    const response = await fetch(localUrl, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'manual', // 不自动跟随重定向
    });
    
    clearTimeout(timeoutId);
    
    return {
      url: url,
      localUrl: localUrl,
      status: response.status,
      ok: response.status < 400,
      redirected: response.status >= 300 && response.status < 400,
    };
  } catch (error) {
    return {
      url: url,
      localUrl: localUrl,
      status: error.name === 'AbortError' ? 'TIMEOUT' : 'ERROR',
      ok: false,
      error: error.message,
    };
  }
}

/**
 * 检查文件系统中是否存在对应的页面文件
 */
function checkFileExists(urlPath) {
  // 移除域名部分
  const pathname = urlPath.replace(/^https?:\/\/[^\/]+/, '');
  
  // 可能的文件路径
  const possiblePaths = [
    `./app${pathname}/page.tsx`,
    `./app${pathname}/page.ts`,
    `./app${pathname}.tsx`,
    `./app${pathname}.ts`,
    // 处理国际化路径
    `./app/[locale]${pathname}/page.tsx`,
    `./app/[locale]${pathname}/page.ts`,
  ];
  
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return { exists: true, path: filePath };
    }
  }
  
  return { exists: false, path: null };
}

/**
 * 主函数
 */
async function main() {
  console.log(`${colors.cyan}🔍 路由验证工具${colors.reset}\n`);
  console.log(`${colors.blue}配置信息：${colors.reset}`);
  console.log(`  - 本地服务器: ${config.baseUrl}`);
  console.log(`  - Sitemap文件: ${config.sitemapPath}`);
  console.log(`  - 超时时间: ${config.timeout}ms\n`);
  
  // 提取URLs
  console.log(`${colors.yellow}📋 正在提取sitemap中的URLs...${colors.reset}`);
  const urls = extractUrlsFromSitemap();
  console.log(`  找到 ${urls.length} 个URL\n`);
  
  // 检查每个URL
  console.log(`${colors.yellow}🔗 正在验证URLs...${colors.reset}\n`);
  
  const results = {
    success: [],
    redirects: [],
    notFound: [],
    errors: [],
  };
  
  for (const url of urls) {
    const result = await checkUrl(url);
    const fileCheck = checkFileExists(url);
    
    // 根据结果分类
    if (result.ok && !result.redirected) {
      results.success.push({ ...result, file: fileCheck });
      console.log(`${colors.green}✅${colors.reset} ${url}`);
    } else if (result.redirected) {
      results.redirects.push({ ...result, file: fileCheck });
      console.log(`${colors.yellow}↪️${colors.reset}  ${url} (${result.status})`);
    } else if (result.status === 404) {
      results.notFound.push({ ...result, file: fileCheck });
      console.log(`${colors.red}❌${colors.reset} ${url} (404 Not Found)`);
      if (!fileCheck.exists) {
        console.log(`    ${colors.red}⚠️  文件不存在${colors.reset}`);
      }
    } else {
      results.errors.push({ ...result, file: fileCheck });
      console.log(`${colors.red}⚠️${colors.reset}  ${url} (${result.status})`);
    }
  }
  
  // 打印总结
  console.log(`\n${colors.cyan}📊 验证报告${colors.reset}`);
  console.log(`${colors.green}✅ 成功: ${results.success.length}${colors.reset}`);
  console.log(`${colors.yellow}↪️  重定向: ${results.redirects.length}${colors.reset}`);
  console.log(`${colors.red}❌ 404错误: ${results.notFound.length}${colors.reset}`);
  console.log(`${colors.red}⚠️  其他错误: ${results.errors.length}${colors.reset}`);
  
  // 如果有404错误，列出详情
  if (results.notFound.length > 0) {
    console.log(`\n${colors.red}404错误详情：${colors.reset}`);
    results.notFound.forEach(item => {
      console.log(`  - ${item.url}`);
      if (!item.file.exists) {
        const pathname = item.url.replace(/^https?:\/\/[^\/]+/, '');
        console.log(`    建议创建: app${pathname}/page.tsx`);
      }
    });
  }
  
  // 保存详细报告
  const reportPath = './docs/route-validation-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n${colors.blue}💾 详细报告已保存至: ${reportPath}${colors.reset}`);
  
  // 返回退出码
  process.exit(results.notFound.length > 0 ? 1 : 0);
}

// 运行主函数
main().catch(error => {
  console.error(`${colors.red}错误: ${error.message}${colors.reset}`);
  process.exit(1);
});