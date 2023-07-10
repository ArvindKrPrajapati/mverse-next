import { setCookiesOptions } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = NextResponse.json({
    success: true,
    data: { message: "logged out successfully" },
  });
  await res.cookies.set("user", "user", setCookiesOptions);
  await res.cookies.set("token", "token", setCookiesOptions);
  return res;
}
