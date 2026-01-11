"use client";
import { useEffect, useState } from "react";
import Navbar from "./component/navbar";
import UserDetailProvider from "./component/userContextProvider";
import Loading from "./component/loader";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [details, showDetails] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const hideNavbar = pathname === "/dashboard/userinfo";
  // useEffect(() => {
  //   async function getdata() {
  //     let res = await fetch("http://localhost:3000/api/user", {
  //       credentials: "include",
  //     });
  //     let data = await res.json();
  //     showDetails(data);
  //     setLoading(false);
  //     setProfile(data?.user?.isProfileComplete);
  //   }
  //   getdata();
  // }, []);
  // useEffect(() => {
  //   if (!loading && profile === false) {
  //     router.push("/dashboard/userinfo");
  //   }
  // }, [loading, profile, router]);
  // console.log("profile is complete : ", profile);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <UserDetailProvider>
          <div className="min-h-screen">
            {!hideNavbar && <Navbar />}
            <Toaster/>
            <div className="overflow-x-hidden">{children}</div>
          </div>
        </UserDetailProvider>
      )}
    </>
  );
}
