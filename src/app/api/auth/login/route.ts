import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import { createTokenAndSetCookies } from "@/actions/createTokenAndSetCookies";

export async function POST(request: Request) {
  try {
    let { email, password } = await request.json();
    //   check for required fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "email ,password are required" },
        { status: 400 }
      );
    }
    //   check valid email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "invalid email" },
        { status: 400 }
      );
    }
    //   check length of password
    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error: "password must be greater than 7 digit",
        },
        { status: 400 }
      );
    }
    await dbConnect();
    const data = await User.findOne({ email, accountCreated: true });
    if (!data) {
      return NextResponse.json(
        {
          success: false,
          error: "user dont exist",
        },
        { status: 500 }
      );
    }
    if (!bcrypt.compareSync(password, data.password)) {
      return NextResponse.json(
        { success: false, error: "wrong password" },
        { status: 500 }
      );
    }
    const user = {
      _id: data._id,
      eamil: data.email,
      name: data.name,
      dp: data.dp,
      cover: data.cover,
      channelName: data.channelName,
      username: data.username,
    };
    const token = createTokenAndSetCookies(data);
    const res: NextResponse = NextResponse.json({
      success: true,
      data: user,
      token,
    });

    return res;
  } catch (error) {
    console.log("login error : ", error);
    return NextResponse.json({ success: false, error: "server error" });
  }
}
