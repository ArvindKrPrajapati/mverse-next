import { limit } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser } from "@/lib/serverCookies";
import { Comment } from "@/models/comments.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    //    check if user is logged in or not
    const currentUser = getCurrentUser();
    if (!currentUser?._id) {
      return NextResponse.json({ success: false, error: "login first" });
    }

    // extract payload
    const author = currentUser._id;
    const { videoId, content } = await request.json();

    // check if payload is available
    if (!videoId || !content) {
      return NextResponse.json({
        success: false,
        error: "videoId and content is required",
      });
    }

    //   create comment
    await dbConnect();
    const data = await Comment.create({
      videoId,
      author,
      content,
      reactions: [],
    });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log("comment error", error);
    return NextResponse.json({ success: false, error: "server error" });
  }
}

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const videoId = query.get("videoId");
    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);
    if (!videoId) {
      return NextResponse.json(
        {
          success: false,
          error: "videoId is not provided",
        },
        { status: 422 }
      );
    }
    await dbConnect();
    const data = await Comment.find({ videoId })
      .populate("author", "_id channelName dp username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(_limit);
    return NextResponse.json({ success: true, data, limit: _limit, skip });
  } catch (error) {
    console.log("comment error", error);
    return NextResponse.json({ success: false, error: "server error" });
  }
}
