import { getAllBlogs } from "@/actions/getAllblogs";
import { limit } from "@/lib/constants";
import dbConnect from "@/lib/dbConnect";
import { getUserIdFromAuth } from "@/lib/serverCookies";
import Blog from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams;

    const skip = Number(query.get("skip") || 0);
    const _limit = Number(query.get("limit") || limit);
    const data = await getAllBlogs(skip, _limit);
    return NextResponse.json({
      success: true,
      limit: _limit,
      skip,
      data,
    });
  } catch (error: any) {
    console.log(error);
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
    if (!myid) {
      return NextResponse.json({
        success: false,
        error: "Not Authenticated",
      });
    }

    // get the required fields
    let { slug, content } = await requeest.json();
    slug = slug.toLowerCase().trim().replaceAll(" ", "-") + "-" + Date.now();

    // checck of required fields are provided in the body
    if (!slug || !content) {
      return NextResponse.json({
        success: false,
        error: "slug and content are required",
      });
    }
    await dbConnect();
    const data = await Blog.create({
      slug,
      content,
      by: myid,
    });
    if (data) {
      return NextResponse.json({
        success: true,
        data: { message: "Blog Added" },
      });
    }
    return NextResponse.json({
      success: false,
      error: "Blog post failed",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
