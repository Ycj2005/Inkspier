import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(req) {
  const AUTH_PAGES = ["/", "/register"];
  const BACKEND_AUTH_PAGES = [
    "/api",
    "/api/register",
    "/api/login",
    "/api/user",
  ];
  console.log("middleware is running....");
  //   console.log("**********" + req.url + "*********");
  let token = req.cookies.get("token")?.value;
  //allowing login and register page without token
  const pathname = req.nextUrl.pathname;
  if (!token && (pathname === "/" || pathname === "/register")) {
    return NextResponse.next();
  }
  //if login succed then go to dashboad
  if (token && AUTH_PAGES.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  //
  if (!token && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
export const config = {
  matcher: ["/", "/register", "/dashboard/:path*", "/api/:path*"],
};
