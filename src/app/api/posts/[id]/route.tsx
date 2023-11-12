import { getAllPosts } from "@/actions/getAllPosts";
import { limit } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth, getValidId } from "@/lib/serverCookies";
import PostModel from "@/models/posts.model";
import User from "@/models/user.model";
import Video from "@/models/video.model";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const query = request.nextUrl.searchParams;
    let id: any = params.id;
    const myid = getUserIdFromAuth(request);
    if (!myid) {
      return NextResponse.json({
        success: false,
        error: "Not Authenticated",
      });
    }

    id = getValidId(id);

    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);

    const data = await getAllPosts(skip, _limit, id);

    return NextResponse.json({
      success: true,
      limit: _limit,
      skip,
      data,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
