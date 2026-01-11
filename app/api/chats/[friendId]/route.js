import { DBConnection } from "@/app/db/dbConn";
import Chat from "@/app/db/schemas/chatSchema";
import { User } from "lucide-react";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await DBConnection();
    const userId = req.user.id;
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
    return NextResponse.json({
      status: 500,
      msg: "internal server error",
    });
  }
}
