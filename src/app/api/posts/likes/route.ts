import { postNotication } from "@/actions/postNotification";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth, getValidId } from "@/lib/serverCookies";
import PostLikes from "@/models/post-likes.model";
import PostModel from "@/models/posts.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    //    check if user is logged in or not
    const myid = getUserIdFromAuth(request);
    if (!myid) {
      return NextResponse.json({ success: false, error: "login first" });
    }

    // extract payload
    const { postId } = await request.json();

    // check if payload is available
    if (!postId) {
      return NextResponse.json({
        success: false,
        error: "postId is required",
      });
    }

    // check if post id is valid or not
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json({ success: false, error: "postId is invalid" });
    }
    await dbConnect();
    // check if reaction exists
    const isExist = await PostLikes.findOne({ by: myid, postId });
    let message;
    if (isExist?._id) {
      await PostLikes.findOneAndDelete({ by: myid, postId });
      message = "Unliked";
    } else {
      await PostLikes.create({
        by: myid,
        postId,
      });
      message = "Liked";

      const post = await PostModel.findById(postId);

      await postNotication({
        senderId: myid,
        receiverId: post.userid,
        type: "LIKE",
        postId,
      });
    }

    return NextResponse.json({ success: true, data: { message } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
