import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";
import { getRuns } from "@/lib/ai";

export const POST = async (req: NextRequest) => {
  const form = await req.formData();
  const resumeFile: any = form.get('resumeFiles');
  const recordId = form.get('recordId');
const user= await currentUser();
  // 1) Extract text
  const docs = await new WebPDFLoader(resumeFile).load();
  const pdfText = docs[0]?.pageContent;

  // 2) Convert file to Base64
  const arrayBuffer = await resumeFile.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');

  // 3) Kick off the Inngest agent
  const { ids } = await inngest.send({
    name: "AI_Resume_Agent",
    data: { recordId, base64resumefile: base64, pdfText,aiAgentType:"/ai-tools/ai-resume-analysis" ,userEmail:user?.primaryEmailAddress?.emailAddress}
  });
  const runId = ids[0];

  let runStatus;
  while (true) {
    runStatus = await getRuns(runId);
    if (runStatus?.data?.[0]?.status === 'Completed') break;
    await new Promise(r => setTimeout(r, 500));
  }

  // 5) Pull out the parsed JSON object
  const run = runStatus.data[0];
  if (!run) {
    return NextResponse.json({ error: 'No run data found' }, { status: 500 });
  }

  // <-- Here is the fix:
  return NextResponse.json(run.output);
};

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


