/**
 * Vercel-optimized payment intent API
 * Automatically detects and uses appropriate storage
 */

import { NextRequest, NextResponse } from 'next/server';
import { respErr, respData } from '@/lib/resp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userEmail, planName, amount, userAgent, timestamp, feedback } = body;
    
    const intentData = {
      userEmail: userEmail || '',
      planName,
      amount,
      userAgent: userAgent || request.headers.get('user-agent') || 'Unknown',
      timestamp: timestamp || new Date().toISOString(),
      feedback: feedback || '',
      ipAddress: request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'Unknown',
      sessionId: request.cookies.get('ab_session_id')?.value || ''
    };

    // Console log for Vercel Functions logs
    console.log('📊 Payment Intent Received:', {
      plan: planName,
      amount,
      email: userEmail || 'Not provided',
      timestamp: new Date().toISOString()
    });

    let savedId: string;
    let persisted = false;

    // Detect environment and use appropriate storage
    if (process.env.VERCEL) {
      // Running on Vercel - use cloud storage
      try {
        const { savePaymentIntent } = await import('@/lib/payment-intent-vercel');
        savedId = await savePaymentIntent(intentData);
        persisted = true;
        console.log('✅ Saved to Vercel KV:', savedId);
      } catch (error) {
        console.error('Failed to save to Vercel KV:', error);
        // Fallback to logs only
        savedId = crypto.randomUUID();
      }
    } else {
      // Local development - use file system
      try {
        const { PaymentIntentStorage } = await import('@/lib/payment-intent-storage');
        const storage = new PaymentIntentStorage();
        const record = await storage.save({
          ...intentData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString()
        });
        savedId = record.id;
        persisted = true;
        console.log('✅ Saved to local file system:', savedId);
      } catch (error) {
        console.error('Failed to save locally:', error);
        savedId = crypto.randomUUID();
      }
    }

    // Try to send email notification (optional)
    let emailSent = false;
    let emailMessage = '';
    
    if (process.env.EMAILJS_SERVICE_ID) {
      try {
        const { sendPaymentIntentEmail } = await import('@/lib/emailjs');
        const result = await sendPaymentIntentEmail(intentData);
        emailSent = result.success;
        emailMessage = result.message;
      } catch (error) {
        console.error('Email sending failed:', error);
        emailMessage = 'Email service unavailable';
      }
    }

    return respData({
      tracked: true,
      paymentIntentId: savedId,
      timestamp: intentData.timestamp,
      persisted,
      feedbackEmail: '310842705@qq.com',
      emailSent,
      emailMessage: emailMessage || 'Email service not configured',
      storage: process.env.VERCEL ? 'vercel-kv' : 'local-file'
    });

  } catch (error) {
    console.error('Payment intent tracking error:', error);
    return respErr('Failed to track payment intent');
  }
}

export async function GET(request: NextRequest) {
  try {
    // Simple stats endpoint
    if (process.env.VERCEL) {
      const { getPaymentIntentStats } = await import('@/lib/payment-intent-vercel');
      const stats = await getPaymentIntentStats();
      return respData(stats);
    } else {
      const { PaymentIntentAnalytics } = await import('@/lib/payment-intent-analytics');
      const analytics = new PaymentIntentAnalytics();
      const stats = await analytics.getQuickStats();
      return respData(stats);
    }
  } catch (error) {
    console.error('Failed to get stats:', error);
    return respErr('Stats unavailable');
  }
}