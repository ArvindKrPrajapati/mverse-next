import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import Playlist from "@/models/playlist.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // get id from auth
    const myid = getUserIdFromAuth(request);

    // extract payload
    const { name, isPrivate, videoId } = await request.json();

    // validate payload
    if (!name || !videoId) {
      return NextResponse.json({
        success: false,
        error: "name and videoid are required",
      });
    }

    // validate id
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return NextResponse.json({ success: false, error: "invalid video id" });
    }

    // construct playlist obj
    const obj = {
      name,
      videos: [videoId],
      createdBy: myid,
      isPrivate,
    };

    // connect db
    await dbConnect();

    // create playlist
    const data = await Playlist.create(obj);

    // checl if playlist created
    if (data) {
      // success
      return NextResponse.json({
        success: true,
        data: { message: "playlist created" },
      });
    }
    // playlist creation error
    return NextResponse.json({
      success: false,
      error: "error while creating playlist",
    });
  } catch (error) {
    console.log("post playlist error:", error);
    return NextResponse.json(
      { success: false, error: "server error" },
      { status: 500 }
    );
  }
}
