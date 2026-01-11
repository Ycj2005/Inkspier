import { DBConnection } from "@/app/db/dbConn";
import Chat from "@/app/db/schemas/chatSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await DBConnection();
    const userId = req.user.id;

    const chats = await Chat.find({
      participants: userId,
    })
      .populate("participants", "username email")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    return NextResponse.json(chats);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      msg: "internal server error",
    });
  }
}
