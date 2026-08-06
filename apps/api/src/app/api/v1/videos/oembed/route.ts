import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ success: false, error: "URL là bắt buộc" }, { status: 400 });
    }

    let platform: "youtube" | "tiktok" | "facebook" = "youtube";
    let embedUrl = url;
    let title = "Social Video";
    let thumbnailUrl = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop";

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      platform = "youtube";
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      const videoId = match && match[2].length === 11 ? match[2] : null;
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
        thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        title = `YouTube Video #${videoId}`;
      }
    } else if (url.includes("tiktok.com")) {
      platform = "tiktok";
      title = "TikTok Video Clips";
      embedUrl = url;
    } else if (url.includes("facebook.com")) {
      platform = "facebook";
      title = "Facebook Video / Reel";
      embedUrl = url;
    }

    return NextResponse.json({
      success: true,
      data: {
        platform,
        url,
        embedUrl,
        title,
        thumbnailUrl,
        authorName: "PlayNest Creator",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
