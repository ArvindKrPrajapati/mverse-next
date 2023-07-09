import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const token = cookies().get("token");
    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.log("channel post error :", error);
    return NextResponse.json(
      { success: false, error: "server error" },
      { status: 500 }
    );
  }
}
