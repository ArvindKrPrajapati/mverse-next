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
    // get user
    const data = await Video.find({ by: userData._id })
      .populate("by", "_id channelName dp username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    if (!data.length) {
      return [];
    }
    return data;
  } catch (error) {
    console.log(error);

    throw new Error("failed to get data from db");
  }
}
