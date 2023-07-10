import { setCookiesOptions } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = NextResponse.json({
    success: true,
    data: { message: "logged out successfully" },
  });
  res.cookies.set("user", "user", setCookiesOptions);
  res.cookies.set("token", "token", setCookiesOptions);
  return res;
}
