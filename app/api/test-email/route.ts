import { NextRequest, NextResponse } from 'next/server';
import { 
  sendPaymentIntentEmail, 
  sendFallbackPaymentIntentEmail, 
  testEmailJSConnection,
  EmailNotificationParams 
} from '@/lib/emailjs';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing EmailJS connection...');
    
    const result = await testEmailJSConnection();
    
    return NextResponse.json({
      success: result.success,
      message: result.message,
      timestamp: new Date().toISOString(),
      configuration: {
        serviceId: process.env.EMAILJS_SERVICE_ID ? '✅ Set' : '❌ Missing',
        templateId: process.env.EMAILJS_TEMPLATE_ID ? '✅ Set' : '❌ Missing',
        fallbackTemplateId: process.env.EMAILJS_FALLBACK_TEMPLATE_ID ? '✅ Set' : '❌ Missing',
        publicKey: process.env.EMAILJS_PUBLIC_KEY ? '✅ Set' : '❌ Missing',
      }
    });

  } catch (error) {
    console.error('EmailJS test error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'EmailJS test failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const testType = body.testType || 'primary';

    console.log(`Testing EmailJS with type: ${testType}`);

    // Create test parameters
    const testParams: EmailNotificationParams = {
      userEmail: body.userEmail || 'test-user@example.com',
      planName: body.planName || 'Test Premium Plan',
      amount: body.amount || '$99.99',
      userAgent: body.userAgent || 'Mozilla/5.0 (Test Browser) EmailJS Test',
      ipAddress: request.headers.get('x-forwarded-for') || '127.0.0.1',
      timestamp: body.timestamp || new Date().toISOString(),
    };

    let result;

    switch (testType) {
      case 'primary':
        result = await sendPaymentIntentEmail(testParams);
        break;
      
      case 'fallback':
        result = await sendFallbackPaymentIntentEmail(testParams);
        break;
      
      case 'both':
        console.log('Testing primary email...');
        const primaryResult = await sendPaymentIntentEmail(testParams);
        
        console.log('Testing fallback email...');
        const fallbackResult = await sendFallbackPaymentIntentEmail(testParams);
        
        result = {
          success: primaryResult.success || fallbackResult.success,
          message: `Primary: ${primaryResult.message}, Fallback: ${fallbackResult.message}`,
          primaryResult,
          fallbackResult,
        };
        break;
      
      default:
        return NextResponse.json(
          { 
            success: false, 
            message: 'Invalid test type. Use: primary, fallback, or both' 
          },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: result.success,
      message: result.message,
      testType,
      testParams: {
        ...testParams,
        userAgent: testParams.userAgent.substring(0, 50) + '...' // Truncate for response
      },
      result,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Email test error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Email test failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}