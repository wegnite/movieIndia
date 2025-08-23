# EmailJS Template Setup Guide

This document provides instructions for setting up EmailJS templates for payment intent notifications.

## Prerequisites

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up an email service (Gmail, Outlook, etc.)
3. Create email templates
4. Get your API keys

## Environment Variables

Add these to your `.env` file:

```env
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_TEMPLATE_ID=your_template_id_here
EMAILJS_FALLBACK_TEMPLATE_ID=your_fallback_template_id_here
EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Primary Email Template

Create a new template in EmailJS with the following HTML content:

### Template Name: `payment_intent_notification`

### Template Parameters:
- `to_email` - Recipient email (310842705@qq.com)
- `user_email` - User's email address
- `plan_name` - Selected plan name
- `amount` - Payment amount
- `formatted_date` - Formatted timestamp
- `user_agent` - User's browser info
- `ip_address` - User's IP address
- `subject` - Email subject line

### HTML Template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Intent Notification</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        
        .email-container {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #4CAF50;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .header h1 {
            color: #2c3e50;
            margin: 0;
            font-size: 24px;
        }
        
        .alert-badge {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        
        .info-grid {
            display: grid;
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .info-item {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #4CAF50;
        }
        
        .info-label {
            font-weight: bold;
            color: #2c3e50;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        
        .info-value {
            color: #34495e;
            font-size: 16px;
            word-break: break-all;
        }
        
        .priority-high {
            background: linear-gradient(135deg, #ff7b7b 0%, #ff416c 100%);
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
            font-weight: bold;
        }
        
        .technical-details {
            background: #e8f4f8;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #bee5eb;
            margin-top: 20px;
        }
        
        .technical-details h3 {
            color: #0c5460;
            margin-top: 0;
            font-size: 16px;
        }
        
        .user-agent {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            color: #6c757d;
            background: white;
            padding: 10px;
            border-radius: 4px;
            word-break: break-all;
            overflow-wrap: break-word;
        }
        
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #6c757d;
            font-size: 12px;
        }
        
        .timestamp {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 10px;
            border-radius: 6px;
            font-weight: bold;
        }
        
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            
            .email-container {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="alert-badge">🎯 PAYMENT INTENT ALERT</div>
            <h1>New User Interest Detected</h1>
        </div>
        
        <div class="priority-high">
            HIGH PRIORITY: User showed strong purchase intent for {{plan_name}}
        </div>
        
        <div class="info-grid">
            <div class="info-item">
                <div class="info-label">⏰ Timestamp</div>
                <div class="info-value timestamp">{{formatted_date}}</div>
            </div>
            
            <div class="info-item">
                <div class="info-label">👤 User Email</div>
                <div class="info-value">{{user_email}}</div>
            </div>
            
            <div class="info-item">
                <div class="info-label">📦 Plan Selected</div>
                <div class="info-value"><strong>{{plan_name}}</strong></div>
            </div>
            
            <div class="info-item">
                <div class="info-label">💰 Amount</div>
                <div class="info-value"><strong>{{amount}}</strong></div>
            </div>
            
            <div class="info-item">
                <div class="info-label">🌐 IP Address</div>
                <div class="info-value">{{ip_address}}</div>
            </div>
        </div>
        
        <div class="technical-details">
            <h3>🔧 Technical Details</h3>
            <div class="info-label">User Agent:</div>
            <div class="user-agent">{{user_agent}}</div>
        </div>
        
        <div class="footer">
            <p>📧 This notification was sent automatically by the Payment Intent Tracking System</p>
            <p>🕒 Generated at {{raw_timestamp}}</p>
            <p>🔔 Notification sent to: {{to_email}}</p>
        </div>
    </div>
</body>
</html>
```

### Email Subject Template:
```
{{subject}}
```

## Fallback Email Template

Create a simple fallback template for when the primary template fails:

### Template Name: `payment_intent_fallback`

### Template Parameters:
- `to_email` - Recipient email
- `subject` - Email subject
- `message` - Plain text message

### HTML Template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Intent Alert</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .container {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
            border: 1px solid #ddd;
        }
        
        .header {
            background: #d32f2f;
            color: white;
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            margin-bottom: 20px;
        }
        
        .message {
            white-space: pre-line;
            background: white;
            padding: 15px;
            border-radius: 3px;
            border-left: 4px solid #d32f2f;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>⚠️ Payment Intent Alert (Fallback)</h2>
        </div>
        <div class="message">
            {{message}}
        </div>
        <p><em>This is a fallback notification sent to: {{to_email}}</em></p>
    </div>
</body>
</html>
```

## Setup Steps

1. **Create EmailJS Account**
   - Go to [emailjs.com](https://www.emailjs.com/)
   - Sign up for a free account

2. **Add Email Service**
   - Go to Email Services
   - Add your email provider (Gmail recommended)
   - Follow authentication steps

3. **Create Templates**
   - Go to Email Templates
   - Create a new template with the HTML above
   - Use the template parameters as specified
   - Note down the Template ID

4. **Get API Keys**
   - Go to Account > API Keys
   - Copy your Public Key
   - Copy your Service ID

5. **Configure Environment**
   - Add all keys to your `.env` file
   - Test the integration

## Testing

You can test the EmailJS integration by calling the test endpoint:

```bash
# Test EmailJS configuration
curl -X POST http://localhost:3000/api/payment-intent \
  -H "Content-Type: application/json" \
  -d '{
    "userEmail": "test@example.com",
    "planName": "Premium Plan",
    "amount": "$29.99",
    "userAgent": "Test Browser",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'"
  }'
```

## Troubleshooting

### Common Issues:

1. **"EmailJS configuration missing"**
   - Check that all environment variables are set
   - Verify the variable names match exactly

2. **"Template not found"**
   - Verify template ID is correct
   - Ensure template is published in EmailJS

3. **"Service not found"**
   - Check service ID
   - Ensure email service is properly configured

4. **Rate limiting**
   - EmailJS free plan has monthly limits
   - Consider upgrading for production use

### Debug Mode:
Enable debug logging by checking the server console when testing the payment intent API.

## Security Considerations

1. **API Keys**: Never expose private keys in client-side code
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Validation**: Always validate email parameters before sending
4. **Fallback**: Always have a fallback mechanism for critical notifications

## Production Recommendations

1. Use a paid EmailJS plan for better reliability
2. Set up monitoring for failed email sends
3. Consider using multiple email services for redundancy
4. Implement retry logic with exponential backoff
5. Store failed email attempts for manual review