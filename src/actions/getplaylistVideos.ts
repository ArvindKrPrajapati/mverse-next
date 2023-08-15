import dbConnect from "@/lib/dbConnect";
import Video from "@/models/video.model";
import { limit as constLimit } from "@/lib/constants";
import User from "@/models/user.model";
import View from "@/models/views.model";
import { getValidId } from "@/lib/serverCookies";
import { Playlist, PlaylistVideos } from "@/models/playlist.model";

export async function getPlaylistVideos(
  _id: any,
  userid: any,
  skip = 0,
  limit = constLimit
) {
  try {
    _id = getValidId(_id);
    userid = getValidId(userid);
    // connect db
    await dbConnect();

    const playlist = await Playlist.findById(_id).populate(
      "createdBy",
      "name channelName"
    );
    if (!playlist) {
      throw new Error("Playlist does not exists");
    }
    if (playlist.isPrivate) {
      if (!userid) {
        throw new Error("login to access private playlist");
      }
      if (!playlist.createdBy.equals(userid)) {
        throw new Error("Playlist is not yours");
      }
    }

    //  get userid using username

    const data = await PlaylistVideos.aggregate([
      { $match: { playlistId: _id } },
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
    const total = await PlaylistVideos.find({ playlistId: _id }).count();
    if (!data.length) {
      return { data: [], playlist, total };
    }

    return { data, playlist, total };
  } catch (error: any) {
    throw error;
  }
}
