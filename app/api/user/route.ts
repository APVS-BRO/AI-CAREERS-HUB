// app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const email = user.primaryEmailAddress.emailAddress;

    // Check for existing
    const [existing] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existing) {
      return NextResponse.json(existing);
    }

    // Insert
    const [inserted] = await db
      .insert(usersTable)
      .values({ name: user.fullName ?? "", email })
      .returning();

    return NextResponse.json(inserted);
  } catch (err: any) {
    console.error("⚠️ /api/user error:", err);
    return NextResponse.json(
      { error: err.message ?? "Unknown server error" },
      { status: 500 }
    );
  }
}
