import emailjs from '@emailjs/browser';

export interface EmailNotificationParams {
  userEmail: string;
  planName: string;
  amount: string;
  userAgent: string;
  ipAddress: string;
  timestamp: string;
}

export interface EmailJSResponse {
  success: boolean;
  message: string;
  emailjsResponse?: any;
}

/**
 * Initialize EmailJS with service configuration
 */
export function initializeEmailJS(): void {
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  
  if (!publicKey) {
    console.warn('EmailJS Public Key not found in environment variables');
    return;
  }
  
  emailjs.init(publicKey);
}

/**
 * Send payment intent notification email using EmailJS
 * @param params - Payment intent data
 * @returns Promise with email sending result
 */
export async function sendPaymentIntentEmail(
  params: EmailNotificationParams
): Promise<EmailJSResponse> {
  try {
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      return {
        success: false,
        message: 'EmailJS configuration missing. Please check environment variables.',
      };
    }

    // Initialize EmailJS
    initializeEmailJS();

    // Format the date for better readability
    const formattedDate = new Date(params.timestamp).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });

    // Template parameters for EmailJS
    const templateParams = {
      to_email: '310842705@qq.com',
      user_email: params.userEmail || 'Not provided',
      plan_name: params.planName,
      amount: params.amount,
      formatted_date: formattedDate,
      raw_timestamp: params.timestamp,
      user_agent: params.userAgent,
      ip_address: params.ipAddress,
      subject: `🎯 Payment Intent: ${params.planName} - ${params.amount}`,
      // Additional fields that might be useful in the template
      notification_type: 'Payment Intent',
      priority: 'High',
    };

    console.log('Sending email with template params:', {
      ...templateParams,
      user_agent: params.userAgent.substring(0, 100) + '...' // Truncate for logging
    });

    // Send email using EmailJS
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    console.log('EmailJS response:', response);

    return {
      success: true,
      message: 'Payment intent notification sent successfully',
      emailjsResponse: response,
    };

  } catch (error) {
    console.error('Error sending payment intent email:', error);
    
    return {
      success: false,
      message: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Send a fallback email notification using a simple template
 * This can be used when the main template fails
 */
export async function sendFallbackPaymentIntentEmail(
  params: EmailNotificationParams
): Promise<EmailJSResponse> {
  try {
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const fallbackTemplateId = process.env.EMAILJS_FALLBACK_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    if (!serviceId || !fallbackTemplateId || !publicKey) {
      return {
        success: false,
        message: 'EmailJS fallback configuration missing',
      };
    }

    initializeEmailJS();

    const templateParams = {
      to_email: '310842705@qq.com',
      subject: `Payment Intent Alert - ${params.planName}`,
      message: `
        New payment intent detected:
        
        Time: ${new Date(params.timestamp).toLocaleString()}
        User: ${params.userEmail || 'Anonymous'}
        Plan: ${params.planName}
        Amount: ${params.amount}
        IP: ${params.ipAddress}
        
        This notification was sent using the fallback template.
      `.trim(),
    };

    const response = await emailjs.send(
      serviceId,
      fallbackTemplateId,
      templateParams,
      publicKey
    );

    return {
      success: true,
      message: 'Fallback payment intent notification sent successfully',
      emailjsResponse: response,
    };

  } catch (error) {
    console.error('Error sending fallback email:', error);
    
    return {
      success: false,
      message: `Failed to send fallback email: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Test EmailJS connection and configuration
 */
export async function testEmailJSConnection(): Promise<EmailJSResponse> {
  try {
    const testParams: EmailNotificationParams = {
      userEmail: 'test@example.com',
      planName: 'Test Plan',
      amount: '$0.00',
      userAgent: 'Test User Agent',
      ipAddress: '127.0.0.1',
      timestamp: new Date().toISOString(),
    };

    const result = await sendPaymentIntentEmail(testParams);
    
    return {
      success: result.success,
      message: result.success ? 'EmailJS test successful' : result.message,
      emailjsResponse: result.emailjsResponse,
    };

  } catch (error) {
    return {
      success: false,
      message: `EmailJS test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}