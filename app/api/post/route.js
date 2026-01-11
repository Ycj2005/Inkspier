import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { DBConnection } from "@/app/db/dbConn";
import User from "@/app/db/schemas/userSchema";
import cloudinary from "@/app/db/cloudinary.config";
import post from "@/app/db/schemas/postSchema";

export async function POST(req) {
  try {
    await DBConnection();

    const cookieStore = cookies();
    const tokenObj = cookieStore.get("token");

    if (!tokenObj) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(tokenObj.value, process.env.AUTH_SECRET);

    const userId = decoded.userId;

    const userExist = await User.findById(userId).select("-password");
    if (!userExist) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const img = formData.get("image");
    const description = formData.get("description");

    if (!img || !description) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const bytes = await img.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const upload = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream({ folder: "posts" }, (error, result) => {
          if (error) reject(error);
          resolve(result);
        })
        .end(buffer);
    });

    const dbUpload = await post.create({
      description: description,
      image: upload.secure_url,
      user: userId,
      likes: [],
    });
    if (dbUpload) {
      return NextResponse.json({
        status: 200,
        message: "Post created",
      });
    }
  } catch (error) {
    console.error("POST ERROR:", error); // 👈 ADD THIS
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}

export async function GET(req) {
  try {
    await DBConnection();
    const data = await post
      .find()
      .populate("user", "username email")
      .sort({ createdAt: -1 });
    console.log("****** check post data terminal ***** : ", data);
    if (data) {
      return NextResponse.json({
        status: 200,
        msg: "data : ",
        data: data,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      msg: "Post Data was Not found",
    });
  }
}
