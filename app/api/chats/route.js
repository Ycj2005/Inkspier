import { DBConnection } from "@/app/db/dbConn";
import Chat from "@/app/db/schemas/chatSchema";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(req) {
  try {
    await DBConnection();
    const cookieStore = cookies();
    const tokenObj = cookieStore.get("token");

    if (!tokenObj) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(tokenObj.value, process.env.AUTH_SECRET);

    const userId = decoded.userId;

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
