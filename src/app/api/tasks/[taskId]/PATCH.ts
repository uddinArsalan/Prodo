import { db } from "@/db";
import { taskModel } from "@/db/schemas/tasks";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ taskId: number }> }
) {
  try {
    const { isCompleted } = await req.json();
    const status = isCompleted ? "completed" : "pending";
    const { taskId } = await params;
    await db.update(taskModel).set({ status }).where(eq(taskModel.id, taskId));
    return NextResponse.json(
      { success: true, message: "Task status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating task status:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
