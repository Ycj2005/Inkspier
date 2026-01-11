import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-36 h-36 border-8 rounded-full border-t-slate-900 border-b-slate-900 animate-spin"></div>
    </div>
  );
}
