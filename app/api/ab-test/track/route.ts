import { NextRequest, NextResponse } from "next/server";
import { trackABTestEvent } from "@/services/ab-test";
import { respData, respErr } from "@/lib/resp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { assignment_id, event_type, event_data, value } = body;

    if (!assignment_id || !event_type) {
      return respErr("Missing required fields: assignment_id, event_type");
    }

    if (!["view", "click", "conversion", "purchase"].includes(event_type)) {
      return respErr("Invalid event_type. Must be: view, click, conversion, or purchase");
    }

    const success = await trackABTestEvent(
      assignment_id,
      event_type,
      event_data,
      value
    );

    if (!success) {
      return respErr("Failed to track event");
    }

    return respData({
      tracked: true,
      event_type,
      assignment_id,
    });
  } catch (error) {
    console.error("A/B test tracking error:", error);
    return respErr("Failed to track A/B test event");
  }
}