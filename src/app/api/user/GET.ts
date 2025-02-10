import { db } from "@/db";
import { userModel } from "@/db/schemas/users";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const userId = (await cookies()).get("userId")?.value;

  if (!userId || isNaN(Number(userId))) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const [user] = await db
      .select()
      .from(userModel)
      .where(eq(userModel.id, Number(userId)))
      .limit(1);

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
