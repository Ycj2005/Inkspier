import React from "react";
import toast from "react-hot-toast";

export default function AddfriendBtn({ id }) {
  const handleAddFriend = async () => {
    let res = await fetch(`http://localhost:3000/api/friends/accept/${id}`, {
      method: "POST",
    });
    let data = await res.json();
    console.log(data);
    if (data.status === 200) {
      toast.success(data.msg);
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
  };
  return (
    <button
      className="px-3 py-1 text-sm rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
      onClick={handleAddFriend}
    >
      Accept
    </button>
  );
}
