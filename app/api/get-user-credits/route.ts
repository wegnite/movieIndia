import { NextRequest } from 'next/server'
import { respErr, respData } from "@/lib/resp";
import { getUserCredits } from "@/services/credit";
import { getUserUuid } from "@/services/user";
import { getClientIp, rateLimit, apiResponse } from "@/lib/api-auth";

/**
 * 获取用户积分余额
 * 需要用户登录，包含速率限制保护
 */
export async function POST(req: NextRequest) {
  try {
    // 速率限制检查 - 每分钟最多10次请求
    const clientIp = getClientIp(req);
    if (!rateLimit(`credits:${clientIp}`, 10, 60000)) {
      return apiResponse(null, '请求过于频繁，请稍后再试', 429);
    }

    // 获取用户身份
    const user_uuid = await getUserUuid();
    if (!user_uuid) {
      return apiResponse(null, '请先登录', 401);
    }

    // 获取用户积分
    const credits = await getUserCredits(user_uuid);
    
    // 返回成功响应
    return respData({
      credits,
      user_uuid,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    // 记录错误但不暴露敏感信息
    console.error("获取用户积分失败: ", error);
    return apiResponse(null, '获取积分失败，请稍后重试', 500);
  }
}
