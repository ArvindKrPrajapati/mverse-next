import { Schema, Document, model, Types, models } from "mongoose";
import IUser from "./user.model";

interface IPost extends Document {
  userid: Types.ObjectId | typeof IUser;
  text:String,
  images:String[],
  tags:string[],
  mentions:string[],
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IPost>(
  {
    userid: {
      type: Types.ObjectId,
      ref: "user",
    },
    text:{
        type:String,
        required:false,
        trim:true
    },
    images:{
        type:[String],
        default:[]
    },
    tags:{
        type:[String],
        default:[]
    },
    mentions:{
        type:[String],
        default:[]
    },
  },
  { timestamps: true }
);

const PostModel = models.posts || model<IPost>("posts", schema);

export default PostModel;
