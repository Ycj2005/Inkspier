import { DBConnection } from "@/app/db/dbConn";
import Chat from "@/app/db/schemas/chatSchema";
import Message from "@/app/db/schemas/messageSchema";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req, { params }) {
  try {
    await DBConnection();
    const chatid = params.chatId;
    const cookieStore = cookies();
    const tokenObj = cookieStore.get("token");

    if (!tokenObj) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(tokenObj.value, process.env.AUTH_SECRET);

    const userId = decoded.userId;

    const chat = await Chat.findById(chatid);
    if (!chat.participants.includes(userId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const messages = await Message.find({ chatid })
      .populate("user", "username email")
      .sort({ createdAt: 1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.log("message error : ", error);
    return NextResponse.json({
      status: 500,
      msg: "internal server error",
    });
  }
}
