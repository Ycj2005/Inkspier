import { DBConnection } from "@/app/db/dbConn";
import User from "@/app/db/schemas/userSchema";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(req) {
  try {
    await DBConnection();
    const cookieObjectStore = cookies();
    const token = cookieObjectStore.get("token")?.value;
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    console.log("search user id is : ", decoded.userId);
    const query = req.nextUrl.searchParams.get("q");
    if (!query) {
      let data = await User.find({
        _id: { $nin: decoded.userId },
      }).select("username email receivedRequests sentRequests");
      return NextResponse.json(data);
    }
    let searchdata = await User.find({
      username: { $regex: query, $options: "i" },
      _id: { $nin: decoded.userId },
    }).select("username email receivedRequests sentRequests");
    return NextResponse.json(searchdata);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      msg: "Internal server err",
    });
  }
}
