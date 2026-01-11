"use client";
import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserContext } from "../authcompo/authContxt";
import DummyCard from "../component/dummycard";
import Loading from "../component/loader";
import {
  Bookmark,
  Grid,
  Handshake,
  LinkIcon,
  Mail,
  MapPin,
  Settings,
  Tag,
  UserRoundCheck,
} from "lucide-react";
import Image from "next/image";
import AddfriendBtn from "./addfriendBtn";

export default function page() {
  const userdetails = useContext(UserContext);
  console.log(
    "profile userdetails : ",
    userdetails,
    userdetails.details,
    userdetails.details?.user?._id,
    userdetails.details?.user?.username,
    userdetails.details?.user?.receivedRequests
  );
  const [postdata, setPostData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [openRequests, setOpenRequests] = useState(false);
  const [openSentRequests, setOpenSentRequests] = useState(false);
  const [openFriends, setOpenFriends] = useState(false);

  const dummyUser = {
    name: "Alex Rivell",
    email: "alex.rivell@design.com",
    bio: "Digital Artist & UI/UX Enthusiast. Capturing light through a lens and code. ✨",
    location: "San Francisco, CA",
    website: "rivell.design",
    stats: { posts: 142, followers: "12.5k", following: 840 },
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
    cover:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
  };
  const userid = userdetails.details?.user?._id;
  const username = userdetails.details?.user?.username;
  useEffect(() => {
    if (!userid) {
      return;
    }
    let fetchuserspost = async () => {
      let res = await fetch(`http://localhost:3000/api/user/${userid}/posts`);
      let data = await res.json();
      console.log("***** all  post related to this user : ", data);
      setPostData(data?.data);
      setIsloading(false);
    };
    fetchuserspost();
  }, [userid]);
  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <div className="min-h-screen w-[90%] mx-auto bg-gray-50/50 pb-20">
          {/* COVER IMAGE */}
          <div className="relative h-48 sm:h-64 lg:h-80 w-full overflow-hidden">
            <Image
              src={dummyUser.cover}
              alt="cover"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* PROFILE HEADER SECTION */}
          <div className="max-w-5xl mx-auto px-4">
            <div className="relative -mt-16 sm:-mt-24 mb-6 flex flex-col items-center sm:items-end sm:flex-row sm:justify-between gap-4">
              {/* Avatar with Ring */}
              <div className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                <Image
                  src={dummyUser.avatar}
                  alt="avatar"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pb-2">
                <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold text-sm transition-all shadow-md shadow-indigo-200">
                  Edit Profile
                </button>
                <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all shadow-sm">
                  <Settings size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* USER INFO */}
            <div className="text-center sm:text-left space-y-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                  {userdetails?.details?.user?.username}
                </h1>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1 mt-1">
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Mail size={14} /> {userdetails?.details?.user?.email}
                  </span>
                </div>
              </div>

              {/* <p className="max-w-xl text-gray-700 leading-relaxed text-sm sm:text-base">
                {dummyUser.bio}
              </p> */}

              {/* STATS BAR */}
              <div className="flex justify-center sm:justify-start gap-8 py-4 border-y border-gray-100 mt-6">
                <button
                  className="text-center sm:text-left"
                  onClick={() => setOpenFriends(true)}
                >
                  <span className="block font-bold text-gray-900 text-lg">
                    {userdetails?.details?.user?.friends?.length}
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                    Friends
                  </span>
                </button>
                <button
                  className="text-center sm:text-left"
                  onClick={() => setOpenRequests(true)}
                >
                  <span className="block font-bold text-gray-900 text-lg">
                    {userdetails?.details?.user?.receivedRequests?.length}
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                    see receive requests
                  </span>
                </button>
                <button
                  className="text-center sm:text-left"
                  onClick={() => setOpenSentRequests(true)}
                >
                  <span className="block font-bold text-gray-900 text-lg">
                    {userdetails?.details?.user?.sentRequests?.length}
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                    request sent
                  </span>
                </button>
              </div>
            </div>

            {/* TABS NAVIGATION */}
            <div className="flex justify-center border-b border-gray-100 mt-10 mb-8">
              <button className="flex items-center gap-2 px-8 py-3 border-b-2 border-indigo-600 text-indigo-600 font-bold text-sm">
                <Grid size={18} /> POSTS
              </button>
              <button className="flex items-center gap-2 px-8 py-3 text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors">
                <Bookmark size={18} /> SAVED
              </button>
              <button className="flex items-center gap-2 px-8 py-3 text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors">
                <Tag size={18} /> TAGGED
              </button>
            </div>

            {/* POSTS GRID - Using our responsive system */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {postdata.map((post, index) => (
                <div key={index}>
                  <DummyCard
                    key={post._id}
                    username={username}
                    description={post.description}
                    image={post.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <AnimatePresence>
        {openRequests && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpenRequests(false)}
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Friend Requests
                </h2>
                <button
                  onClick={() => setOpenRequests(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {userdetails?.details?.user?.receivedRequests?.length > 0 ? (
                  userdetails.details.user.receivedRequests.map(
                    (req, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                            {req?.username?.[0]?.toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-800">
                            {req?.username}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <AddfriendBtn id={req?._id} />
                          <button className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200">
                            Reject
                          </button>
                        </div>
                      </motion.div>
                    )
                  )
                ) : (
                  <p className="text-center text-gray-400 text-sm">
                    No pending requests
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {openFriends && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpenFriends(false)}
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Friend</h2>
                <button
                  onClick={() => setOpenFriends(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {userdetails?.details?.user?.friends?.length > 0 ? (
                  userdetails.details.user.friends.map((req, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                          {req?.username?.[0]?.toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">
                          {req?.username}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all bg-green-600 text-white hover:bg-green-700 active:scale-95">
                          <UserRoundCheck className="w-3.5 h-3.5" /> Already
                          Friends
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 text-sm">
                    No Friends Yet
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {openSentRequests && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpenSentRequests(false)}
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative bg-white w-[90%] max-w-md rounded-2xl shadow-xl p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Friend</h2>
                <button
                  onClick={() => setOpenSentRequests(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {userdetails?.details?.user?.sentRequests?.length > 0 ? (
                  userdetails.details.user.sentRequests.map((req, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                          {req?.username?.[0]?.toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">
                          {req?.username}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all bg-green-600 text-white hover:bg-green-700 active:scale-95">
                          <Handshake className="w-3.5 h-3.5" /> Sent Request
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-gray-400 text-sm">
                    No Friends Yet
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
