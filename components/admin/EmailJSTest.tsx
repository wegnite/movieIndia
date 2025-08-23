'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface TestResult {
  success: boolean;
  message: string;
  timestamp: string;
  configuration?: {
    serviceId: string;
    templateId: string;
    fallbackTemplateId: string;
    publicKey: string;
  };
  result?: any;
}

export default function EmailJSTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [testParams, setTestParams] = useState({
    userEmail: 'test-user@example.com',
    planName: 'Premium Plan',
    amount: '$99.99',
    testType: 'primary'
  });

  const testConfiguration = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test-email', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testEmail = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...testParams,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderConfiguration = (config: any) => {
    if (!config) return null;

    return (
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Service ID:</span>
          <Badge variant={config.serviceId.includes('✅') ? 'default' : 'destructive'}>
            {config.serviceId}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Template ID:</span>
          <Badge variant={config.templateId.includes('✅') ? 'default' : 'destructive'}>
            {config.templateId}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Fallback Template:</span>
          <Badge variant={config.fallbackTemplateId.includes('✅') ? 'default' : 'destructive'}>
            {config.fallbackTemplateId}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Public Key:</span>
          <Badge variant={config.publicKey.includes('✅') ? 'default' : 'destructive'}>
            {config.publicKey}
          </Badge>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📧 EmailJS Integration Test
            <Badge variant="outline">Admin Only</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">1. Test Configuration</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Check if all EmailJS environment variables are properly configured.
            </p>
            <Button 
              onClick={testConfiguration}
              disabled={isLoading}
              variant="outline"
              className="w-full"
            >
              {isLoading ? 'Testing...' : 'Test EmailJS Configuration'}
            </Button>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-semibold mb-2">2. Test Email Sending</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Send a test payment intent notification email.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="userEmail">User Email</Label>
                <Input
                  id="userEmail"
                  value={testParams.userEmail}
                  onChange={(e) => setTestParams({ ...testParams, userEmail: e.target.value })}
                  placeholder="test@example.com"
                />
              </div>
              <div>
                <Label htmlFor="planName">Plan Name</Label>
                <Input
                  id="planName"
                  value={testParams.planName}
                  onChange={(e) => setTestParams({ ...testParams, planName: e.target.value })}
                  placeholder="Premium Plan"
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  value={testParams.amount}
                  onChange={(e) => setTestParams({ ...testParams, amount: e.target.value })}
                  placeholder="$99.99"
                />
              </div>
              <div>
                <Label htmlFor="testType">Test Type</Label>
                <select
                  id="testType"
                  value={testParams.testType}
                  onChange={(e) => setTestParams({ ...testParams, testType: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="primary">Primary Template</option>
                  <option value="fallback">Fallback Template</option>
                  <option value="both">Both Templates</option>
                </select>
              </div>
            </div>

            <Button 
              onClick={testEmail}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Sending Test Email...' : 'Send Test Email'}
            </Button>
          </div>

          {result && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">Test Results</h3>
              <Alert variant={result.success ? 'default' : 'destructive'}>
                <AlertDescription>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={result.success ? 'default' : 'destructive'}>
                        {result.success ? '✅ Success' : '❌ Failed'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {result.timestamp}
                      </span>
                    </div>
                    <p className="text-sm">{result.message}</p>
                    
                    {result.configuration && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold mb-2">Configuration Status:</p>
                        {renderConfiguration(result.configuration)}
                      </div>
                    )}
                    
                    {result.result && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold mb-2">Detailed Result:</p>
                        <pre className="text-xs bg-muted p-2 rounded overflow-auto">
                          {JSON.stringify(result.result, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">📋 Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">1</Badge>
              <span>Create account at <a href="https://emailjs.com" target="_blank" className="text-blue-600 hover:underline">emailjs.com</a></span>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">2</Badge>
              <span>Add your email service (Gmail, Outlook, etc.)</span>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">3</Badge>
              <span>Create email templates using the HTML from the docs</span>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">4</Badge>
              <span>Add environment variables to your .env file</span>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">5</Badge>
              <span>Test the configuration using this tool</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-muted rounded text-xs">
            <p className="font-semibold mb-1">Required Environment Variables:</p>
            <ul className="space-y-1">
              <li>• EMAILJS_SERVICE_ID</li>
              <li>• EMAILJS_TEMPLATE_ID</li>
              <li>• EMAILJS_FALLBACK_TEMPLATE_ID</li>
              <li>• EMAILJS_PUBLIC_KEY</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}