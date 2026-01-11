import { DBConnection } from "@/app/db/dbConn";
import Chat from "@/app/db/schemas/chatSchema";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/db/schemas/userSchema";
export async function POST(req, { params }) {
  try {
    await DBConnection();
    const cookieStore = cookies();
    const tokenObj = cookieStore.get("token");

    if (!tokenObj) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(tokenObj.value, process.env.AUTH_SECRET);

    const userId = decoded.userId;
    const friendId = params.friendId;

    const user = await User.findById(userId);
    if (!user.friends.includes(friendId)) {
      return NextResponse.json({ message: "Not friends" }, { status: 403 });
    }

    let chat = await Chat.findOne({
      participants: { $all: [userId, friendId] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [userId, friendId],
      });
    }
    return NextResponse.json(chat);
  } catch (error) {
    console.log("chat error : ", error);
    return NextResponse.json({
      status: 500,
      msg: "internal server error",
    });
  }
}
