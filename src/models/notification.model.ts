import { Schema, Document, model, Types, models } from "mongoose";
import IUser from "./user.model";

interface INotification extends Document {
  senderId: Types.ObjectId | typeof IUser;
  receiverId: Types.ObjectId | typeof IUser;
  postId: any;
  type: String;
  seen: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<INotification>(
  {
    senderId: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    postId: {
      type: Types.ObjectId,
      ref: "posts",
      default: null,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const NotificationModel =
  models.notifications || model<INotification>("notifications", schema);

export default NotificationModel;
