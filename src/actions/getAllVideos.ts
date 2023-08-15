import dbConnect from "@/lib/dbConnect";
import Video from "@/models/video.model";
import { limit as constLimit } from "@/lib/constants";

export async function getAllVideos(skip = 0, limit = constLimit) {
  try {
    // connect db
    await dbConnect();

    const data = await Video.aggregate([
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

    if (!data.length) {
      return [];
    }
    return data;
  } catch (error) {
    console.log("get error", error);
    throw error;
  }
}
