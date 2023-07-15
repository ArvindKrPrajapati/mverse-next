import { getCurrentUser } from "@/lib/serverCookies";
import Reactions from "@/models/reaction.model";
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
    const { type, videoId } = await request.json();

    // check if payload is available
    if (!type || !videoId) {
      return NextResponse.json({
        success: false,
        error: "videoId and type of reaction is required",
      });
    }
    if (type !== "like" && type !== "dislike") {
      return NextResponse.json({
        success: false,
        error: "invalid type",
      });
    }
    // check if video id is valid or not
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return NextResponse.json({ success: false, error: "vidoeId is invalid" });
    }

    // check if reaction exists
    const isExist = await Reactions.findOne({ by: currentUser._id, videoId });
    let message;
    if (isExist?._id) {
      const existingReaction = isExist.reaction;
      if (existingReaction == type) {
        await Reactions.findOneAndDelete({ by: currentUser._id, videoId });
        message = "removed " + type;
      } else {
        await Reactions.findOneAndUpdate(
          { by: currentUser._id, videoId },
          { reaction: type }
        );
        message = type;
      }
    } else {
      await Reactions.create({
        by: currentUser._id,
        videoId,
        reaction: type,
      });
      message = "added " + type;
    }

    return NextResponse.json({ success: true, data: { message } });
  } catch (error) {
    console.log("reaction error", error);
    return NextResponse.json({ success: false, error: "server error" });
  }
}
