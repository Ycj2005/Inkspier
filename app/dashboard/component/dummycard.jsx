"use client";

import Image from "next/image";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export default function DummyCard({ image, description, username }) {
  let small = username;
  let split = small.split(" ");
  console.log("small ", split[0].charAt(0));
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-all">
      {/* HEADER */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
          {username.split(" ")[0].charAt(0)}{" "}
          {username.split(" ")[1]?.charAt(0) | ""}
        </div>
        <span className="font-bold text-sm text-gray-800">{username}</span>
      </div>

      {/* DESCRIPTION */}
      <div className="px-4 pb-3">
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {/* IMAGE */}
      <div className="relative w-full aspect-[3] bg-gray-50">
        <img src={image} alt="Post content" fill className="object-cover" />
      </div>

      {/* MINI ACTIONS */}
      <div className="p-4 flex items-center justify-between mt-auto">
        <div className="flex gap-4">
          <Heart
            size={20}
            className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
          />
          <MessageCircle
            size={20}
            className="text-gray-400 hover:text-indigo-500 cursor-pointer transition-colors"
          />
        </div>
        <Share2
          size={18}
          className="text-gray-400 hover:text-green-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
