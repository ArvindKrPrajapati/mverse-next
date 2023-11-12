import dbConnect from "@/lib/dbConnect";
import { limit as constLimit } from "@/lib/constants";
import PostModel from "@/models/posts.model";
import { getCurrentUser, getValidId } from "@/lib/serverCookies";

export async function getAllPosts(skip = 0, limit = constLimit, _id = null) {
  try {
    const currentUser = getCurrentUser();
    const myId = getValidId(currentUser?._id);
    // connect db
    await dbConnect();
    let filter: any = [
      { $match: { belongsTo: null } },
      { $sort: { createdAt: -1 } },
    ];
    if (_id) {
      filter = [
        {
          $match: {
            $or: [{ _id }, { belongsTo: _id }],
          },
        },
        {
          $addFields: {
            currentId: { $eq: ["$_id", _id] },
          },
        },
        { $sort: { currentId: -1, createdAt: -1 } },
      ];
    }

    const data = await PostModel.aggregate([
      ...filter,
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "userid",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "belongsTo",
          as: "comments",
        },
      },
      {
        $project: {
          text: 1,
          images: 1,
          tags: 1,
          belongsTo: 1,
          mentions: 1,
          createdAt: 1,
          user: {
            _id: 1,
            channelName: 1,
            username: 1,
            dp: 1,
            name: 1,
          },
          likes: {
            $cond: {
              if: { $isArray: "$likes" },
              then: { $size: "$likes" },
              else: 0,
            },
          },
          comments: {
            $cond: {
              if: { $isArray: "$comments" },
              then: { $size: "$comments" },
              else: 0,
            },
          },
          iLiked: {
            $in: [myId, "$likes.by"],
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
