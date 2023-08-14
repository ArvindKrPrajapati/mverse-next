import dbConnect from "@/lib/dbConnect";
import Video from "@/models/video.model";
import { limit as constLimit } from "@/lib/constants";
import User from "@/models/user.model";
import View from "@/models/views.model";
import { getValidId } from "@/lib/serverCookies";
import { Playlist, PlaylistVideos } from "@/models/playlist.model";

export async function getWatchLater(_id: any, skip = 0, limit = constLimit) {
  try {
    _id = getValidId(_id);

    // connect db
    await dbConnect();
    //  get userid using username
    const playlist = await Playlist.findOne({
      createdBy: _id,
      name: "Watch later",
    });

    if (!playlist) {
      return [];
    }
    const data = await PlaylistVideos.aggregate([
      { $match: { playlistId: playlist._id } },
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
