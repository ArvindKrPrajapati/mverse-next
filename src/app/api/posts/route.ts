import { limit } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import PostModel from "@/models/posts.model";
import User from "@/models/user.model";
import Video from "@/models/video.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const myid = getUserIdFromAuth(request);
    if (!myid) {
      return NextResponse.json({
        success: false,
        error: "Not Authenticated",
      });
    }

    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);

    const data = await PostModel.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: _limit },
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          text: 1,
          images: 1,
          tags: 1,
          mentions: 1,
          createdAt: 1,
          user: {
            _id: 1,
            channelName: 1,
            username: 1,
            dp: 1,
            name: 1,
          },
        },
      },
    ]);

    return NextResponse.json({
      success: true,
      limit: _limit,
      skip,
      data,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
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
    const { text, images, tags, mentions } = await requeest.json();

    // checck of required fields are provided in the body
    if (!text && !images.length) {
      return NextResponse.json({
        success: false,
        error: "text or image is required",
      });
    }

    await dbConnect();
    const data = await PostModel.create({
      userid: myid,
      text,
      images,
      tags,
      mentions,
    });
    if (data) {
      return NextResponse.json({
        success: true,
        data: { message: "Post created" },
      });
    }
    return NextResponse.json({
      success: false,
      error: "Post creation failed",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
