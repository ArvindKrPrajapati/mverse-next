import { getChannelByUsername } from "@/actions/getChannelByUsername";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import { NextResponse } from "next/server";

type Params = {
  params: {
    username: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  try {
    // get username from url params
    const { username } = params;
    const myid = getUserIdFromAuth(request);
    const data = await getChannelByUsername(username, myid);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log("get user error by usernaem :", error);
    return NextResponse.json({ success: false, error: "server error" });
  }
}
