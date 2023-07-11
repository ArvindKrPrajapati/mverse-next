import { getChannelByUsername } from "@/actions/getChannelByUsername";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import User from "@/models/user.model";
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
export async function PATCH(request: Request, { params }: Params) {
  try {
    // get username from url params
    const { username } = params;
    if (!username.startsWith("@")) {
      return NextResponse.json({
        success: false,
        error: "username is invalid in params",
      });
    }
    // const { subscribe } = await request.json();
    const myid = getUserIdFromAuth(request);
    if (!myid) {
      return NextResponse.json({ success: false, error: "login to subscribe" });
    }

    const subscribed = await User.findOne({ username, subscribers: myid });

    let msg = "";
    if (subscribed) {
      await User.findOneAndUpdate(
        { username },
        { $pull: { subscribers: myid } },
        { new: true }
      );
      msg = "unsubscribed";
    } else {
      const d = await User.findOneAndUpdate(
        { username },
        { $push: { subscribers: myid } },
        { new: true }
      );
      msg = "subscribed";
    }

    return NextResponse.json({
      success: true,
      data: { message: msg },
    });
  } catch (error) {
    console.log("subscribing channel error by usernaem :", error);
    return NextResponse.json({ success: false, error: "server error" });
  }
}
