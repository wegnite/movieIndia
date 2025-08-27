"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TestEmailConfig() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testEmailConfig = async () => {
    setTesting(true);
    setResult(null);

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          test: true,
          planName: "测试套餐",
          amount: "₹99",
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : String(error) });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">📧 EmailJS 配置测试</h1>
        
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-semibold mb-2">配置步骤：</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>访问 <a href="https://www.emailjs.com/" target="_blank" className="text-blue-500 underline">EmailJS.com</a> 注册账号</li>
              <li>创建一个 Email Service（选择 Gmail 或 Outlook）</li>
              <li>创建一个 Email Template（使用下面的模板内容）</li>
              <li>获取 Service ID, Template ID 和 Public Key</li>
              <li>填写到 .env.local 文件中</li>
              <li>重启开发服务器</li>
            </ol>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h3 className="font-semibold mb-2">📝 推荐的模板内容：</h3>
            <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
{`主题: 🎬 付费意愿通知 - {{plan_name}}

内容:
有用户对您的内容表现出付费意愿！

📊 详情：
- 套餐：{{plan_name}}
- 价格：{{amount}}
- 时间：{{timestamp}}
- 邮箱：{{user_email}}
- IP：{{ip_address}}

---
发送到：310842705@qq.com`}
            </pre>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded">
            <h3 className="font-semibold mb-2">当前配置状态：</h3>
            <ul className="space-y-1 text-sm">
              <li>EMAILJS_SERVICE_ID: {process.env.EMAILJS_SERVICE_ID ? "✅ 已配置" : "❌ 未配置"}</li>
              <li>EMAILJS_TEMPLATE_ID: {process.env.EMAILJS_TEMPLATE_ID ? "✅ 已配置" : "❌ 未配置"}</li>
              <li>EMAILJS_PUBLIC_KEY: {process.env.EMAILJS_PUBLIC_KEY ? "✅ 已配置" : "❌ 未配置"}</li>
            </ul>
          </div>
        </div>

        <Button onClick={testEmailConfig} disabled={testing} className="w-full">
          {testing ? "测试中..." : "发送测试邮件到 310842705@qq.com"}
        </Button>

        {result && (
          <div className={`mt-4 p-4 rounded ${result.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </Card>
    </div>
  );
}