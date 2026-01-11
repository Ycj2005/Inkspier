import { DBConnection } from "@/app/db/dbConn";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/db/schemas/userSchema";
export async function POST(req, { params }) {
  try {
    await DBConnection();
    console.log("receiver id through params ******** ", params.receiverId);
    const cookiesObjectStore = cookies();
    const token = cookiesObjectStore.get("token")?.value;
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    const yourid = await User.findById(decoded.userId);
    const receiverid = await User.findById(params.receiverId);
    if (receiverid.receivedRequests.includes(yourid)) {
      return NextResponse.json({ msg: "already sentrequest", sentreq: true });
    } else {
      yourid.sentRequests.push(receiverid);
      receiverid.receivedRequests.push(yourid);
    }
    await yourid.save();
    await receiverid.save();
    return NextResponse.json({
      status: 200,
      msg: "Add Friend request send",
      sentreq: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      msg: "Internal Server Error",
    });
  }
}
