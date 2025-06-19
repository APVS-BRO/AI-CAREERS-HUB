import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getRuns } from "@/lib/ai";

export async function POST(req: any) {
  const { recordId, userInput } = await req.json();
  const user = await currentUser();

  const resultId = await inngest.send({
    name: "AiRoadMapGeneratorAgent",
    data: {
      userInput,
      recordId,
      userEmail: user?.primaryEmailAddress?.emailAddress,
    },
  });

  const runId = resultId?.ids[0];
  let runStatus;

  while (true) {
    runStatus = await getRuns(runId);

    const status = runStatus?.data[0]?.status;
    if (status === "Completed" || status === "Cancelled") {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  const rawOutput = runStatus.data?.[0]?.output;

  try {
    console.log("🟢 Raw Output from Inngest:", rawOutput); // for debugging
    const safeOutput = JSON.parse(JSON.stringify(rawOutput));
    return NextResponse.json(safeOutput);
  } catch (err) {
    console.error("❌ Output serialization failed:", err, rawOutput);
    return NextResponse.json(
      { error: "Could not serialize AI output." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // e.g. get runId from query string: /api/.../route?runId=123
  
  const runId = request.nextUrl.searchParams.get("runId")!;
  if (!runId) {
    return NextResponse.json({ error: "Missing runId" }, { status: 400 });
  }

  try {
    const data = await getRuns(runId);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
