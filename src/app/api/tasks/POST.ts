import { db } from "@/db";
import { taskModel } from "@/db/schemas/tasks";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const userId = (await cookies()).get("userId")?.value;

  if (!userId || isNaN(Number(userId))) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { title, description, projectId, dueDate } = await req.json();
    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    await db.insert(taskModel).values({
      title,
      description,
      userId: Number(userId),
      dueDate: new Date(dueDate),
      projectId,
    });
    return NextResponse.json(
      { success: true, message: "Task created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
