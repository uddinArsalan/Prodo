import { db } from "@/db";
import { projectModel } from "@/db/schemas/projects";
import { taskModel } from "@/db/schemas/tasks";
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
    const tasks = await db
      .select()
      .from(taskModel)
      .where(eq(taskModel.userId, Number(userId)))
      .innerJoin(projectModel, eq(projectModel.id, taskModel.projectId));
    return NextResponse.json({ success: true, data: tasks }, { status: 200 });
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
