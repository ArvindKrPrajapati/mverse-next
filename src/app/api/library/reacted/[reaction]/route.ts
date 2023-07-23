import { getReactedVideos } from "@/actions/getReactedvideos";
import { limit } from "@/lib/constants";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
  try {
    const query = request.nextUrl.searchParams;
    const myid = getUserIdFromAuth(request);
    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);
    const reaction: any = params.reaction;

    if (reaction !== "like" && reaction !== "dislike") {
      return NextResponse.json({
        success: false,
        error: "reaction query should be either like or dislike",
      });
    }
    const data = await getReactedVideos(myid, reaction, skip, _limit);
    return NextResponse.json({
      success: true,
      limit: _limit,
      skip,
      data,
    });
  } catch (error) {
    console.log("video get error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "server error",
      },
      { status: 500 }
    );
  }
}
