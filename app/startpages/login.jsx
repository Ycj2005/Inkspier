"use client";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  let compo = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".head", {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: "power2.out",
      });

      tl.from(".navcompo", {
        opacity: 0,
        y: -30,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, compo);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    // console.log(data);

    if (data.status === 200) {
      toast.success("your login succesfull");
      router.push("/dashboard");
    } else {
      toast.error(data.error);
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
          LOGIN
        </div>
        <form
          className="w-full flex flex-col gap-4 items-start"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 w-full">
            <label className="font-bold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="border w-full p-2.5 rounded-md bg-gray-100 border-gray-300"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full text-end text-gray-500 font-semibold cursor-pointer transition duration-300 hover:text-gray-800">
            Forget Password?
          </div>
          <button
            type="submit"
            className="w-full text-center bg-black py-3 rounded-md cursor-pointer  text-white font-semibold "
          >
            LOG IN
          </button>
        </form>
        <div className="w-full flex flex-col gap-1.5 text-center">
          <div className="font-semibold text-gray-600">
            Don't have an account?
          </div>
          <Link
            href={"/register"}
            className="font-extrabold cursor-pointer text-black underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
