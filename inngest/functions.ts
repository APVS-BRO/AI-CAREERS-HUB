import { gemini } from "inngest";
import { inngest } from "./client";
import { createAgent } from '@inngest/agent-kit';
import ImageKit from "imagekit";
import { PDFDocument } from 'pdf-lib';
import { eq } from 'drizzle-orm';
import { db } from "@/configs/db";
import { users_Histories_Table } from "@/configs/schema";

// Simple test function
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

// Career chat agent definition
export const Ai_Career_Chat_Agent = createAgent({
  name: "AI_Career_Chat_Agent",
  description: "An AI agent that provides clear, actionable advice for career development.",
  system: `You are a professional and empathetic AI Career Coach. Your role is to:
1. Understand each user's background, goals, and challenges.
2. Offer personalized, practical strategies for job search, skill-building, networking, and career transitions.
3. Maintain a supportive, solution-focused tone—encouraging users to take concrete next steps.
4. Cite relevant resources or examples when appropriate.
5. Ask clarifying questions if user goals or context are unclear.

Always respond with clarity, confidence, and a focus on empowering the user to make informed career decisions.`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY
  })
});

// Resume analyzer agent definition
export const AI_Resume_Analyze_Agent = createAgent({
  name: "AI_Resume_Analyzer",
  description: "Analyzes a plain-text resume and returns a structured JSON report with scores, feedback, and actionable tips.",
  system: `You are an AI Resume Analyzer. 
INPUT: A plain-text resume.
OUTPUT: A single JSON object matching this schema:

{
  "overall_score": integer,
  "overall_feedback": string,
  "summary_comment": string,
  "sections": { contact_info, experience, education, skills },
  "tips_for_improvement": [string…],
  "whats_good": [string…],
  "needs_improvement": [string…]
}

RULES:
• Output must be valid JSON only—no extra keys, no prose outside the JSON.
• Scores are integers 0–100.
• Provide 3–5 tips and strengths, 1–3 weaknesses.`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY
  })
});

// Career chat function (Inngest)
export const Ai_Career_Agent = inngest.createFunction(
  { id: "AI_Career_Chat_Agent" },
  { event: 'AI_Career_Chat_Agent' },
  async ({ event }) => {
    const userInput = event.data.userInput;
    const result = await Ai_Career_Chat_Agent.run(userInput);
    return result;
  }
);

// ImageKit client
const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT_URL || ''
});

// Resume analysis function (Inngest)
export const AI_Resume_Agents = inngest.createFunction(
  { id: "AI_Resume_Agent",  },
  { event: 'AI_Resume_Agent' },
  async ({ event, step }) => {
    const { recordId, base64resumefile, pdfText, aiAgentType, userEmail } = event.data;

    // 1) Decode Base64 input
    const rawPdf = Buffer.from(base64resumefile, 'base64');

    // 2) Compress PDF streams
    const pdfDoc = await PDFDocument.load(rawPdf);
    const optimizedBytes = await pdfDoc.save({ useObjectStreams: true });

    // 3) Convert back to Base64 and upload
    const optimizedBase64 = Buffer.from(optimizedBytes).toString('base64');
    const uploadfileUrl = await step.run("uploadImage", async () => {
      const imagekitFile = await imagekit.upload({
        file: optimizedBase64,
        fileName: `${Date.now()}.pdf`,
        isPublished: true,
      });
      return imagekitFile.url;
    });

    // 4) Run resume analyzer agent
    const airesumereport = await AI_Resume_Analyze_Agent.run(pdfText);

    // 5) Extract JSON from code block
    const rawOutput = (airesumereport.output[0] as any).text
                    ?? (airesumereport.output[0] as any).content;
    const jsonString = rawOutput
      .replace(/```json\s*/, '')
      .replace(/\s*```$/, '');
    const reportdata = JSON.parse(jsonString);

    // 6) Idempotent save: only insert if record doesn't exist
    const saved = await step.run('SaveToDb', async () => {
      const existing = await db
        .select()
        .from(users_Histories_Table)
        .where(eq(users_Histories_Table.recordId, recordId));

      if (existing.length === 0) {
        await db.insert(users_Histories_Table).values({
          recordId,
          content: reportdata,
          aiAgentType,
          createdAt: new Date().toISOString(),
          userEmail,
          urls:uploadfileUrl, 
        });
      }
      return reportdata;
    });

    // 7) Return final result
    return saved;
  }
);

