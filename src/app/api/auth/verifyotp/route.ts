import dbConnect from "@/lib/dbConnect";
import Otp from "@/models/otp.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { email, otp } = await request.json();
  if (!email || !otp) {
    return NextResponse.json(
      { success: false, message: "email and otp is required" },
      { status: 400 }
    );
  }
  if (isNaN(otp)) {
    return NextResponse.json(
      { success: false, message: "invalid otp (NaN)" },
      { status: 400 }
    );
  }
  if (otp.toString().length !== 6) {
    return NextResponse.json(
      { success: false, message: "otp is invalid ( 6 digit otp)" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();
    const validOtp = await Otp.findOne({ email, otp }).populate("userid");
    if (validOtp) {
      await User.findOneAndUpdate(
        { email },
        {
          accountCreated: true,
        }
      );
      const jwt_secret = process.env.JWT_SECRET as string;
      const token = jwt.sign({ _id: validOtp.userid._id }, jwt_secret);
      //    delete otp
      await Otp.findByIdAndDelete(validOtp._id);
      const userObj = {
        _id: validOtp._id,
        email: validOtp.email,
        name: validOtp.userid.name,
        dp: validOtp.userid.dp,
      };
      const res: NextResponse = NextResponse.json({
        success: true,
        data: userObj,
        token,
      });

      res.cookies.set("token", token);
      res.cookies.set("user", JSON.stringify(userObj));

      return res;
    }
    return NextResponse.json({
      success: false,
      error: "wrong otp",
    });
  } catch (error) {
    console.log("verify otp error : ", error);
    return NextResponse.json({ success: false, error: "server error" });
  }
}
