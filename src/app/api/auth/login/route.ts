import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const jwt_secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: data._id }, jwt_secret);
    return NextResponse.json({
      success: true,
      data: {
        id: data._id,
        email: data.email,
        name: data.name,
        dp: data.dp,
      },
      token,
    });
  } catch (error) {
    console.log("login error : ", error);
    return NextResponse.json({ success: false, error: "server error" });
  }
}
