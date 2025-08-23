# EmailJS Payment Intent Notification System

This document provides a complete guide for implementing and configuring EmailJS email notifications for payment intent tracking in the Mahavatar Narsimha project.

## Overview

The EmailJS integration automatically sends email notifications to `310842705@qq.com` whenever a user shows payment intent (clicks on pricing options). This helps track user interest and potential conversions even when actual payments are disabled.

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   User clicks   │───▶│  Payment Intent  │───▶│   EmailJS API   │
│   pricing plan  │    │   API endpoint   │    │   sends email   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌──────────────────┐
                       │   Fallback API   │
                       │  (if primary     │
                       │   email fails)   │
                       └──────────────────┘
```

## Features

- ✅ Real-time email notifications for payment intents
- ✅ Beautiful HTML email templates with professional styling
- ✅ Fallback email system for reliability
- ✅ Environment-based configuration
- ✅ Admin test interface for validation
- ✅ Error handling and graceful degradation
- ✅ Template customization support

## File Structure

```
/Users/shengdongyang/githubWrokspace/movieIndia/
├── lib/emailjs.ts                           # EmailJS utility functions
├── app/api/payment-intent/route.ts          # Main payment intent API
├── app/api/test-email/route.ts              # Testing API endpoint
├── app/[locale]/(admin)/admin/email-test/   # Admin test interface
├── components/admin/EmailJSTest.tsx         # Test component
└── docs/
    ├── emailjs-template-setup.md           # Template setup guide
    └── EMAILJS_INTEGRATION.md              # This file
```

## Quick Setup Guide

### 1. Install Dependencies

Already installed: `@emailjs/browser@4.4.1`

### 2. Environment Variables

Add to your `.env` file:

```env
# EmailJS Configuration
EMAILJS_SERVICE_ID=service_xxxxxxx
EMAILJS_TEMPLATE_ID=template_xxxxxxx
EMAILJS_FALLBACK_TEMPLATE_ID=template_xxxxxxx
EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

### 3. EmailJS Account Setup

