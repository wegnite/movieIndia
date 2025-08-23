import { Metadata } from "next";
import PaymentStatisticsDashboard from "@/components/admin/payment-statistics-dashboard";

export const metadata: Metadata = {
  title: "Payment Intent Analytics - Admin Dashboard",
  description: "Comprehensive analytics and statistics for payment intents, conversions, and revenue insights",
};

export default function PaymentIntentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Payment Intent Analytics</h1>
          <p className="text-muted-foreground">
            Monitor payment performance, conversion rates, and revenue trends with real-time insights
          </p>
        </div>
        
        <PaymentStatisticsDashboard />
      </div>
    </div>
  );
}
