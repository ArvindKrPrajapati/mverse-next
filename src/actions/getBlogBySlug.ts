import dbConnect from "@/lib/dbConnect";
import { limit as constLimit } from "@/lib/constants";
import Blog from "@/models/blog.model";

export async function getBlogBySlug(slug: string) {
  try {
    // connect db
    await dbConnect();

    const data = await Blog.aggregate([
      { $match: { slug } },
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
      return null;
    }
    return data[0];
  } catch (error) {
    console.log("get error", error);
    throw error;
  }
}
