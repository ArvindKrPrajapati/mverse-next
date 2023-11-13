import dbConnect from "@/lib/dbConnect";
import { limit as constLimit } from "@/lib/constants";
import { getCurrentUser, getValidId } from "@/lib/serverCookies";
import NotificationModel from "@/models/notification.model";

export async function getNotifications(
  skip = 0,
  limit = constLimit,
  _id: any = null
) {
  try {
    const currentUser = getCurrentUser();
    const myId = getValidId(currentUser?._id);
    if (!_id) {
      _id = myId;
    } else {
      _id = getValidId(_id);
    }
    // connect db
    await dbConnect();

    let filter: any = [
      { $match: { receiverId: _id } },
      { $sort: { createdAt: -1 } },
    ];

    const data = await NotificationModel.aggregate([
      ...filter,
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id",
          as: "sender",
        },
      },
      { $unwind: "$sender" },
      {
        $lookup: {
          from: "users",
          localField: "receiverId",
          foreignField: "_id",
          as: "receiver",
        },
      },
      { $unwind: "$receiver" },
      {
        $lookup: {
          from: "posts",
          localField: "postId",
          foreignField: "_id",
          as: "post",
        },
      },
      { $unwind: "$post" },

      {
        $project: {
          post: {
            text: 1,
            images: 1,
          },
          createdAt: 1,
          sender: {
            _id: 1,
            channelName: 1,
            username: 1,
            dp: 1,
            name: 1,
          },
          receiver: {
            _id: 1,
            channelName: 1,
            username: 1,
            dp: 1,
            name: 1,
          },
          type: 1,
          seen: 1,
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
