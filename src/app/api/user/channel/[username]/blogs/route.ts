import { getChannelBlogs } from "@/actions/getChannelBlogs";
import { getAllVideosByUserId } from "@/actions/getVideosByUserId";
import { limit } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    username: string;
  };
};

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { username } = params;
    const query = request.nextUrl.searchParams;

    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);
    const data = await getChannelBlogs(username, skip, _limit);
    return NextResponse.json({
      success: true,
      limit: _limit,
      skip,
      data,
    });
  } catch (error) {
    console.log("video get error:", error);
    return NextResponse.json({
      success: false,
      error: "server error",
    });
  }
}
