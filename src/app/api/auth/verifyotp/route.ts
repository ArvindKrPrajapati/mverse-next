import dbConnect from "@/lib/dbConnect";
import Otp from "@/models/otp.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { createTokenAndSetCookies } from "@/actions/createTokenAndSetCookies";

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
      const token = createTokenAndSetCookies(validOtp.userid);
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
