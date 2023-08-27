import { Schema, model, Document, Types, models } from "mongoose";
import IUser from "./user.model";
import IVideo from "./video.model";

interface IReaction {
  commentId: Types.ObjectId | IComment;
  userId: Types.ObjectId | typeof IUser;
  reactionType: "like" | "dislike";
}

interface IComment extends Document {
  videoId: Types.ObjectId | typeof IVideo;
  author: Types.ObjectId | typeof IUser;
  content: string;
  reactions: IReaction[];
}

interface IReply extends Document {
  commentId: Types.ObjectId | IComment;
  author: Types.ObjectId | typeof IUser;
  content: string;
  reactions: IReaction[];
}

const ReactionSchema = new Schema<IReaction>({
  commentId: {
    type: Types.ObjectId,
    ref: "Comment",
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    ref: "user",
    required: true,
  },
  reactionType: {
    type: String,
    enum: ["like", "dislike"],
    default: "like",
  },
});

const CommentSchema = new Schema<IComment>(
  {
    videoId: {
      type: Types.ObjectId,
      ref: "videos",
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ReplySchema = new Schema<IReply>(
  {
    commentId: {
      type: Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = models.Comment || model<IComment>("Comment", CommentSchema);
const CommentReply =
  models.comment_reply || model<IReply>("comment_reply", ReplySchema);
const CommentReaction =
  models.comment_reaction ||
  model<IReaction>("comment_reaction", ReactionSchema);

export { Comment, CommentReply, CommentReaction };
