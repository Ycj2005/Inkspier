"use client";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  let compo = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline();
      tl.from(".head", {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: "power2.out",
      });
      tl.from(".navcompo", {
        opacity: 0,
        y: -30,
        duration: 0.5,
        stagger: 0.3,
        ease: "power2.out",
      });
    }, compo);
    return () => ctx.revert();
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    console.log("formdata : ", formData);
    let res = await fetch(`http://localhost:3000/api/register`, {
      method: "POST",
      body: formData,
    });
    let data = await res.json();
    console.log("register response : ", data);
    if (data.status === 200) {
      toast.success("you registered succesfully");
      router.push("/");
    } else if (data.status === 301) {
      toast.error(data.msg);
    } else {
      toast.error(data.msg);
    }
  }
  return (
    <div
      className="w-full h-screen p-4 flex flex-col items-center relative"
      ref={compo}
    >
      <nav className="w-full flex items-center justify-between">
        <div className="font-bold text-3xl cursor-pointer tracking-tighter head">
          InkSpire
        </div>
        <div className="flex items-center justify-center gap-3.5 font-medium text-base">
          <div className="font-semibold text-xs sm:text-xs md:text-base lg:text-base cursor-pointer navcompo">
            Magzine
          </div>
          <div className="font-semibold text-xs sm:text-xs md:text-base lg:text-base cursor-pointer navcompo">
            Authors
          </div>
          <div className="font-semibold text-xs sm:text-xs md:text-base lg:text-base cursor-pointer navcompo">
            Podcast
          </div>
        </div>
      </nav>
      <div className="w-[90%] sm:w-[90%] md:w-[70%] lg:w-[50%] h-full flex flex-col items-start justify-center gap-7 px-2.5">
        <div className="w-full text-4xl sm:text-4xl md:text-5xl lg:text-5xl tracking-wide font-semibold text-center sm:text-center md:text-start lg:text-start">
          Register
        </div>
        <form
          className="w-full flex flex-col gap-4 items-start"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 w-full">
            <label className="font-bold" htmlFor="name">
              username
            </label>
            <input
              type="text"
              className="border w-full p-2.5 rounded-md bg-gray-100 border-gray-300"
              name="username"
              id="name"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="border w-full p-2.5 rounded-md bg-gray-100 border-gray-300"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label className="font-bold" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="border w-full p-2.5 rounded-md bg-gray-100 border-gray-300"
              name="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            className="w-full text-center bg-black py-3 rounded-md cursor-pointer  text-white font-semibold "
          >
            Create new User
          </button>
        </form>
        <div className="w-full flex flex-col gap-1.5 text-center">
          <div className="font-semibold text-gray-600">
            I already have an account?
          </div>
          <Link
            href={"/"}
            className="font-extrabold cursor-pointer text-black underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
