import { limit } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import NotificationToken from "@/models/notification-token";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;

    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);

    const userId = query.get("userId");
    const token = query.get("token");
    const filter: any = {};
    if (userId) {
      filter["userId"] = userId;
    }
    if (token) {
      filter["token"] = token;
    }

    await dbConnect();
    const data = await NotificationToken.find(filter).skip(skip).limit(_limit);

    return NextResponse.json({
      success: true,
      limit: _limit,
      skip,
      data,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}

export async function POST(requeest: Request) {
  try {
    // get myid if i am login
    const myid = getUserIdFromAuth(requeest);

    // if i am not login then throw an error
    const { token } = await requeest.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "token is required" },
        { status: 400 }
      );
    }
    await dbConnect();
    const data = await NotificationToken.updateMany(
      {
        token,
        userId: myid || null,
      },
      {
        token,
        userId: myid || null,
      },
      { upsert: true }
    );

    if (data) {
      return NextResponse.json({
        success: true,
        data: { message: "Notification token stored" },
      });
    }
    return NextResponse.json({
      success: false,
      error: "operation failed",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
