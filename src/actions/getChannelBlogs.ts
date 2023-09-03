import dbConnect from "@/lib/dbConnect";
import Video from "@/models/video.model";
import { limit as constLimit } from "@/lib/constants";
import User from "@/models/user.model";
import Blog from "@/models/blog.model";

export async function getChannelBlogs(
  username: string,
  skip = 0,
  limit = constLimit
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

    const data = await Blog.aggregate([
      { $match: { by: userData._id } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "by",
          foreignField: "_id",
          as: "by",
        },
      },
      { $unwind: "$by" },
      {
        $project: {
          slug: 1,
          content: 1,
          createdAt: 1,
          by: {
            _id: 1,
            channelName: 1,
            username: 1,
            dp: 1,
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

    throw error;
  }
}
