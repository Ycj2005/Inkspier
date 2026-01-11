"use client";
import React, { useState } from "react";

export default function Msgsentform({ chatid }) {
  const [text, setText] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    let res = await fetch(`http://localhost:3000/api/messages`, {
      method: "POST",
      body: JSON.stringify({
        chatId: chatid,
        text,
      }),
    });
    let data = await res.json();
    console.log("****** chat reply from backend : ", data);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white border-t border-gray-100"
    >
      <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-100 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-500/5 transition-all">
        <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Write a message..."
          name="text"
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md shadow-indigo-200 transition-all active:scale-95"
        >
          Send
        </button>
      </div>
    </form>
  );
}
