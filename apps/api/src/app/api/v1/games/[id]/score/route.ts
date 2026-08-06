import { NextResponse } from "next/server";
import { incrementGamePlay } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body || typeof body.score !== "number") {
      return NextResponse.json(
        { success: false, error: "Score phải là kiểu số (number)" },
        { status: 400 }
      );
    }

    // Increment play count & record highscore
    incrementGamePlay(id);

    return NextResponse.json({
      success: true,
      message: "Score submitted successfully",
      data: {
        gameId: id,
        score: body.score,
        level: body.level || 1,
        submittedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
