import { NextRequest, NextResponse } from "next/server";
import { getAllPolicies, getPolicy, savePolicy, resetPolicy, resetAllPolicies } from "@/lib/policies";
import { PolicyDocument, PolicyType } from "@/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") as PolicyType | null;

    if (type && (type === "terms" || type === "privacy" || type === "cancellation")) {
      const policy = await getPolicy(type);
      return NextResponse.json({
        success: true,
        policy,
      });
    }

    const policies = await getAllPolicies();
    return NextResponse.json({
      success: true,
      policies,
    });
  } catch (error) {
    console.error("GET /api/policies error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch policy data" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if saving single policy or multiple
    if (body.policy) {
      const p = body.policy as PolicyDocument;
      if (!p.id || !["terms", "privacy", "cancellation"].includes(p.id)) {
        return NextResponse.json(
          { success: false, error: "Invalid policy type. Must be 'terms', 'privacy', or 'cancellation'." },
          { status: 400 }
        );
      }
      const saved = await savePolicy(p);
      return NextResponse.json({
        success: true,
        message: `Policy '${saved.title}' successfully updated.`,
        policy: saved,
      });
    }

    if (body.policies) {
      const savedPolicies: Record<string, PolicyDocument> = {};
      for (const key of ["terms", "privacy", "cancellation"] as PolicyType[]) {
        if (body.policies[key]) {
          savedPolicies[key] = await savePolicy(body.policies[key]);
        }
      }
      return NextResponse.json({
        success: true,
        message: "All policies successfully updated.",
        policies: savedPolicies,
      });
    }

    // Direct single policy body
    if (body.id && ["terms", "privacy", "cancellation"].includes(body.id)) {
      const saved = await savePolicy(body as PolicyDocument);
      return NextResponse.json({
        success: true,
        message: `Policy '${saved.title}' successfully updated.`,
        policy: saved,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid payload format. Expected policy object." },
      { status: 400 }
    );
  } catch (error) {
    console.error("POST /api/policies error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save policy changes" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  return POST(req);
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") as PolicyType | "all" | null;

    if (type === "all") {
      const policies = await resetAllPolicies();
      return NextResponse.json({
        success: true,
        message: "All policies reset to factory defaults.",
        policies,
      });
    }

    if (type && (type === "terms" || type === "privacy" || type === "cancellation")) {
      const reset = await resetPolicy(type);
      return NextResponse.json({
        success: true,
        message: `Policy '${reset.title}' restored to original default.`,
        policy: reset,
      });
    }

    return NextResponse.json(
      { success: false, error: "Missing or invalid policy type parameter." },
      { status: 400 }
    );
  } catch (error) {
    console.error("DELETE /api/policies error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reset policy" },
      { status: 500 }
    );
  }
}
