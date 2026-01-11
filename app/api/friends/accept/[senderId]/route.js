import { DBConnection } from "@/app/db/dbConn";
import User from "@/app/db/schemas/userSchema";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
export async function POST(req, { params }) {
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
    const receiverid = decoded.userId;
    const senderid = params.senderId;
    const receiver = await User.findById(receiverid);
    const sender = await User.findById(senderid);

    receiver.receivedRequests.pull(senderid);
    sender.sentRequests.pull(receiverid);

    receiver.friends.push(senderid);
    sender.friends.push(senderid);

    await receiver.save();
    await sender.save();

    return NextResponse.json({
      status: 200,
      msg: "New friend added Successfully",
    });
  } catch (error) {
    console.log("error is : ", error);
    return NextResponse.json({
      status: 500,
      msg: "Internal Server Error",
    });
  }
}
