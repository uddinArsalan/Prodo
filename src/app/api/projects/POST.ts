import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projectModel } from "@/db/schemas/projects";
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
    const { title, description, deadline } = await req.json();

    if (!title || !description || !userId) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProject = await db.insert(projectModel).values({
      title,
      description,
      userId: Number(userId),
      deadline: new Date(deadline),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully",
        data: newProject,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating project:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
