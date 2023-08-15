import { getPlaylists } from "@/actions/getPlaylists";
import { limit } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import { Playlist, PlaylistVideos } from "@/models/playlist.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const myid = getUserIdFromAuth(request);
    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);
    const type = query.get("type") || "all";
    const data = await getPlaylists(myid, type, skip, _limit);
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

export async function POST(request: NextRequest) {
  try {
    // get id from auth
    const myid = getUserIdFromAuth(request);
    if (!myid) {
      return NextResponse.json({ success: false, error: "not logged in" });
    }
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
      createdBy: myid,
      isPrivate,
    };

    // connect db
    await dbConnect();

    // check if playlist already exists
    const playlist = await Playlist.findOneAndUpdate(
      { name, createdBy: myid },
      obj,
      {
        upsert: true,
        new: true,
      }
    );
    let data;
    if (playlist) {
      const item = { playlistId: playlist._id, videoId };
      data = await PlaylistVideos.updateOne(item, item, { upsert: true });
    }

    const msg = "added to playlist";

    if (data) {
      // checl if playlist created
      // success
      return NextResponse.json({
        success: true,
        data: { message: msg },
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
