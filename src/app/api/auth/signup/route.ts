import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Otp from "@/models/otp.model";
import nodemailer from "nodemailer";

async function sendOtp(email: string, id: string) {
  // create random otp
  const env = process.env.NODE_ENV;
  const img =
    "https://mverse-next.vercel.app/_next/image?url=%2Fimages%2Flogo.png&w=128&q=75";
  let otp: Number;
  if (env === "development") {
    otp = 222222;
  } else {
    // otp = Math.floor(100000 + Math.random() * 900000);
    otp = 222222;
  }
  // update in db
  await Otp.updateOne({ email }, { otp, userid: id, email }, { upsert: true });
  // send

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wedeveloper3@gmail.com",
      pass: "oxgpliybgrejgfbd",
    },
  });

  const mailOptions = {
    from: "wedeveloper3@gmail.com",
    to: email,
    subject: "Your email verification OTP is " + otp,
    html: `
    <img src="${img}" alt="logo" style="width:200px"/>
    <h1>OTP Verification</h1>
    <p>Hello,</p>
    <p>Your OTP for verification is: <strong>${otp}</strong> <br/>Please enter this OTP to complete the verification process.</p>
    <p>Regards <br/>Team Mverse</p>
  `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return { success: false, error: "Error while sending" };
    } else {
      return { success: true, data: { message: "otp send", email } };
    }
  });
  return { success: true, data: { message: "otp send", email } };
}

export async function POST(request: Request) {
  let { email, name, password } = await request.json();
  //   check for required fields
  if (!email || !name || !password) {
    return NextResponse.json(
      { success: false, error: "email ,password and name is required" },
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
  try {
    //   connect db
    await dbConnect();
    const varify = await User.findOne({ email });
    if (varify) {
      if (varify.accountCreated) {
        return NextResponse.json(
          { success: false, error: "User already exists" },
          { status: 401 }
        );
      } else {
        // update
        password = bcrypt.hashSync(password, 10);
        const data: any = await User.findByIdAndUpdate(
          varify._id,
          { email, name, password },
          { new: true }
        );
        const otpSent = await sendOtp(data?.email, data?._id);
        return NextResponse.json(otpSent);
      }
    } else {
      // create
      password = bcrypt.hashSync(password, 10);
      const data: any = await User.create({ email, name, password });
      const otpSent = await sendOtp(data?.email, data?._id);
      return NextResponse.json(otpSent);
    }
  } catch (error) {
    console.log("signup error : ", error);
    return NextResponse.json({ success: false, error: "server error" });
  }
}
