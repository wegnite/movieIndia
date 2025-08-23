import { NextRequest } from "next/server";
import { getUserExperiments } from "@/services/ab-test";
import { respData, respErr } from "@/lib/resp";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, user_id } = body;

    if (!session_id) {
      return respErr("Missing required field: session_id");
    }

    // Get IP and user agent for consistent assignment
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    const assignments = await getUserExperiments(
      session_id,
      user_id,
      ip,
      userAgent
    );

    return respData({
      assignments: assignments.map(assignment => ({
        experiment_id: assignment.experimentId,
        experiment_name: assignment.experimentName,
        variant_id: assignment.variantId,
        variant_name: assignment.variantName,
        config: assignment.config,
        assignment_id: assignment.assignmentId,
      })),
    });
  } catch (error) {
    console.error("Get user experiments error:", error);
    return respErr("Failed to get user experiments");
  }
}