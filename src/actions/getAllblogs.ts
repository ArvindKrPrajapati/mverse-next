import dbConnect from "@/lib/dbConnect";
import { limit as constLimit } from "@/lib/constants";
import Blog from "@/models/blog.model";

export async function getAllBlogs(skip = 0, limit = constLimit) {
  try {
    // connect db
    await dbConnect();

    const data = await Blog.aggregate([
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
    console.log("get error", error);
    throw error;
  }
}
