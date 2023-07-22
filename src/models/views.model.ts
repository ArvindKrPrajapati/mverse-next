import { Schema, model, Document, Types, models } from "mongoose";
import IVideo from "./video.model";
import IUser from "./user.model";

interface IView extends Document {
  videoId: Types.ObjectId | typeof IVideo;
  by: Types.ObjectId | typeof IUser;
  viewedAt: Date;
}

const ViewSchema = new Schema<IView>(
  {
    videoId: {
      type: Types.ObjectId,
      ref: "videos",
      required: true,
    },
    by: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    viewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const View = models.view || model<IView>("view", ViewSchema);
export default View;
