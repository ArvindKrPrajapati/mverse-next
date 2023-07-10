import { limit } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // get logged in userid fron cookies or header
    const userid = getUserIdFromAuth(request);

    // if not userid then user is not logged in this operation needs user to login
    if (!userid) {
      return NextResponse.json(
        { success: false, error: "not logged in" },
        { status: 401 }
      );
    }

    // if user is logged in then extract channelName and description from body
    const { channelName, description } = await request.json();

    // if channelName is not provided throw an error cause its required
    if (!channelName) {
      return NextResponse.json(
        { success: false, error: "channelName is required" },
        { status: 422 }
      );
    }

    // create username from channel
    const username = "@" + channelName.replaceAll(" ", "");

    // create object to save in db
    let obj: any = { channelName, username };

    // if there is description also add that
    if (description) {
      obj["description"] = description;
    }

    // connect database
    await dbConnect();

    // check if this channel name is already created
    const isChannelExists = await User.find({ channelName });
    if (isChannelExists.length > 0) {
      return NextResponse.json(
        { success: false, error: channelName + " channel already exists" },
        { status: 405 }
      );
    }

    // check if channel is alraedy created and throw error
    const userData = await User.findById(userid);
    if (userData.username) {
      return NextResponse.json(
        { success: false, error: "channel already created" },
        { status: 405 }
      );
    }

    // if channel is not already created chheck if username already exist for other channael
    const isUsernameExists = await User.find({ username });
    console.log(isUsernameExists);

    // if username exists create onother one by appending date.now
    if (isUsernameExists.length > 0) {
      obj["username"] = username + Date.now();
    }

    // after all validation save into db
    const data = await User.findByIdAndUpdate(userid, obj, { new: true });

    // create user obj to save in db
    const user = {
      _id: data._id,
      eamil: data.email,
      name: data.name,
      dp: data.dp,
      channleName: data.channelName,
      username: data.username,
    };

    // create response
    const res: NextResponse = NextResponse.json({
      success: true,
      data: user,
    });

    // set new cookie for user
    res.cookies.set({
      name: "user",
      value: JSON.stringify(user),
      httpOnly: true,
      path: "/",
      expires: new Date("9999-12-12"),
    });

    // return response
    return res;
  } catch (error) {
    console.log("channel post error :", error);
    return NextResponse.json(
      { success: false, error: "server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const name = query.get("name")?.trim();
    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);
    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: "name is not provided",
        },
        { status: 422 }
      );
    }
    await dbConnect();
    const res = await User.find({
      channelName: name,
    })
      .select("channelName")
      .sort({ datetime: -1 })
      .skip(skip)
      .limit(_limit);
    return NextResponse.json({ success: true, data: res, limit: _limit, skip });
  } catch (error) {
    console.log("get channel error:", error);
    return NextResponse.json({ success: false, error: "server error" });
  }
}
