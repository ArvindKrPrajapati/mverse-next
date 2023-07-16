import { getAllVideos } from "@/actions/getAllVideos";
import { limit } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import Video from "@/models/video.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;

    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);
    const data = await getAllVideos(skip, _limit);
    return NextResponse.json({
      success: true,
      limit: _limit,
      skip,
      data,
    });
  } catch (error) {
    console.log("video get error:", error);
    return NextResponse.json({
      success: false,
      error: "server error",
    });
  }
}

export async function POST(requeest: Request) {
  try {
    // get myid if i am login
    const myid = getUserIdFromAuth(requeest);

    // if i am not login then throw an error
    if (!myid) {
      return NextResponse.json({
        success: false,
        error: "login to upload",
      });
    }

    // get the required fields
    const { title, thumbnail, link, duration, description } =
      await requeest.json();

    // checck of required fields are provided in the body
    if (!title || !thumbnail || !link || !duration || !description) {
      return NextResponse.json({
        success: false,
        error: "title,thumbnail,link,duration,description are required",
      });
    }
    await dbConnect();
    const data = await Video.create({
      title,
      thumbnail,
      link,
      duration,
      description,
      by: myid,
    });
    if (data) {
      return NextResponse.json({
        success: true,
        data: { message: "video uploaded" },
      });
    }
    return NextResponse.json({
      success: false,
      error: "upload failed",
    });
  } catch (error) {
    console.log("video post error:", error);
    return NextResponse.json({
      success: false,
      error: "server error",
    });
  }
}
