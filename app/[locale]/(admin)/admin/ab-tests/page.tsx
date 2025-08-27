import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ABTestDashboard from "@/components/admin/ab-test-dashboard";

export const metadata: Metadata = {
  title: "A/B Test Management",
  description: "Manage and monitor A/B test experiments",
};

export default async function ABTestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/auth/signin`);
  }

  // Add admin role check here if you have role-based access
  // if (!session.user.isAdmin) {
  //   redirect(`/${locale}`);
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">A/B Test Management</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and manage pricing strategy experiments
        </p>
      </div>
      
      <ABTestDashboard />
    </div>
  );
}