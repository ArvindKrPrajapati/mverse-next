import { getNotifications } from "@/actions/getNotifications";
import { limit } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import NotificationModel from "@/models/notification.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;
    const myid = getUserIdFromAuth(request);

    if (!myid) {
      return NextResponse.json({
        success: false,
        error: "Not Authenticated",
      });
    }

    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);
    const data = await getNotifications(skip, _limit, myid);
    // const data = await NotificationModel.find({ receiverId: myid })
    //   .skip(skip)
    //   .limit(_limit);

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

export async function PATCH(requeest: Request) {
  try {
    // get myid if i am login
    const myid = getUserIdFromAuth(requeest);

    // if i am not login then throw an error
    if (!myid) {
      return NextResponse.json({
        success: false,
        error: "login to upload",
      });
    }

    await dbConnect();
    const data = await NotificationModel.updateMany(
      {
        receiverId: myid,
      },
      {
        seen: true,
      }
    );

    if (data) {
      return NextResponse.json({
        success: true,
        data: { message: "Notification marked seen" },
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
