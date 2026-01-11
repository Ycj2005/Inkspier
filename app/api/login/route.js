import { DBConnection } from "@/app/db/dbConn";
import User from "@/app/db/schemas/userSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(req) {
  DBConnection();
  const { email, password } = await req.json();
  console.log("login request : ", email, password);
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 401,
        error: "Invalid Credentials",
      });
    }
    console.log("user is found...");
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({
        status: 401,
        error: "Invalid Credentials",
      });
    }
    console.log("password also match...");
    const token = jwt.sign({ userId: user._id }, process.env.AUTH_SECRET, {
      expiresIn: "7d",
    });
    console.log("token.... ", token);
    const response = NextResponse.json({
      status: 200,
      msg: "Login Succesfull",
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json({
      msg: "this is error message : ",
      errmsg: error,
    });
  }
}
