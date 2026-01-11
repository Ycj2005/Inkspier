"use client";
import { useEffect, useState } from "react";
import { UserContext } from "../authcompo/authContxt";

export default function UserDetailProvider({ children }) {
  const [details, setDetails] = useState(null);
  useEffect(() => {
    const getuser = async () => {
      let res = await fetch("http://localhost:3000/api/user", {
        credentials: "include",
      });
      let data = await res.json();
      setDetails(data);
    };
    getuser();
  }, []);
  return (
    <UserContext.Provider value={{ details }}>{children}</UserContext.Provider>
  );
}
