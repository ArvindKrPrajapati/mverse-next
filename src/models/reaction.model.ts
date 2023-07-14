import { Schema, Document, model, Types, models } from "mongoose";

interface IReaction extends Document {
  by: Types.ObjectId | undefined;
  videoId: Types.ObjectId | undefined;
  reaction: String;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IReaction>(
  {
    by: {
      type: Types.ObjectId,
      ref: "user",
    },
    videoId: {
      type: Types.ObjectId,
      ref: "videos",
    },
    reaction: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Reactions = models.reactions || model<IReaction>("reactions", schema);

export default Reactions;
