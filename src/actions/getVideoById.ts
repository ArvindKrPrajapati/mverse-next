import dbConnect from "@/lib/dbConnect";
import Video from "@/models/video.model";
import User from "@/models/user.model";
import Reactions from "@/models/reaction.model";
import { getCurrentUser, getValidId } from "@/lib/serverCookies";

export async function getVideoById(_id: string) {
  try {
    // connect db
    const videoId = getValidId(_id);
    await dbConnect();
    // get loggedin userid
    const currentUser = getCurrentUser();

    const user = await User.findOne();
    // get video
    const data = await Video.findById(videoId).populate(
      "by",
      "_id channelName dp username"
    );

    const reactions = await Reactions.aggregate([
      {
        $match: {
          videoId,
          $or: [{ reaction: "like" }, { reaction: "dislike" }],
        },
      },
      {
        $group: {
          _id: null,
          likes: {
            $sum: {
              $cond: [{ $eq: ["$reaction", "like"] }, 1, 0],
            },
          },
          dislikes: {
            $sum: {
              $cond: [{ $eq: ["$reaction", "dislike"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          likes: 1,
          dislikes: 1,
        },
      },
    ]);
    const myReaction = await Reactions.findOne({
      videoId,
      by: currentUser?._id,
    });
    if (!data) {
      return null;
    }
    const obj = {
      ...data._doc,
      ...reactions[0],
      raection: myReaction?.reaction,
    };

    return obj;
  } catch (error) {
    console.log(error);

    throw new Error("failed to get data from db");
  }
}
