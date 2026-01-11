"use client";
import React, { useEffect, useState } from "react";
import CarouselComponent from "./carousel";
import PostCard from "./postcard";
import Loading from "./loader";

export default function MainFeed() {
  const [mydata, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let getdata = async () => {
      const res = await fetch("http://localhost:3000/api/post");
      const data = await res.json();
      setData(data.data);
      setLoading(false);
      console.log("******* mydata********** : ", data.data);
    };
    getdata();
  }, []);
  return (
    <div>
      {mydata.length > 0 ? (
        <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-2 gap-3 scroll-smooth">
          {mydata.map((el, index) => (
            <PostCard
              key={index}
              post={{
                userid: el.user?._id,
                postid: el._id,
                description: el.description,
                username: el.user?.username,
                image: el.image,
                likes: el.likes,
              }}
            />
          ))}
          {/* description, image, user.username */}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
