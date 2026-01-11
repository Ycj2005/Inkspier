import { DBConnection } from "@/app/db/dbConn";
import Post from "@/app/db/schemas/postSchema";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await DBConnection();
    let userId = params.id;
    let posts = await Post.find({ user: userId }).populate(
      "user",
      "email username"
    );
    return NextResponse.json({
      status: 200,
      msg: "data : ",
      data: posts,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      msg: "Internal Server Err",
    });
  }
}
