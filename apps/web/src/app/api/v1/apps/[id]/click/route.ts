import { NextResponse } from "next/server";
import { incrementAppClick } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  incrementAppClick(id);
  return NextResponse.json({ success: true, message: "Click recorded" });
}
