import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const cookieStore = cookies();
  cookieStore.set({
    name: "token",
    value: "",
    httpOnly: true,
    path: "/",
  });
  const res = NextResponse.json({
    success: true,
    data: { message: "logged out successfully" },
  });
  return res;
}
