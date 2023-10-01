import { getVideoById } from "@/actions/getVideoById";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  try {
    // get username from url params
    const { id } = params;
    const myid = getUserIdFromAuth(request);
    const data = await getVideoById(id, myid);

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.log("get user error by usernaem :", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
