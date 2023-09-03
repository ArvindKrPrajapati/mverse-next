// blog.model.ts
import mongoose, { Document, Schema, Types, models, model } from "mongoose";
import IUser from "./user.model";

interface BlogDocument extends Document {
  content: string;
  by: Types.ObjectId | typeof IUser;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<BlogDocument>(
  {
    content: {
      type: String,
      required: true,
    },
    by: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = models.blogs || model<BlogDocument>("blogs", schema);

export default Blog;
