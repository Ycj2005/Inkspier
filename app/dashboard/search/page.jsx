"use client";

import React, { useState, useMemo, useEffect, useContext } from "react";
import { Search, UserPlus, UserCheck, UserRoundCheck } from "lucide-react";
import RequestSentbtn from "./requestSentbtn";
import { UserContext } from "../authcompo/authContxt";

// Sample User Data
const USERS = [
  { id: 1, firstName: "John", lastName: "Doe", username: "johndoe22" },
  { id: 2, firstName: "Sarah", lastName: "Smith", username: "sarah_designer" },
  { id: 3, firstName: "Michael", lastName: "Brown", username: "mike_b" },
  { id: 4, firstName: "Emma", lastName: "Wilson", username: "em_wilson" },
];

export default function page() {
  const [query, setQuery] = useState("");
  const [addedIds, setAddedIds] = useState([]);
  const yourid = useContext(UserContext);
  console.log("context through  : ", yourid?.details?.user);
  useEffect(() => {
    let getdata = async () => {
      let res = await fetch(
        `http://localhost:3000/api/user/search?q=${query}`,
        {
          method: "GET",
        }
      );
      let data = await res.json();
      // console.log("queury response ", data);
      setAddedIds(data);
    };
    getdata();
    console.log(addedIds);
  }, [query]);
  return (
    <div className="max-w-[90%] mx-auto p-2 sm:p-6 mt-0 bg-white shadow-xl rounded-2xl border border-gray-100">
      
      <h2 className="text-xl font-bold text-gray-800 mb-4">Find Friends</h2>

      {/* Search Input Group */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search name or @username..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Results List */}
      <div className="mt-4 space-y-2">
        {addedIds.length > 0
          ? addedIds.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {user.username}
                  </span>
                  <span className="text-xs text-gray-500 leading-tight">
                    @{user.username}
                  </span>
                </div>
                {!user.receivedRequests.includes(yourid?.details?.user?._id) ? (
                  <RequestSentbtn id={user._id} />
                ) : (
                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all bg-green-600 text-white hover:bg-green-700 active:scale-95">
                    <UserRoundCheck className="w-3.5 h-3.5" /> request sent
                  </button>
                )}
              </div>
            ))
          : query && (
              <p className="text-center text-sm text-gray-500 py-4 italic">
                No users found matching "{query}"
              </p>
            )}
      </div>
    </div>
  );
}
