import dbConnect from "@/lib/dbConnect";
import { limit as constLimit } from "@/lib/constants";
import { getValidId } from "@/lib/serverCookies";
import Reactions from "@/models/reaction.model";

export async function getReactedVideos(
  _id: any,
  reaction: string,
  skip = 0,
  limit = constLimit
) {
  try {
    _id = getValidId(_id);

    // connect db
    await dbConnect();
    //  get userid using username

    const data = await Reactions.aggregate([
      { $match: { by: _id, reaction } },
      { $sort: { updatedAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "videos",
          localField: "videoId",
          foreignField: "_id",
          as: "video",
        },
      },
      { $unwind: "$video" },
      {
        $lookup: {
          from: "users",
          localField: "video.by",
          foreignField: "_id",
          as: "video.by",
        },
      },
      {
        $project: {
          _id: "$video._id",
          title: "$video.title",
          thumbnail: "$video.thumbnail",
          duration: "$video.duration",
          link: "$video.link",
          by: {
            _id: { $arrayElemAt: ["$video.by._id", 0] },
            channelName: { $arrayElemAt: ["$video.by.channelName", 0] },
            username: { $arrayElemAt: ["$video.by.username", 0] },
            dp: { $arrayElemAt: ["$video.by.dp", 0] },
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
