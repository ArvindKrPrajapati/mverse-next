import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import { Playlist, PlaylistVideos } from "@/models/playlist.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: any) {
  try {
    // get id from auth
    const myid: any = getUserIdFromAuth(request);
    if (!myid) {
      return NextResponse.json({ success: false, error: "not logged in" });
    }
    // get playlist id
    const playlistId = params.id;

    // validate playlist id
    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
      return NextResponse.json({
        success: false,
        error: "invalid playlist id " + playlistId,
      });
    }
    // extract payload
    const { videoId } = await request.json();

    // validate payload
    if (!videoId) {
      return NextResponse.json({
        success: false,
        error: "videoid is required",
      });
    }

    // validate id
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return NextResponse.json({ success: false, error: "invalid video id" });
    }
    // connect db
    await dbConnect();

    // check if playlist exist
    const playlistRes = await Playlist.findById(playlistId);

    if (!playlistRes) {
      // playlist doest not exist
      return NextResponse.json({
        success: false,
        error: "playlist does not exist",
      });
    }

    // check if playlist belongs to login user
    const createdById = new mongoose.Types.ObjectId(playlistRes.createdBy);
    if (!createdById.equals(myid)) {
      // playlist doest not belongs to you
      return NextResponse.json({
        success: false,
        error: "playlist is not yours",
      });
    }

    // update playlist
    const data = await PlaylistVideos.updateOne(
      { playlistId, videoId },
      { playlistId, videoId },
      { upsert: true }
    );
    await Playlist.findByIdAndUpdate(
      playlistId,
      { updatedAt: new Date(Date.now()) },
      { new: true }
    );
    // // check if playlist updated
    if (data) {
      // success
      return NextResponse.json({
        success: true,
        data: { message: "added to playlist" },
      });
    }
    // playlist updation error
    return NextResponse.json({
      success: false,
      error: "unable to add video to playlist",
    });
  } catch (error) {
    console.log("patch playlist error:", error);
    return NextResponse.json(
      { success: false, error: "server error" },
      { status: 500 }
    );
  }
}
