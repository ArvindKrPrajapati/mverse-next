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

    const { _id } = await User.findOne({ username });
    // get user
    const data = await Video.find({ by: _id })
      .populate("by", "_id channelName dp username")
      .sort({ craetedAt: -1 })
      .skip(skip)
      .limit(limit);

    return data;
  } catch (error) {
    throw new Error("failed to get data from db");
  }
}