1. **Create Account**: Visit [emailjs.com](https://www.emailjs.com/) and register
2. **Add Email Service**: 
   - Go to Email Services → Add Service
   - Choose Gmail (recommended) or your preferred provider
   - Follow authentication steps
3. **Create Templates**: Use the HTML templates from `/docs/emailjs-template-setup.md`
4. **Get API Keys**: Copy Service ID, Template IDs, and Public Key

### 4. Test Configuration

1. Visit `/admin/email-test` in your admin panel
2. Click "Test EmailJS Configuration"
3. Send test emails to verify functionality

## API Endpoints

### POST /api/payment-intent

Main endpoint that tracks payment intent and sends email notifications.

**Request:**
```json
{
  "userEmail": "user@example.com",
  "planName": "Premium Plan",
  "amount": "$99.99",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment intent tracked successfully",
  "data": {
    "tracked": true,
    "timestamp": "2024-01-01T00:00:00.000Z",
    "feedbackEmail": "310842705@qq.com",
    "emailSent": true,
    "emailMessage": "Payment intent notification sent successfully"
  }
}
```

### GET /api/test-email

Tests EmailJS configuration without sending emails.

**Response:**
```json
{
  "success": true,
  "message": "EmailJS test successful",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "configuration": {
    "serviceId": "✅ Set",
    "templateId": "✅ Set",
    "fallbackTemplateId": "✅ Set",
    "publicKey": "✅ Set"
  }
}
```

### POST /api/test-email

Sends test emails for validation.

**Request:**
```json
{
  "userEmail": "test@example.com",
  "planName": "Test Plan",
  "amount": "$0.00",
  "testType": "primary"  // "primary", "fallback", or "both"
}
```

## Email Templates

### Primary Template Features

- 🎨 Modern, responsive HTML design
- 📊 Structured data display (user info, plan, amount, etc.)
- 🚨 High-priority visual indicators
- 📱 Mobile-friendly layout
- 🔧 Technical details section
- ⚡ Fast loading with inline CSS

### Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `to_email` | Recipient email | 310842705@qq.com |
| `user_email` | User's email | user@example.com |
| `plan_name` | Selected plan | Premium Plan |
| `amount` | Plan amount | $99.99 |
| `formatted_date` | Human-readable date | Monday, January 1, 2024 at 12:00:00 PM PST |
| `ip_address` | User's IP | 192.168.1.1 |
| `user_agent` | Browser info | Mozilla/5.0... |

### Template Preview

```html
┌─────────────────────────────────────┐
│        🎯 PAYMENT INTENT ALERT      │
│     New User Interest Detected      │
├─────────────────────────────────────┤
│  HIGH PRIORITY: User showed strong  │
│  purchase intent for Premium Plan   │
├─────────────────────────────────────┤
│ ⏰ Monday, Jan 1, 2024 12:00 PM     │
│ 👤 user@example.com                 │
│ 📦 Premium Plan                     │
│ 💰 $99.99                          │
│ 🌐 192.168.1.1                     │
├─────────────────────────────────────┤
│ 🔧 Technical Details                │
│ User Agent: Mozilla/5.0...          │
└─────────────────────────────────────┘
```

## Error Handling

The system implements multiple layers of error handling:

1. **Configuration Check**: Validates environment variables
2. **Primary Email**: Attempts main template first
3. **Fallback Email**: Uses simple template if primary fails
4. **Graceful Degradation**: Continues tracking even if emails fail
5. **Detailed Logging**: Console logs for debugging

### Error Recovery Flow

```
Primary Email Attempt
        │
        ├─ Success → ✅ Done
        │
        └─ Failure → Fallback Email Attempt
                            │
                            ├─ Success → ⚠️ Partial Success
                            │
                            └─ Failure → ❌ Email Failed (Payment Intent Still Tracked)
```

## Testing

### Manual Testing

1. **Configuration Test**:
   ```bash
   curl http://localhost:3000/api/test-email
   ```

2. **Email Send Test**:
   ```bash
   curl -X POST http://localhost:3000/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"testType": "primary"}'
   ```

3. **Payment Intent Test**:
   ```bash
   curl -X POST http://localhost:3000/api/payment-intent \
     -H "Content-Type: application/json" \
     -d '{
       "userEmail": "test@example.com",
       "planName": "Premium Plan",
       "amount": "$99.99",
       "userAgent": "Test Agent",
       "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'"
     }'
   ```

### Admin Interface Testing

Visit `/admin/email-test` for a visual testing interface with:
- Configuration validation
- Template testing
- Custom parameter testing
- Real-time result display

## Production Configuration

### EmailJS Plan Recommendations

- **Free Plan**: 200 emails/month (good for testing)
- **Personal Plan**: 1,000 emails/month at $15/month
- **Business Plan**: 10,000 emails/month at $50/month

### Security Best Practices

1. **Environment Variables**: Never expose API keys in client code
2. **Rate Limiting**: Implement on your API endpoints
3. **Input Validation**: Sanitize all email content
4. **Error Logging**: Monitor failed email attempts
5. **GDPR Compliance**: Handle user data appropriately

### Monitoring

Track these metrics in production:

- Email delivery success rate
- Template rendering errors
- API endpoint response times
- Failed notification attempts
- User agent patterns

## Troubleshooting

### Common Issues

#### 1. "EmailJS configuration missing"
**Cause**: Environment variables not set
**Solution**: Check `.env` file has all required variables

#### 2. "Template not found"
**Cause**: Wrong template ID or template not published
**Solution**: Verify template ID and publish in EmailJS dashboard

#### 3. "Service not found"
**Cause**: Wrong service ID or service not configured
**Solution**: Check service ID and email service setup

#### 4. Rate limiting errors
**Cause**: Too many emails sent (free plan limits)
**Solution**: Upgrade EmailJS plan or implement client-side rate limiting

#### 5. Template rendering errors
**Cause**: Missing template variables or syntax errors
**Solution**: Check template variables match the ones being passed

### Debug Mode

Enable detailed logging by checking server console during API calls:

```bash
# In development
npm run dev

# Watch console for:
# ✅ Email notification sent successfully
# ❌ Both email attempts failed: [error message]
```

## Customization

### Adding New Template Variables

1. Update `EmailNotificationParams` interface in `/lib/emailjs.ts`
2. Add variable to `templateParams` object
3. Update EmailJS template to use new variable
4. Test with new parameters

### Custom Email Templates

Create additional templates by:

1. Adding new template in EmailJS dashboard
2. Adding template ID to environment variables
3. Creating new function in `/lib/emailjs.ts`
4. Updating API routes to use new template

### Integration with Other Services

The system is designed to be extensible. You can:

- Add Slack notifications
- Integrate with CRM systems
- Send SMS alerts via Twilio
- Log to external analytics platforms

## Performance

### Optimization Tips

1. **Template Size**: Keep HTML templates under 100KB
2. **Async Operations**: Email sending is non-blocking
3. **Error Handling**: Graceful degradation maintains app performance
4. **Caching**: Consider template caching for high-volume usage

### Load Testing

For high-volume scenarios:

1. Test EmailJS rate limits
2. Implement client-side throttling
3. Consider batch email processing
4. Monitor API response times

## Support

### Resources

- **EmailJS Documentation**: [docs.emailjs.com](https://www.emailjs.com/docs/)
- **Template Examples**: `/docs/emailjs-template-setup.md`
- **API Reference**: This document
- **Admin Testing**: `/admin/email-test`

### Getting Help

1. Check server console logs for detailed error messages
2. Use the admin test interface to validate configuration
3. Verify EmailJS dashboard for service status
4. Review template syntax and variable usage

---

**Last Updated**: August 23, 2024
**Integration Version**: 1.0.0
**Dependencies**: @emailjs/browser@4.4.1