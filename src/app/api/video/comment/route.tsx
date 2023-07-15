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
