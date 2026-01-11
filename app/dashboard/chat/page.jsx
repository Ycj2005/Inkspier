"use client";
import React, { useContext, useState } from "react";
import { UserContext } from "../authcompo/authContxt";

export default function page() {
  const [selectedFriend, setSelectedFriend] = useState(null);

  const friends = [
    {
      id: 1,
      name: "Design Team",
      lastMsg: "The new logo is ready!",
      time: "12:45 PM",
      unread: 2,
    },
    {
      id: 2,
      name: "Alex Rivera",
      lastMsg: "Did you see the latest post?",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Sarah Chen",
      lastMsg: "InkSpire is growing fast!",
      time: "Monday",
      unread: 0,
    },
    {
      id: 4,
      name: "Mike Ross",
      lastMsg: "Let’s grab coffee.",
      time: "Jan 10",
      unread: 0,
    },
  ];

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
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <svg
          className="w-10 h-10 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-800">Your Inbox</h3>
      <p className="text-gray-400 text-sm mt-2 max-w-xs">
        Select a friend from the left to start a conversation and share your
        inspirations.
      </p>
    </div>
    //   <div
    //       className={`${
    //         !selectedFriend ? "hidden md:flex" : "flex"
    //       } flex-col h-full bg-[#fdfeff]`}
    //     >
    //       {selectedFriend ? (
    //         <>
    //           {/* Chat Header */}
    //           <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
    //             <div className="flex items-center gap-4">
    //               <button
    //                 onClick={() => setSelectedFriend(null)}
    //                 className="md:hidden p-2 -ml-2 text-gray-500"
    //               >
    //                 <svg
    //                   className="w-6 h-6"
    //                   fill="none"
    //                   stroke="currentColor"
    //                   viewBox="0 0 24 24"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth="2"
    //                     d="M15 19l-7-7 7-7"
    //                   />
    //                 </svg>
    //               </button>
    //               <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
    //                 {getInitial(selectedFriend.username)}
    //               </div>
    //               <div>
    //                 <h3 className="font-bold text-gray-800 leading-none">
    //                   {selectedFriend.username}
    //                 </h3>
    //                 <span className="text-[11px] text-green-500 font-medium uppercase tracking-wider">
    //                   Online
    //                 </span>
    //               </div>
    //             </div>
    //           </div>

    //           {/* Messages Container */}
    //           <div className="flex-1 overflow-y-auto p-6 space-y-6">
    //             {/* Received */}
    //             <div className="flex items-end gap-3 max-w-[80%]">
    //               <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm text-gray-700 text-sm leading-relaxed">
    //                 Hey! I just saw the design you posted on InkSpire. It looks
    //                 incredible. How did you handle the spacing?
    //               </div>
    //             </div>

    //             {/* Sent */}
    //             <div className="flex items-end gap-3 max-w-[80%] ml-auto flex-row-reverse">
    //               <div className="bg-indigo-600 p-4 rounded-2xl rounded-br-none shadow-lg shadow-indigo-100 text-white text-sm leading-relaxed">
    //                 Thanks! I used a 4px grid system and kept the line-height
    //                 around 1.6 for readability.
    //               </div>
    //             </div>
    //           </div>

    //           {/* Action Bar */}
    //           <div className="p-6 bg-white border-t border-gray-100">
    //             <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
    //               <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
    //                 <svg
    //                   className="w-6 h-6"
    //                   fill="none"
    //                   stroke="currentColor"
    //                   viewBox="0 0 24 24"
    //                 >
    //                   <path
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth="2"
    //                     d="M12 4v16m8-8H4"
    //                   />
    //                 </svg>
    //               </button>
    //               <input
    //                 type="text"
    //                 placeholder="Write a message..."
    //                 className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400"
    //               />
    //               <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all active:scale-95">
    //                 Send
    //               </button>
    //             </div>
    //           </div>
    //         </>
    //       ) : (

    //       )}
    //     </div>
  );
}
