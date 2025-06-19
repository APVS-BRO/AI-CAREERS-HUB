import { inngest } from "@/inngest/client"
import { NextRequest, NextResponse } from "next/server";
import { getRuns } from "@/lib/ai";

export async function POST(req:any){

    const {userInput}= await req.json()
    const resultId = await inngest.send({
        name:"AI_Career_Chat_Agent",
        data:{
            userInput:userInput

        }
    });
    const runId = resultId?.ids[0];
    let runStatus;
    while(true){
        runStatus = await getRuns(runId);
        if(runStatus?.data[0]?.status=='Completed'){
            break
        }
        await new Promise(resolve => setTimeout(resolve,500))
    }
    return NextResponse.json(runStatus.data?.[0].output?.output[0])
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




