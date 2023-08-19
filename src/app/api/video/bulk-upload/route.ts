import { getAllVideos } from "@/actions/getAllVideos";
import { limit } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import Video from "@/models/video.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(requeest: Request) {
  try {
    const { data } = await requeest.json();

    await dbConnect();
    const res = await Video.insertMany(data);
    if (data) {
      return NextResponse.json({
        success: true,
        total: res.length,
        data: res,
      });
    }
    return NextResponse.json({
      success: false,
      error: "upload failed",
    });
  } catch (error) {
    console.log("video post error:", error);
    return NextResponse.json({
      success: false,
      error: "server error",
    });
  }
}
