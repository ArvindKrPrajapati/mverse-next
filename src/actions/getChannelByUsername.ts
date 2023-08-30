import dbConnect from "@/lib/dbConnect";
import { getValidId } from "@/lib/serverCookies";
import User from "@/models/user.model";
import Video from "@/models/video.model";

export async function getChannelByUsername(username: string, myid: any) {
  try {
    myid = getValidId(myid);
    username = decodeURIComponent(username);
    // connect db
    await dbConnect();

    // get user
    const data = await User.aggregate([
      { $match: { username } },
      {
        $project: {
          _id: 1,
          isVerified: 1,
          extraLinks: 1,
          createdAt: 1,
          channelName: 1,
          description: 1,
          username: 1,
          dp: 1,
          cover: 1,
          country: 1,
          subscribers: { $size: "$subscribers" },
          isSubscribed: {
            $cond: {
              if: { myid },
              then: { $in: [myid, "$subscribers"] },
              else: false,
            },
          },
          isOwner: {
            $cond: {
              if: { $eq: [myid, "$_id"] },
              then: true,
              else: false,
            },
          },
        },
      },
    ]);

    if (!data.length) {
      return null;
    }
    const userId = data[0]._id;
    const videos = await Video.find({ by: userId }).count();

    data[0]["videos"] = videos;

    return data[0];
  } catch (error) {
    throw error;
  }
}
