import EmailJSTest from "@/components/admin/EmailJSTest";
import Header from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EmailTestPage() {
  return (
    <div className="flex flex-col gap-4">
      <Header />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-6">
                <Link 
                  href="/admin" 
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Admin Dashboard
                </Link>
              </div>

              {/* Page Header */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    📧 EmailJS Integration Testing
                    <Badge variant="secondary">Developer Tool</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      This page allows you to test the EmailJS integration for payment intent notifications.
                      Use this tool to verify that email notifications are working correctly before deploying to production.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline">Payment Intent Tracking</Badge>
                      <Badge variant="outline">Email Notifications</Badge>
                      <Badge variant="outline">Template Testing</Badge>
                      <Badge variant="outline">Configuration Validation</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* EmailJS Test Component */}
              <EmailJSTest />

              {/* Additional Information */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-base">🔧 Integration Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2">How It Works</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• User shows payment intent (clicks pricing)</li>
                        <li>• System captures user details and preferences</li>
                        <li>• EmailJS sends notification to 310842705@qq.com</li>
                        <li>• Fallback email sent if primary template fails</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">API Endpoints</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• <code>POST /api/payment-intent</code> - Track payment intent</li>
                        <li>• <code>GET /api/test-email</code> - Test configuration</li>
                        <li>• <code>POST /api/test-email</code> - Send test email</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>⚠️ Important:</strong> This feature is currently in development mode. 
                      Users will see a feedback form instead of actual payment processing.
                      Email notifications help track user interest for business analysis.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}