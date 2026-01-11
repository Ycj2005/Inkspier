import { DBConnection } from "@/app/db/dbConn";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/app/db/schemas/userSchema";
export async function GET() {
  const token = cookies().get("token")?.value;
  console.log(`************ ${token} *************`);
  if (!token) {
    return NextResponse.json({
      status: 401,
      msg: "Token not exist",
    });
  }
  try {
    await DBConnection();
    let decoded = jwt.verify(token, process.env.AUTH_SECRET);
    console.log(`***********${decoded.userId}**********`);
    let user = decoded.userId;
    let userexist = await User.findById(user)
      .select("-password")
      .populate("friends", "username email")
      .populate("sentRequests", "username email")
      .populate("receivedRequests", "username email");
    if (!userexist) {
      return NextResponse.json({
        status: 401,
        msg: "User not exist",
      });
    }
    return NextResponse.json({ user: userexist, authorized: true });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      msg: "id data not found",
    });
  }
}
