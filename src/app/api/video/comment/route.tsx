import { limit } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import { getCurrentUser, getUserIdFromAuth, getValidId } from "@/lib/serverCookies";
import { Comment } from "@/models/comments.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    //    check if user is logged in or not
    const currentUser = getCurrentUser();
    if (!currentUser?._id) {
      return NextResponse.json({ success: false, error: "login first" });
    }

    // extract payload
    const author = currentUser._id;
    const { videoId, content } = await request.json();

    // check if payload is available
    if (!videoId || !content) {
      return NextResponse.json({
        success: false,
        error: "videoId and content is required",
      });
    }

    //   create comment
    await dbConnect();
    const data = await Comment.create({
      videoId,
      author,
      content,
      reactions: [],
    });
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log("comment error", error);
    return NextResponse.json({ success: false, error: "server error" });
  }
}

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const videoId = query.get("videoId");
    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);
    if (!videoId) {
      return NextResponse.json(
        {
          success: false,
          error: "videoId is not provided",
        },
        { status: 422 }
      );
    }
    const _videoId=getValidId(videoId)
    await dbConnect();
    // const data = await Comment.find({ videoId })
    //   .populate("author", "_id channelName dp username")
    //   .sort({ createdAt: -1 })
    //   .skip(skip)
    //   .limit(_limit);

    const yourUserId = getUserIdFromAuth(request);

    const data = await Comment.aggregate([
      {$match:{videoId:_videoId}},
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: _limit },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      {
        $lookup: {
          from: "comment_reactions",
          localField: "_id",
          foreignField: "commentId",
          as: "reactions",
        },
      },
      {
        $lookup: {
          from: "comment_reactions",
          let: { commentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", yourUserId] },
                    { $eq: ["$commentId", "$$commentId"] },
                  ],
                },
              },
            },
          ],
          as: "userReaction",
        },
      },
      {
        $project: {
          videoId: 1,
          content: 1,
          createdAt: 1,
          author: {
            _id: 1,
            channelName: 1,
            username: 1,
            dp: 1,
          },
          likes: {
            $size: {
              $filter: {
                input: "$reactions",
                as: "reaction",
                cond: { $eq: ["$$reaction.reactionType", "like"] },
              },
            },
          },
          dislikes: {
            $size: {
              $filter: {
                input: "$reactions",
                as: "reaction",
                cond: { $eq: ["$$reaction.reactionType", "dislike"] },
              },
            },
          },
          reaction: { $arrayElemAt: ["$userReaction.reactionType", 0] },
        },
      },
    ]);

    return NextResponse.json({ success: true, data, limit: _limit, skip });
  } catch (error) {
    console.log("comment error", error);
    return NextResponse.json({ success: false, error: "server error" });
  }
}
