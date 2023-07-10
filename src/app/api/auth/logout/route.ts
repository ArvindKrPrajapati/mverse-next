import { setCookiesOptions } from "@/lib/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  cookieStore.set({
    name: "token",
    value: " ",
    httpOnly: true,
    path: "/",
  });
  cookieStore.set({
    name: "user",
    value: " ",
    httpOnly: true,
    path: "/",
  });
  const res = NextResponse.json({
    success: true,
    data: { message: "logged out successfully" },
  });
  // await res.cookies.set("user", "user", setCookiesOptions);
  // await res.cookies.set("token", "token", setCookiesOptions);
  return res;
}
