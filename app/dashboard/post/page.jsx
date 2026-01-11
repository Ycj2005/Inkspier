"use client";
import { Earth, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const router = useRouter();
  const [current, setCurrent] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [description, setDescription] = useState("");
  function handleChange(e) {
    setCurrent(e.target.files[0]);
    let files = e.target.files[0];
    let selected = URL.createObjectURL(files);
    setSelectedImage(selected);
  }
  const handlePost = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    formdata.append("image", current);
    formdata.append("description", description);
    const res = await fetch("http://localhost:3000/api/post", {
      method: "POST",
      body: formdata,
    });
    const resdata = await res.json();
    console.log("********** res *******", resdata);
    if (resdata.status === 200) {
      toast.success("Post is Created");
      router.push("/dashboard");
    }
  };
  return (
    <div className="w-[90%] mx-auto p-2">
      <form
        onSubmit={handlePost}
        className="w-[90%] sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto flex  flex-col items-start gap-3 p-4 border-2 border-black rounded-md mt-8 shadow-lg"
      >
        <div className="font-semibold text-xl">Create Post :-)</div>
        <div className="mx-auto">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="post image"
              className="w-64 h-64 object-cover border-black rounded-md cursor-pointer"
            />
          )}
          <label
            htmlFor="upload"
            className="flex items-center flex-col gap-1.5"
          >
            <span>Upload your image</span>
            <Plus
              size={18}
              color="black"
              className="w-10 h-10 p-2 border border-black cursor-pointer rounded-full transition duration-300 hover:bg-black/5"
            />
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full flex flex-col items-start gap-1.5">
          <label htmlFor="description">description :</label>
          <textarea
            rows={4}
            value={description}
            className="w-full px-2 py-2 border-2 border-black rounded-md focus:outline-none"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md cursor-pointer border border-black bg-black/80 text-white transition duration-500 hover:bg-slate-50 hover:text-black focus:border focus:border-white">
            <span>Post Data</span>
            <Earth className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
