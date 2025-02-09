import { db } from "@/db";
import { projectModel } from "@/db/schemas/projects";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: number }> }
) {
  try {
    const { projectId } = await params;
    await db.delete(projectModel).where(eq(projectModel.id, projectId));
    return NextResponse.json(
      { success: true, message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
