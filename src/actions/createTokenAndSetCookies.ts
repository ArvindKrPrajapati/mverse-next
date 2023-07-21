import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function createTokenAndSetCookies(data: any) {
  const user = {
    _id: data._id,
    eamil: data.email,
    name: data.name,
    dp: data.dp,
    cover: data.cover,
    channelName: data.channelName,
    username: data.username,
  };
  const jwt_secret = process.env.JWT_SECRET as string;
  const token = jwt.sign(user, jwt_secret);

  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    expires: new Date("9999-12-12"),
  });
  return token;
}
