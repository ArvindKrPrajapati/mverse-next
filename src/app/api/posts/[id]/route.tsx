import { limit } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth, getValidId } from "@/lib/serverCookies";
import PostModel from "@/models/posts.model";
import User from "@/models/user.model";
import Video from "@/models/video.model";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const query = request.nextUrl.searchParams;
    let id: any = params.id;
    const myid = getUserIdFromAuth(request);
    if (!myid) {
      return NextResponse.json({
        success: false,
        error: "Not Authenticated",
      });
    }

    id = getValidId(id);

    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);

    const data = await PostModel.aggregate([
      {
        $match: {
          $or: [{ _id: id }, { belongsTo: id }],
        },
      },
      {
        $addFields: {
          isNullBelongsTo: { $eq: ["$belongsTo", null] },
        },
      },
      { $sort: { isNullBelongsTo: -1, createdAt: -1 } },
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
          belongsTo: 1,
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
