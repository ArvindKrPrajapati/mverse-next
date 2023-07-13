import dbConnect from "@/lib/dbConnect";
import Video from "@/models/video.model";
import User from "@/models/user.model";

export async function getVideoById(_id: string) {
  try {
    // connect db

    await dbConnect();
    const user = await User.findOne();
    // get video
    const data = await Video.findById(_id).populate(
      "by",
      "_id channelName dp username"
    );

    return data;
  } catch (error) {
    throw new Error("failed to get data from db");
  }
}