export const AiRoadMapGenerateAgent = createAgent({
  name: 'AiRoadMapGeneratorAgent',
  description: 'Generates a tree-like flow roadmap in React Flow format based on user input.',
  system: `
You are an expert roadmap generator.

Your task is to create a vertical, tree-structured **learning roadmap** using the React Flow library format based on a user’s input topic or skill.

### 🔧 Requirements:
- Structure the roadmap similar to **roadmap.sh** (e.g., vertical layout with logical horizontal branching).
- Start from **fundamentals** and progress to **advanced** topics step-by-step.
- If applicable, include **branches for specialization paths**.
- Make **node positions spacious**: avoid overlap, use a consistent vertical gap (e.g., y += 150–200) and horizontal offset (x ±= 250–300) for branches.
- Each node should include:
  - \`id\`: unique string ID
  - \`type\`: "turbo"
  - \`position\`: meaningful { x, y } to avoid overlap and create flow
  - \`data\`: object with:
    - \`title\`: concise step title
    - \`description\`: 1–2 sentence summary
    - \`link\`: external resource URL to learn this concept

### 🔗 Edge Rules:
- Define edges between each node with:
  - \`id\`: format "e<source>-<target>"
  - \`source\`: source node ID
  - \`target\`: target node ID

### 📄 JSON Format (Respond in ONLY this structure):

{
  "roadmapTitle": "Full Title of the Roadmap",
  "description": "3–5 lines describing the learning path and its value.",
  "duration": "Estimated duration (e.g., '3-6 Months')",
  "initialNodes": [
    {
      "id": "1",
      "type": "turbo",
      "position": { "x": 0, "y": 0 },
      "data": {
        "title": "Title of the First Step",
        "description": "What this step covers in 1-2 lines.",
        "link": "https://..."
      }
    }
    ...
  ],
  "initialEdges": [
    {
      "id": "e1-2",
      "source": "1",
      "target": "2"
    }
    ...
  ]
}

### ⚠️ Constraints:
- All nodes must have unique IDs and meaningful positions.
- No HTML, no markdown, only return clean valid JSON.
- Do NOT wrap the output in markdown fences (\`\`\`).
- Ensure spacing and flow makes it render properly in React Flow without overlap.

Generate an insightful, structured roadmap with good spacing and flow.
`,
  model: gemini({
    model: "gemini-2.0-flash",
    apiKey: process.env.GEMINI_API_KEY
  })
});


export const AiroadmapAgent = inngest.createFunction(
  { id: 'AiRoadMapGeneratorAgent' },
  { event: 'AiRoadMapGeneratorAgent' },
  async ({ event, step }) => {
    const { recordId, userInput, userEmail } = await event.data;

    const roadmap = await AiRoadMapGenerateAgent.run("userInput" + userInput);
    const rawOutput = (roadmap.output[0] as any).text
      ?? (roadmap.output[0] as any).content;

    const jsonString = rawOutput
      .replace(/```json\s*/, '')
      .replace(/\s*```$/, '');

    const reportdata = JSON.parse(jsonString);

    const saved = await step.run('SaveToDb', async () => {
      const existing = await db
        .select()
        .from(users_Histories_Table)
        .where(eq(users_Histories_Table.recordId, recordId));

      if (existing.length === 0) {
        await db.insert(users_Histories_Table).values({
          recordId: recordId,
          content: reportdata,
          aiAgentType: '/ai-tools/ai-roadmap-generator',
          createdAt: new Date().toISOString(),
          userEmail,
          urls: userInput,
        });
      }
      return reportdata;
    });

    // ✅ THIS LINE IS CRITICAL
    return saved;
  }
);
