import dbConnect from "@/lib/dbConnect";
import Video from "@/models/video.model";
import Reactions from "@/models/reaction.model";
import { getCurrentUser, getValidId } from "@/lib/serverCookies";
import View from "@/models/views.model";
import User from "@/models/user.model";
import { getChannelByUsername } from "./getChannelByUsername";

export async function getVideoById(_id: string, myid: any = "") {
  try {
    // connect db
    const videoId = getValidId(_id);
    await dbConnect();
    // get loggedin userid
    const currentUser = getCurrentUser();

    // get video
    const data = await Video.findById(videoId);

    const u = await User.findById(data.by).select("username");
    const channel = await getChannelByUsername(u.username, myid);

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

    const views = await View.find({ videoId }).count();

    if (!data) {
      return null;
    }
    const obj = {
      ...data._doc,
      ...reactions[0],
      raection: myReaction?.reaction,
      views,
      by: channel,
    };

    return obj;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
