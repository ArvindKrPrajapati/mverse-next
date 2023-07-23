import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import View from "@/models/views.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(requeest: NextRequest) {
  try {
    // get myid if i am login
    const myid = getUserIdFromAuth(requeest);
    const { videoId } = await requeest.json();

    // if i am not login then throw an error
    if (!myid) {
      return NextResponse.json({
        success: false,
        error: "login to upload",
      });
    }

    // if no videoId found then throw an error
    if (!videoId) {
      return NextResponse.json({
        success: false,
        error: "no videoid provided",
      });
    }

    await dbConnect();

    const alreadyViewed = await View.findOne({ videoId, by: myid });
    if (alreadyViewed?._id) {
      await View.findByIdAndUpdate(alreadyViewed._id, {
        viewedAt: new Date(Date.now()),
      });
      return NextResponse.json({
        success: true,
        error: "updated view",
      });
    }

    await View.create({ videoId, by: myid });
    return NextResponse.json({
      success: true,
      data: { message: "view added" },
    });
  } catch (error) {
    console.log("video post error:", error);
    return NextResponse.json({
      success: false,
      error: "server error",
    });
  }
}
