import dbConnect from "@/lib/dbConnect";
import Video from "@/models/video.model";
import { limit as constLimit } from "@/lib/constants";
type Props = {
  limit?: number;
  skip?: number;
};
export async function getAllVideos(skip = 0, limit = constLimit) {
  try {
    // connect db
    await dbConnect();

    // get user
    const data = await Video.find()
      .populate("by", "_id channelName dp")
      .sort({ craetedAt: -1 })
      .skip(skip)
      .limit(limit);
    return data;
  } catch (error) {
    throw new Error("failed to get data from db");
  }
}
