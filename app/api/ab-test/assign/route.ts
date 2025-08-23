import { NextRequest, NextResponse } from "next/server";
import { assignUserToExperiment, trackABTestEvent } from "@/services/ab-test";
import { respData, respErr } from "@/lib/resp";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { experiment_name, session_id, user_id } = body;

    if (!experiment_name || !session_id) {
      return respErr("Missing required fields: experiment_name, session_id");
    }

    // Get IP and user agent for consistent assignment
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    const assignment = await assignUserToExperiment(
      experiment_name,
      session_id,
      user_id,
      ip,
      userAgent
    );

    if (!assignment) {
      return respData({
        assigned: false,
        message: "User not assigned to experiment"
      });
    }

    // Track view event automatically
    await trackABTestEvent(assignment.assignmentId, "view");

    return respData({
      assigned: true,
      assignment: {
        experiment_id: assignment.experimentId,
        experiment_name: assignment.experimentName,
        variant_id: assignment.variantId,
        variant_name: assignment.variantName,
        config: assignment.config,
        assignment_id: assignment.assignmentId,
      },
    });
  } catch (error) {
    console.error("A/B test assignment error:", error);
    return respErr("Failed to assign user to experiment");
  }
}