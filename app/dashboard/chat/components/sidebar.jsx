"use client";
import React, { useContext, useState } from "react";
import { UserContext } from "../../authcompo/authContxt";
import Link from "next/link";

export default function SidebarChat() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const getInitial = (name) => name.charAt(0).toUpperCase();
  const userdetails = useContext(UserContext);
  console.log(
    "chat userdetails : ",
    userdetails,
    userdetails?.details?.user?.friends
    // userdetails.details?.user?._id,
    // userdetails.details?.user?.username,
    // userdetails.details?.user?.receivedRequests
  );
  async function setChatId(id) {
    let res = await fetch(`http://localhost:3000/api/chats/${id}`, {
      credentials: "include",
      method: "POST",
    });
    let data = await res.json();
    console.log("**** chat creation reply ** ", data);
  }
  return (
    <div
      className={`${
        selectedFriend ? "hidden md:flex" : "flex"
      } flex-col border-r border-gray-100 bg-white`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Messages
        </h2>
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search friends..."
            className="w-full bg-gray-100 border-none rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-1 custom-scrollbar">
        {userdetails?.details?.user?.friends?.map((friend) => (
          <Link
            href={`/dashboard/chat/${friend._id}`}
            key={friend._id}
            onClick={() => setChatId(friend._id)}
            className={`flex items-center gap-4 p-4 cursor-pointer rounded-2xl transition-all duration-200 ${
              selectedFriend?._id === friend._id
                ? "bg-indigo-50 shadow-sm"
                : "hover:bg-gray-50"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 transition-transform ${
                selectedFriend?._id === friend._id
                  ? "bg-indigo-600 scale-105"
                  : "bg-gray-400"
              }`}
            >
              {getInitial(friend.username)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <h3
                  className={`font-semibold truncate ${
                    selectedFriend?._id === friend._id
                      ? "text-indigo-900"
                      : "text-gray-800"
                  }`}
                >
                  {friend.username}
                </h3>
                <span className="text-[10px] text-gray-400 uppercase font-medium">
                  {/* {friend.time} */}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate mt-0.5">
                {/* {friend.lastMsg} */}
              </p>
            </div>
            {friend.unread > 0 && (
              <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                {/* {friend.unread} */}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
