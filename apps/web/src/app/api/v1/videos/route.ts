import { NextResponse } from "next/server";
import { getVideos, addVideo } from "@/lib/store";
import { CreateSocialVideoSchema } from "@playnest/shared-types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform");
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  let videos = getVideos();

  if (platform && platform !== "all") {
    videos = videos.filter((v) => v.platform === platform);
  }
  if (category && category !== "all") {
    videos = videos.filter((v) => v.category === category);
  }
  if (featured === "true") {
    videos = videos.filter((v) => v.featured);
  }

  return NextResponse.json({ success: true, data: videos });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CreateSocialVideoSchema.parse(body);

    const newVideo = addVideo({
      ...parsed,
      id: `vid-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: newVideo }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Invalid payload" },
      { status: 400 }
    );
  }
}
