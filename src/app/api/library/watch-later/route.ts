import { getWatchLater } from "@/actions/getWatchLater";
import { limit } from "@/lib/constants";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const myid = getUserIdFromAuth(request);
    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);
    const data = await getWatchLater(myid, skip, _limit);
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
