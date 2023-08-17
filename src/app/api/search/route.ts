import { limit } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import Video from "@/models/video.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);
    const name = query.get("name");

    await dbConnect();
    const data = await Video.aggregate([
      {
        $match: { title: { $regex: "^" + name, $options: "i" } },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "by",
          foreignField: "_id",
          as: "by",
        },
      },
      {
        $lookup: {
          from: "views",
          localField: "_id",
          foreignField: "videoId",
          as: "views",
        },
      },
      { $unwind: "$by" },
      {
        $project: {
          title: 1,
          description: 1,
          thumbnail: 1,
          duration: 1,
          link: 1,
          pinned: 1,
          createdAt: 1,
          by: {
            _id: 1,
            channelName: 1,
            username: 1,
            dp: 1,
          },
          views: {
            $cond: {
              if: { $isArray: "$views" },
              then: { $size: "$views" },
              else: 0,
            },
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
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "server error",
      },
      { status: 500 }
    );
  }
}
