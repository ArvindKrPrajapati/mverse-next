import dbConnect from "@/lib/dbConnect";
import { limit as constLimit } from "@/lib/constants";
import { getValidId } from "@/lib/serverCookies";
import { Playlist } from "@/models/playlist.model";
import User from "@/models/user.model";
const types = ["all", "public", "private"];
export async function getPlaylists(
  _id: any,
  type = "all",
  skip = 0,
  limit = constLimit
) {
  try {
    if (type !== "public") {
      _id = getValidId(_id);
    }
    // connect db
    const filter: any = { createdBy: _id };
    if (type == "public") {
      filter["isPrivate"] = false;
      const username = decodeURIComponent(_id);

      const user = await User.findOne({ username });
      if (user) {
        filter["createdBy"] = user._id;
      } else {
        return [];
      }
    }
    if (type == "private") {
      filter["isPrivate"] = true;
    }

    await dbConnect();
    //  get userid using username

    const data = await Playlist.aggregate([
      {
        $match: filter,
      },
      {
        $sort: { updatedAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "playlistvideos",
          let: { playlistId: "$_id" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$playlistId", "$$playlistId"] } },
            },
            {
              $sort: { updatedAt: -1 },
            },
            {
              $limit: 1,
            },
            {
              $lookup: {
                from: "videos",
                localField: "videoId",
                foreignField: "_id",
                as: "latestVideo",
              },
            },
            {
              $unwind: "$latestVideo",
            },
          ],
          as: "latestVideo",
        },
      },
      {
        $lookup: {
          from: "playlistvideos",
          localField: "_id",
          foreignField: "playlistId",
          as: "playlistVideos",
        },
      },
      {
        $addFields: {
          videos: { $size: "$playlistVideos" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          isPrivate: 1,
          createdBy: 1,
          createdAt: 1,
          updatedAt: 1,
          videos: 1,
          latestVideo: { $arrayElemAt: ["$latestVideo", 0] },
        },
      },
    ]);

    if (!data.length) {
      return [];
    }
    return data;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
