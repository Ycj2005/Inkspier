import { DBConnection } from "@/app/db/dbConn";
import Chat from "@/app/db/schemas/chatSchema";
import Message from "@/app/db/schemas/messageSchema";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await DBConnection();
    const { chatId, text } = await req.json();
    console.log('chat id and text ', chatId, text);
    const cookieStore = cookies();
    const tokenObj = cookieStore.get("token");

    if (!tokenObj) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(tokenObj.value, process.env.AUTH_SECRET);

    const userId = decoded.userId;
    const chat = await Chat.findById(chatId);
    if (!chat.participants.includes(userId)) {
      return NextResponse.json({ error: "Not allowed" }, { status: 403 });
    }

    const message = await Message.create({
      chatId,
      sender: userId,
      text,
    });

    chat.updatedAt = Date.now();
    await chat.save();

    return NextResponse.json(message);
  } catch (error) {
    console.log("message error : ", error);
    return NextResponse.json({
      status: 500,
      msg: "internal server error",
    });
  }
}
