import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = NextResponse.json({
    success: true,
    data: { message: "logged out successfully" },
  });
  res.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    path: "/",
  });
  res.cookies.set({
    name: "user",
    value: "",
    httpOnly: true,
    path: "/",
  });
  return res;
}
