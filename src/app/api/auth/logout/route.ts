import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = NextResponse.json({
    success: true,
    data: { message: "logged out successfully" },
  });
  res.cookies.set("user", "");
  res.cookies.set("token", "");
  return res;
}
