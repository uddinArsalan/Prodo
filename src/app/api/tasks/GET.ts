import { db } from "@/db";
import { projectModel } from "@/db/schemas/projects";
import { taskModel } from "@/db/schemas/tasks";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { categoryModel } from "@/db/schemas/categories";

export async function GET() {
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
      .leftJoin(projectModel, eq(projectModel.id, taskModel.projectId))
      .leftJoin(categoryModel, eq(categoryModel.id, taskModel.categoryId));
      
    const transformedTasks = tasks.map((row) => ({
      ...row.tasks,
      project: { ...row.projects },
      category: { ...row.categories },
    }));

    return NextResponse.json(
      { success: true, data: transformedTasks },
      { status: 200 }
    );
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
