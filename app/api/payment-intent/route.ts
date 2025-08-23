import { NextRequest, NextResponse } from 'next/server';
import { 
  sendPaymentIntentEmail, 
  sendFallbackPaymentIntentEmail, 
  EmailNotificationParams 
} from '@/lib/emailjs';
import { paymentIntentStorage } from '@/lib/payment-intent-storage';
import { respData, respErr } from '@/lib/resp';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userEmail, planName, amount, userAgent, timestamp, feedback } = body;

    // Extract IP address
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'Unknown';

    // Persist payment intent data first
    let paymentIntentId: string | null = null;
    try {
      paymentIntentId = await paymentIntentStorage.savePaymentIntent({
        timestamp: timestamp || new Date().toISOString(),
        planName,
        amount,
        userEmail,
        userAgent,
        ipAddress,
        feedback,
      });
      console.log(`💾 Payment intent persisted with ID: ${paymentIntentId}`);
    } catch (storageError) {
      console.error('❌ Failed to persist payment intent:', storageError);
      // Continue with email sending even if storage fails
    }

    const logMessage = `
===== PAYMENT INTENT DETECTED =====
ID: ${paymentIntentId || 'Not persisted'}
Time: ${new Date(timestamp).toLocaleString()}
User Email: ${userEmail || 'Not provided'}
Plan: ${planName}
Amount: ${amount}
User Agent: ${userAgent}
IP: ${ipAddress}
Feedback: ${feedback || 'None'}
===================================
    `;

    console.log(logMessage);

    // Prepare email notification parameters
    const emailParams: EmailNotificationParams = {
      userEmail: userEmail || 'Not provided',
      planName,
      amount,
      userAgent,
      ipAddress,
      timestamp,
    };

    let emailResult = { success: false, message: 'Email not attempted' };

    try {
      // Attempt to send email using EmailJS
      console.log('Attempting to send payment intent notification email...');
      emailResult = await sendPaymentIntentEmail(emailParams);
      
      if (!emailResult.success) {
        console.warn('Primary email failed, trying fallback...', emailResult.message);
        
        // Try fallback email if primary fails
        emailResult = await sendFallbackPaymentIntentEmail(emailParams);
      }
      
      if (emailResult.success) {
        console.log('✅ Email notification sent successfully');
      } else {
        console.error('❌ Both email attempts failed:', emailResult.message);
      }
      
    } catch (emailError) {
      console.error('❌ Email sending error:', emailError);
      emailResult = {
        success: false,
        message: `Email error: ${emailError instanceof Error ? emailError.message : 'Unknown error'}`
      };
    }

    // Return response with storage and email status
    return respData({
      tracked: true,
      paymentIntentId,
      timestamp: timestamp || new Date().toISOString(),
      persisted: !!paymentIntentId,
      feedbackEmail: '310842705@qq.com',
      emailSent: emailResult.success,
      emailMessage: emailResult.message,
      storageHealthy: true, // We'll implement health check later
    });

  } catch (error) {
    console.error('Error tracking payment intent:', error);
    return respErr(`Failed to track payment intent: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}