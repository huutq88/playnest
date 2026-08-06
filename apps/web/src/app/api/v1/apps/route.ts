import { NextResponse } from "next/server";
import { getApps, addApp } from "@/lib/store";
import { CreateAppShowcaseSchema } from "@playnest/shared-types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  let apps = getApps();

  if (category && category !== "all") {
    apps = apps.filter((a) => a.category === category);
  }
  if (featured === "true") {
    apps = apps.filter((a) => a.featured);
  }

  return NextResponse.json({ success: true, data: apps });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = CreateAppShowcaseSchema.parse(body);

    const newApp = addApp({
      ...parsed,
      id: `app-${Date.now()}`,
      clickCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: newApp }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Invalid payload" },
      { status: 400 }
    );
  }
}
