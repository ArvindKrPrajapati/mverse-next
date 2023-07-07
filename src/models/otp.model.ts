import { Schema, Document, model, Types, models } from "mongoose";

interface IOtp extends Document {
  userid: Types.ObjectId | undefined;
  email: string;
  otp: number;
  createdAt: Date;
  updatedAt: Date;
}

const otpSchema = new Schema<IOtp>(
  {
    userid: {
      type: Types.ObjectId,
      ref: "user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    otp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Otp = models.otp || model<IOtp>("otp", otpSchema);

export default Otp;
