import { Document, ObjectId, Schema, Types, model, models } from "mongoose";
import IUser from "./user.model";

interface IPlaylist extends Document {
  name: string;
  isPrivate: boolean;
  createdBy: Types.ObjectId | typeof IUser;
  videos: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IPlaylist>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "videos",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Playlist = models.playlist || model<IPlaylist>("playlist", schema);
export default Playlist;
