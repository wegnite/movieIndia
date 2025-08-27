// 重定向页面模板
// 用于处理无语言前缀的路径，自动重定向到带语言前缀的版本

import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

/**
 * 通用重定向页面组件
 * 自动检测用户语言并重定向到对应的国际化路径
 * 
 * 使用示例：
 * 1. 在 app/posts/page.tsx 创建文件
 * 2. 导入此函数并传入目标路径
 * 3. 用户访问 /posts 时会自动重定向到 /en/posts 或 /zh/posts
 */
export function createRedirectPage(targetPath: string) {
  return function RedirectPage() {
    // 获取请求头中的语言偏好
    const headersList = headers()
    const acceptLanguage = headersList.get('accept-language') || ''
    
    // 简单的语言检测逻辑
    // 如果包含中文相关标识，使用中文，否则使用英文
    const isChinesePreferred = acceptLanguage.toLowerCase().includes('zh')
    const locale = isChinesePreferred ? 'zh' : 'en'
    
    // 执行重定向
    redirect(`/${locale}${targetPath}`)
  }
}

// ============ 使用示例 ============

// 示例1：创建 /posts 重定向页面
// 文件路径：app/posts/page.tsx
/*
import { createRedirectPage } from '@/docs/redirect-page-template'
export default createRedirectPage('/posts')
*/

// 示例2：创建 /showcase 重定向页面  
// 文件路径：app/showcase/page.tsx
/*
import { createRedirectPage } from '@/docs/redirect-page-template'
export default createRedirectPage('/showcase')
*/

// 示例3：创建 /pricing 重定向页面（注意：已存在根目录pricing页面）
// 需要先决定是保留根目录页面还是使用国际化版本

// ============ 批量创建脚本 ============
// 可以运行以下bash命令批量创建重定向页面：
/*
#!/bin/bash
# create-redirects.sh

# 需要创建重定向的路径列表
paths=("posts" "showcase")

for path in "${paths[@]}"; do
  mkdir -p "app/$path"
  cat > "app/$path/page.tsx" << EOF
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default function RedirectPage() {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  const isChinesePreferred = acceptLanguage.toLowerCase().includes('zh')
  const locale = isChinesePreferred ? 'zh' : 'en'
  redirect(\`/\${locale}/$path\`)
}
EOF
  echo "✅ Created redirect page for /$path"
done
*/