import { db } from "@/configs/db"
import { users_Histories_Table } from "@/configs/schema"
import { currentUser } from "@clerk/nextjs/server"
import axios from "axios"
import { desc, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req: any) {
    const { content, recordId, aiAgentType } = await req.json()
    const user = await currentUser();
    try {
        const result = await db.insert(users_Histories_Table).values({
            recordId: recordId,
            content: content,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            createdAt: (new Date()).toString(),
            aiAgentType: aiAgentType || ''
        });

        return NextResponse.json(result)
    } catch (e) {
        return NextResponse.json(e)
    }
}
export async function PUT(req: any) {
    const { content, recordId } = await req.json()
    try {
        const result = await db.update(users_Histories_Table).set({
            content: content,
        }).where(eq(users_Histories_Table.recordId, recordId))

        return NextResponse.json(result)
    } catch (e) {
        return NextResponse.json(e)
    }

}

export async function GET(req: any) {
    const { searchParams } = new URL(req.url)
    const recordId = searchParams.get('recordId');
    const user = await currentUser();

    try {
        if (recordId) {
            const result = await db.select().from(users_Histories_Table).where(eq(users_Histories_Table.recordId, recordId))
            return NextResponse.json(result[0])

        }
else {
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!userEmail) {
        return NextResponse.json({ error: "User email not found" });
    }
    const result = await db.select().from(users_Histories_Table).where(eq(users_Histories_Table.userEmail, userEmail)).orderBy(desc(users_Histories_Table.id));
    return NextResponse.json(result);
}

    } catch (e) {
        return NextResponse.json(e)
    }

}