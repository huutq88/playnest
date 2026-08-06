import { NextResponse } from "next/server";
import { getGames, addGame } from "@/lib/store";
import { CreateWebGameSchema } from "@playnest/shared-types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");

  let games = getGames();

  if (featured === "true") {
    games = games.filter((g) => g.featured);
  }

  return NextResponse.json({ success: true, data: games });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CreateWebGameSchema.parse(body);

    const newGame = addGame({
      ...parsed,
      id: `game-${Date.now()}`,
      playsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: newGame }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Invalid payload" },
      { status: 400 }
    );
  }
}
