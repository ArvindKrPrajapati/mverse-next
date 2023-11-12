import { Schema, Document, model, Types, models } from "mongoose";
import IUser from "./user.model";

interface ILikes extends Document {
  by: Types.ObjectId | typeof IUser;
  postId: any;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<ILikes>(
  {
    by: {
      type: Types.ObjectId,
      ref: "user",
    },
    postId: {
      type: Types.ObjectId,
      ref: "posts",
    },
  },
  { timestamps: true }
);

const PostLikes = models.likes || model<ILikes>("likes", schema);

export default PostLikes;
