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
    const projects = await db
      .select()
      .from(projectModel)
      .where(eq(projectModel.userId, Number(userId)))
      .leftJoin(taskModel, eq(taskModel.projectId, projectModel.id))
      .leftJoin(categoryModel,eq(taskModel.categoryId,categoryModel.id))
      ;

      const projectMap = new Map();

      projects.forEach((row) => {
        const project = row.projects;
        const task = row.tasks;
        const category = row.categories; 
      
        if (!projectMap.has(project.id)) {
          projectMap.set(project.id, {
            ...project,
            tasks: [],
          });
        }
      
        if (task) {
          
          const taskWithCategory = {
            ...task,
            category: category || null, 
          };
          projectMap.get(project.id).tasks.push(taskWithCategory);
        }
      });
      
      const transformedProjects = Array.from(projectMap.values());

    return NextResponse.json(
      { success: true, data: transformedProjects },
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
