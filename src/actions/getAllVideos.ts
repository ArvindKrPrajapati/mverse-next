import dbConnect from "@/lib/dbConnect";
import Video from "@/models/video.model";
import { limit as constLimit } from "@/lib/constants";
import User from "@/models/user.model";

export async function getAllVideos(skip = 0, limit = constLimit) {
  try {
    // connect db
    await dbConnect();
    // justr to connect with user modal cause it was giving error to find videos because of ref
    // const res = await User.findOne();
    // console.log(res);

    // get user
    const data = await Video.find()
      .populate("by", "_id channelName dp")
      .sort({ craetedAt: -1 })
      .skip(skip)
      .limit(limit);
    return data;
  } catch (error) {
    console.log("get error", error);

    throw new Error("failed to get data from db");
  }
}
