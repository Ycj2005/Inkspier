import { DBConnection } from "@/app/db/dbConn";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/app/db/schemas/userSchema";
import Post from "@/app/db/schemas/postSchema";
export async function POST(req, { params }) {
  try {
    await DBConnection();
    let cookieStore = cookies();
    let token = cookieStore.get("token");

    let decode = jwt.verify(token.value, process.env.AUTH_SECRET);
    let userId = decode.userId;
    const userexist = await User.findById(userId);
    console.log("******* which user is like  ", userexist);
    console.log("******* current post id is ", params);
    const params_postdata = await Post.findById(params.id);
    const alreadyLiked = params_postdata?.likes.includes(userId);
    if (alreadyLiked) {
      params_postdata?.likes.pull(userId);
    } else {
      params_postdata?.likes.push(userId);
    }
    await params_postdata.save();
    return NextResponse.json({
      status: 200,
      msg: alreadyLiked ? "Unliked" : "Liked",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      msg: "Internal Server",
      err: error,
    });
  }
}
