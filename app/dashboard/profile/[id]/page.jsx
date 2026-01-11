"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Settings,
  Grid,
  Bookmark,
  Tag,
  MapPin,
  Link as LinkIcon,
  Mail,
} from "lucide-react";
import PostCard from "../../component/postcard"; // Importing your styled PostCard
import DummyCard from "../../component/dummycard";
import { useParams } from "next/navigation";
import Loading from "../../component/loader";

const dummyUser = {
  name: "Alex Rivell",
  email: "alex.rivell@design.com",
  bio: "Digital Artist & UI/UX Enthusiast. Capturing light through a lens and code. ✨",
  location: "San Francisco, CA",
  website: "rivell.design",
  stats: { posts: 142, followers: "12.5k", following: 840 },
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
  cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
};

export default function ProfilePage() {
  const { id } = useParams();
  const [isloading, setIsloading] = useState(true);
  const [userdata, setUserData] = useState([]);
  const [postdata, setPostData] = useState([]);
  console.log("profile id is :", id);
  useEffect(() => {
    let fetchuserspost = async () => {
      let res = await fetch(`http://localhost:3000/api/user/${id}/posts`);
      let data = await res.json();
      console.log("***** all  post related to this user : ", data);
      setUserData(data?.data[0].user);
      setPostData(data?.data);
      setIsloading(false);
    };
    fetchuserspost();
  }, []);
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
              {/* <div className="flex gap-2 pb-2">
                <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold text-sm transition-all shadow-md shadow-indigo-200">
                  Edit Profile
                </button>
                <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-all shadow-sm">
                  <Settings size={20} className="text-gray-600" />
                </button>
              </div> */}
            </div>

            {/* USER INFO */}
            <div className="text-center sm:text-left space-y-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                  {userdata.username}
                </h1>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1 mt-1">
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Mail size={14} /> {userdata.email}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <MapPin size={14} /> {dummyUser.location}
                  </span>
                  <a
                    href="#"
                    className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:underline"
                  >
                    <LinkIcon size={14} /> {dummyUser.website}
                  </a>
                </div>
              </div>

              <p className="max-w-xl text-gray-700 leading-relaxed text-sm sm:text-base">
                {dummyUser.bio}
              </p>

              {/* STATS BAR */}
              <div className="flex justify-center sm:justify-start gap-8 py-4 border-y border-gray-100 mt-6">
                <div className="text-center sm:text-left">
                  <span className="block font-bold text-gray-900 text-lg">
                    {dummyUser.stats.posts}
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                    Posts
                  </span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="block font-bold text-gray-900 text-lg">
                    {dummyUser.stats.followers}
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                    Followers
                  </span>
                </div>
                <div className="text-center sm:text-left">
                  <span className="block font-bold text-gray-900 text-lg">
                    {dummyUser.stats.following}
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                    Following
                  </span>
                </div>
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
                    username={userdata.username}
                    description={post.description}
                    image={post.image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
