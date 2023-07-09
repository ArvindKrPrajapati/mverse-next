import { Schema, Document, model, Types, models } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  channelName?: string;
  description: string;
  dp?: string;
  cover?: string;
  isVerified: boolean;
  country?: string;
  subscribers: Types.ObjectId[];
  subscribed: Types.ObjectId[];
  extraLinks: { name: string; link: string }[];
  password: string;
  accountCreated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    channelName: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    description: {
      type: String,
      trim: true,
    },
    dp: {
      type: String,
    },
    cover: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    country: {
      type: String,
    },
    subscribers: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    subscribed: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    extraLinks: [
      {
        name: String,
        link: String,
      },
    ],
    password: {
      type: String,
      required: true,
    },
    accountCreated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.user || model<IUser>("user", userSchema);

export default User;
