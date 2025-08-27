import { NextRequest } from "next/server";
import {
  createABTestExperiment,
  getExperimentResults,
  startExperiment,
  stopExperiment,
  pauseExperiment,
} from "@/services/ab-test";
import { getActiveExperiments, getExperiment } from "@/models/ab-test";
import { respData, respErr } from "@/lib/resp";
import { auth } from "@/auth";

// Get all experiments or specific experiment results
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return respErr("Unauthorized");
    }

    // Check if user is admin (you may want to add admin role check)
    const searchParams = request.nextUrl.searchParams;
    const experimentId = searchParams.get("id");

    if (experimentId) {
      // Get specific experiment results
      const results = await getExperimentResults(parseInt(experimentId));
      return respData(results);
    } else {
      // Get all active experiments
      const experiments = await getActiveExperiments();
      return respData({ experiments });
    }
  } catch (error) {
    console.error("Get experiments error:", error);
    return respErr("Failed to get experiments");
  }
}

// Create new experiment
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return respErr("Unauthorized");
    }

    const body = await request.json();
    const { name, description, variants, traffic_percentage } = body;

    if (!name || !variants || !Array.isArray(variants) || variants.length < 2) {
      return respErr("Missing required fields or insufficient variants (minimum 2)");
    }

    // Validate variants
    const totalSplit = variants.reduce((sum: number, v: any) => sum + (v.traffic_split || 0), 0);
    if (Math.abs(totalSplit - 100) > 0.01) {
      return respErr("Variant traffic splits must sum to 100%");
    }

    const experimentId = await createABTestExperiment({
      name,
      description,
      variants: variants.map((v: any) => ({
        name: v.name,
        description: v.description,
        trafficSplit: v.traffic_split,
        config: v.config,
        isControl: v.is_control || false,
      })),
      trafficPercentage: traffic_percentage || 100,
    });

    return respData({
      experiment_id: experimentId,
      message: "Experiment created successfully",
    });
  } catch (error) {
    console.error("Create experiment error:", error);
    return respErr("Failed to create experiment");
  }
}

// Update experiment status
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return respErr("Unauthorized");
    }

    const body = await request.json();
    const { experiment_id, action } = body;

    if (!experiment_id || !action) {
      return respErr("Missing required fields: experiment_id, action");
    }

    switch (action) {
      case "start":
        await startExperiment(experiment_id);
        break;
      case "stop":
        await stopExperiment(experiment_id);
        break;
      case "pause":
        await pauseExperiment(experiment_id);
        break;
      default:
        return respErr("Invalid action. Must be: start, stop, or pause");
    }

    return respData({
      experiment_id,
      action,
      message: `Experiment ${action}ed successfully`,
    });
  } catch (error) {
    console.error("Update experiment error:", error);
    return respErr("Failed to update experiment");
  }
}