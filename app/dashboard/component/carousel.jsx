"use client";
import React, { useEffect, useRef, useState } from "react";
import { CarouselData } from "./fakedata";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function CarouselComponent() {
  const [isprev, setIsprev] = useState(false);
  let intervalref = useRef(null);
  const defaultimagevariant = {
    hidden: {
      opacity: 0.3,
      x: -40,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
    imgexit: { opacity: 0, x: 50 },
  };
  const previmagevariant = {
    hidden: {
      opacity: 0.3,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
    imgexit: { opacity: 0, x: -50 },
  };
  const [count, setcount] = useState(0);
  let total = CarouselData.length ?? 0;
  const startInterval = () => {
    if (intervalref.current) clearInterval(intervalref.current);
    intervalref.current = setInterval(() => {
      setcount((i) => (i + 1) % total);
      setIsprev(false);
    }, 6000);
  };
  useEffect(() => {
    if (total === 0) return;
    startInterval();
    return () => clearInterval(intervalref.current);
  }, [total]);
  if (total === 0) return null;

  // if(!CarouselData?.length) return null;
  function handleprev(e) {
    setIsprev(true);
    e.preventDefault();
    setcount((i) => {
      const prev = i - 1;
      return prev < 0 ? total - 1 : prev;
    });
    // clearInterval(intervalref.current);
    startInterval();
  }
  function handlenext(e) {
    setIsprev(false);
    e.preventDefault();
    setcount((i) => {
      const prev = i + 1;
      return prev >= total ? 0 : prev;
    });
    // clearInterval(intervalref.current);
    startInterval();
  }
  function handlecurrent(id) {
    setcount((i) => (i = id));
    startInterval();
  }
  return (
    <div className="w-[90%] max-w-[90%] mx-auto overflow-hidden relative mt-5 px-2 md:px-4 lg:px-6">
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[16/5] flex items-center justify-center">
        <button
          className="absolute left-2 md:left-4 lg:left-6 p-2 md:p-3 lg:p-4 rounded-full shadow-xl cursor-pointer bg-white z-10"
          onClick={handleprev}
        >
          <ArrowLeft />
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={count}
            variants={isprev ? previmagevariant : defaultimagevariant}
            initial="hidden"
            animate="visible"
            exit="imgexit"
            transition={{ duration: 0.6 }}
            src={CarouselData[count].img}
            className="absolute inset-0 w-full h-full object-cover rounded-md"
          />
        </AnimatePresence>

        <button
          className="absolute right-2 md:right-4 lg:right-6 p-2 md:p-3 lg:p-4 rounded-full shadow-xl cursor-pointer bg-white z-10"
          onClick={handlenext}
        >
          <ArrowRight />
        </button>
      </div>
      <div>
        <div className="flex items-center justify-center gap-2 mt-2">
          {CarouselData.map((el, index) => (
            <button
              key={index}
              id={el.id}
              className={`p-2 border rounded-full shadow-xl ${
                el.id === count && "bg-slate-600"
              }`}
              onClick={(e) => handlecurrent(el.id)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
