import { Schema, Document, model, Types, models } from "mongoose";

interface IVideo extends Document {
  title: string;
  description: string;
  thumbnail: String;
  duration: Number;
  link: string;
  by: Types.ObjectId;
  pinned: Boolean;
  location?: String;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    link: {
      type: String,
      trim: true,
      required: true,
    },
    by: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Video = models.videos || model<IVideo>("videos", schema);

export default Video;