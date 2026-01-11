"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../authcompo/authContxt";
import Msgsentform from "../components/msgsentform";

export default function page() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const getInitial = (name) => name.charAt(0).toUpperCase();
  useEffect(() => {
    const fetchChats = async () => {
      const res = await fetch("http://localhost:3000/api/chats");
      const data = await res.json();
      console.log("Chats:", data);
      setChats(data);
    };

    fetchChats();
  }, []);
  let chatid = chats[0]?._id;

  useEffect(() => {
    // if (!chats[0]?._id) return;

    const fetchMessages = async () => {
      const res = await fetch(`http://localhost:3000/api/messages/${chatid}`);
      const data = await res.json();
      console.log("Messages:", data);
      setMessages(data);
    };

    fetchMessages();
  }, [chatid !== undefined]);
  console.log("Messages:", messages);
  console.log("chatdata catched in usestate : ", chats);
  return (
    <div className={`flex flex-col h-full bg-[#fdfeff]`}>
      <>
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedFriend(null)}
              className="md:hidden p-2 -ml-2 text-gray-500"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              {/* {getInitial(selectedFriend.username)} */} u
            </div>
            <div>
              <h3 className="font-bold text-gray-800 leading-none">
                {/* {selectedFriend.username} */} username
              </h3>
              <span className="text-[11px] text-green-500 font-medium uppercase tracking-wider">
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Received */}
          {/* <div className="flex items-end gap-3 max-w-[80%]">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm text-gray-700 text-sm leading-relaxed">
              Hey! I just saw the design you posted on InkSpire. It looks
              incredible. How did you handle the spacing?
            </div>
          </div> */}

          {/* Sent */}
          {/* <div className="flex items-end gap-3 max-w-[80%] ml-auto flex-row-reverse">
            <div className="bg-indigo-600 p-4 rounded-2xl rounded-br-none shadow-lg shadow-indigo-100 text-white text-sm leading-relaxed">
              Thanks! I used a 4px grid system and kept the line-height around
              1.6 for readability.
            </div>
          </div> */}
        </div>

        {/* Action Bar */}
        <Msgsentform chatid={chats[0]?._id} />
      </>
    </div>
  );
}
