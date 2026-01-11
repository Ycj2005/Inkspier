"use client";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function RequestSentbtn({ id }) {
  const router = useRouter();
  const [sentreq, setSentreq] = useState(false);
  const sentRequest = async () => {
    setSentreq(true);
    let res = await fetch(`http://localhost:3000/api/friends/requets/${id}`, {
      method: "POST",
    });
    const resdata = await res.json();
    toast.success(resdata.msg);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    // console.log("**** friendreq : ", resdata);
  };
  return (
    <button
      disabled={sentreq}
      onClick={() => sentRequest()}
      //   disabled={addedIds.includes(user.id)}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all bg-blue-600 text-white hover:bg-blue-700 active:scale-95
                   `}
    >
      {/* {addedIds.includes(user._id) ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" /> Added
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" /> Add Friend
                      </>
                      )} */}
      <UserPlus className="w-3.5 h-3.5" /> Add Friend
    </button>
  );
}
