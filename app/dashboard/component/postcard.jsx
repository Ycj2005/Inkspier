"use client";

import Image from "next/image";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostCard({ post }) {
  const router = useRouter();
  const [likecount, setLikecount] = useState(post.likes.length);
  const [readmore, setReadmore] = useState(false);
  const [liked, setLiked] = useState(post.likes.includes(post.userid));

  const goToProfile = () => {
    router.push(`dashboard/profile/${post.userid}`);
  };
  // console.log("***** post id : ", post.id);

  const likeHandler = async () => {
    setLiked((prev) => !prev);
    setLikecount((prev) => (liked ? prev - 1 : prev + 1));
    try {
      let res = await fetch(
        `http://localhost:3000/api/post/${post.postid}/like`,
        {
          method: "POST",
        }
      );
      let data = await res.json();
    } catch (error) {
      setLiked((prev) => !prev);
      setLikecount((prev) => (liked ? prev + 1 : prev - 1));
    }
  };
  console.log("******** post likes ** : ", post.likes);

  return (
    <div className="w-full  mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* HEADER - More Compact */}
      <div className="flex items-center justify-between px-4 py-3">
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={goToProfile}
        >
          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center overflow-hidden">
            <span className="font-bold text-xs text-indigo-600">
              {post.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[13px] leading-tight group-hover:text-indigo-600 transition-colors">
              {post.username}
            </span>
            <span className="text-[10px] text-gray-400">2 hours ago</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-black transition">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* DESCRIPTION - Tightened spacing */}
      <div className="px-4 pb-2">
        <div
          className={`text-[13px] leading-snug text-gray-700 ${
            readmore ? "line-clamp-4" : "line-clamp-2"
          }`}
        >
          {post.description}
        </div>
        <span
          className="whitespace-nowrap text-xs  text-start cursor-pointer text-orange-700 font-semibold hover:text-orange-600"
          onClick={() => setReadmore((prev) => !prev)}
        >
          {readmore ? "read less" : "read more"}
        </span>
      </div>

      {/* POST IMAGE - Reduced Height (h-60 instead of h-80) */}
      <div className="relative w-full h-60 bg-gray-50 border-y border-gray-50">
        <Image
          src={post.image}
          alt="post image"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* COMPACT ACTION BAR */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1.5 group"
            onClick={likeHandler}
          >
            <Heart
              size={20}
              className={`text-gray-500 ${
                liked && "fill-red-500"
              } group-hover:text-red-500 transition-colors`}
            />
            <span className="text-[12px] font-medium text-gray-500 group-hover:text-red-500">
              {likecount}
            </span>
          </button>
          <button className="flex items-center gap-1.5 group">
            <MessageCircle
              size={20}
              className="text-gray-500 group-hover:text-blue-500 transition-colors"
            />
            <span className="text-[12px] font-medium text-gray-500 group-hover:text-blue-500">
              8
            </span>
          </button>
        </div>
        <button className="text-gray-400 hover:text-indigo-600 transition-colors">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
}
