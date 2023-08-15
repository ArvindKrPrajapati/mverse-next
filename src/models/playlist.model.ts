import { Document, ObjectId, Schema, Types, model, models } from "mongoose";
import IUser from "./user.model";

interface IPlaylist extends Document {
  name: string;
  isPrivate: boolean;
  createdBy: Types.ObjectId | typeof IUser;
  createdAt: Date;
  updatedAt: Date;
}

interface IPlaylistVideos extends Document {
  playlistId: Types.ObjectId;
  videoId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
const videoSchema = new Schema<IPlaylistVideos>(
  {
    playlistId: {
      type: Schema.Types.ObjectId,
      ref: "playlist",
      required: true,
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "videos",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
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
  },
  {
    timestamps: true,
  }
);
const Playlist = models.playlist || model<IPlaylist>("playlist", schema);
const PlaylistVideos =
  models.playlistvideos || model<IPlaylist>("playlistvideos", videoSchema);
export { Playlist, PlaylistVideos };
