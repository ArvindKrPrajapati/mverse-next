import { getCurrentUser } from "@/lib/serverCookies";
import { CommentReaction } from "@/models/comments.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    //    check if user is logged in or not
    const currentUser = getCurrentUser();
    if (!currentUser?._id) {
      return NextResponse.json({ success: false, error: "login first" });
    }

    // extract payload
    const { type, commentId } = await request.json();

    // check if payload is available
    if (!type || !commentId) {
      return NextResponse.json({
        success: false,
        error: "commentId and type of reaction is required",
      });
    }
    if (type !== "like" && type !== "dislike") {
      return NextResponse.json({
        success: false,
        error: "invalid type",
      });
    }
    // check if video id is valid or not
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return NextResponse.json({ success: false, error: "vidoeId is invalid" });
    }

    // check if reaction exists
    const isExist = await CommentReaction.findOne({
      userId: currentUser._id,
      commentId,
    });

    let message;
    if (isExist?._id) {
      const existingReaction = isExist.reactionType;
      if (existingReaction == type) {
        await CommentReaction.findOneAndDelete({
          userId: currentUser._id,
          commentId,
        });
        message = "removed " + type;
      } else {
        await CommentReaction.findOneAndUpdate(
          { userId: currentUser._id, commentId },
          { reactionType: type }
        );
        message = type;
      }
    } else {
      await CommentReaction.create({
        userId: currentUser._id,
        commentId,
        reactionType: type,
      });
      message = "added " + type;
    }

    return NextResponse.json({ success: true, data: { message } });
  } catch (error) {
    console.log("reaction error", error);
    return NextResponse.json({ success: false, error: "server error" });
  }
}
