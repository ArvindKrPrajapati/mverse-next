import dbConnect from "@/lib/dbConnect";
import Video from "@/models/video.model";
import { limit as constLimit } from "@/lib/constants";
import User from "@/models/user.model";

export async function getAllVideosByUserId(
  skip = 0,
  limit = constLimit,
  username: string
) {
  try {
    // connect db
    username = decodeURIComponent(username);

    await dbConnect();
    //  get userid using username

    const userData = await User.findOne({ username });
    if (!userData) {
      return [];
    }

    const data = await Video.aggregate([
      { $match: { by: userData._id } },
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
    console.log(error);

    throw new Error("failed to get data from db");
  }
}
