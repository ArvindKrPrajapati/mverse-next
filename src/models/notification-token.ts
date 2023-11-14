import { Schema, Document, model, Types, models } from "mongoose";
import IUser from "./user.model";

interface IToken extends Document {
  userId: Types.ObjectId | typeof IUser;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IToken>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "user",
      default: null,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const NotificationToken =
  models.notification_tokens || model<IToken>("notification_tokens", schema);

export default NotificationToken;
