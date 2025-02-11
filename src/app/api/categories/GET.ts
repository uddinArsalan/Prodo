import { db } from "@/db";
import { NextResponse } from "next/server";
import { categoryModel } from "@/db/schemas/categories";

export async function GET() {
  try {
    const categories = await db.select().from(categoryModel);

    return NextResponse.json(
      { success: true, data: categories },
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
