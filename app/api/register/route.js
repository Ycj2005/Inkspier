import User from "@/app/db/schemas/userSchema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { DBConnection } from "@/app/db/dbConn";
DBConnection();
export async function POST(req, res) {
  const formdata = await req.formData();
  const email = formdata.get("email");
  const username = formdata.get("username");
  const password = formdata.get("password");
  // console.log("from register route : ", email, username, password);
  try {
    let hashedpass = await bcrypt.hash(password, 10);
    console.log("hashed password.... ", hashedpass);
    const emailAlreadyExist = await User.findOne({ email: email });
    if (emailAlreadyExist) {
      return NextResponse.json({
        status: 301,
        msg: "This email is already taken try with another one",
      });
    }

    let res = await User.create({
      email: email,
      username: username,
      password: hashedpass,
      isProfileComplete: false,
    });
    if (res) {
      return NextResponse.json({
        status: 200,
        msg: "You registered succesfully",
        data: res,
      });
    }
    return NextResponse.json({
      status: 401,
      msg: "Youre not registered succesfully",
    });
  } catch (error) {
    console.log("error register route : ", error);
    return NextResponse.json({
      status: 500,
      msg: "this is error message : ",
      errmsg: error,
    });
  }
}
