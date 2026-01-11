"use client";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CircleUser, MessageCircleMore, Plus, User } from "lucide-react";
import { UserContext } from "../authcompo/authContxt";

export default function Navbar() {
  // const userdetails = useContext(UserContext);
  // console.log(
  //   "navbar userdetails : ",
  //   // userdetails.details,
  //   // userdetails.details?.user?._id,
  //   // userdetails.details?.user?.username
  // );

  return (
    <nav className="w-[90%] mx-auto py-3 border-b-2 border-neutral-700 sticky bg-white top-0 z-50">
      <div className="w-full flex flex-col sm:flex-col md:flex-row lg:flex-row items-start md:items-center justify-between">
        <div className="font-semibold text-lg">InkSpire</div>

        <div className="flex items-center justify-between md:justify-center gap-6">
          <Link href={"/dashboard"}>Feed</Link>
          <Link
            href={"/dashboard/post"}
            className="group flex items-center text-sm justify-between md:justify-center gap-1 border px-2 py-1 border-black/60 rounded-md cursor-pointer"
          >
            <span>Post</span>
            <Plus
              size={18}
              color="black"
              className="transition duration-300 group-hover:rotate-90"
            />
          </Link>
          <Link
            className="flex items-center text-sm gap-1 p-1 border border-slate-700 rounded-lg cursor-pointer"
            href={"/dashboard/search"}
          >
            <User size={16} /> Search
          </Link>
          <Link
            className="flex items-center text-sm gap-1 p-1 border border-slate-700 rounded-lg cursor-pointer"
            href={"/dashboard/chat"}
          >
            <MessageCircleMore size={16} /> Chat
          </Link>
          <Link className="relative" href={"/dashboard/profile"}>
            <CircleUser color="#b1afaf" className="w-9 h-9" strokeWidth={1} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
