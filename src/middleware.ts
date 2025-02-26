import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/firebase";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Read the token from cookies

  if (!token && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if no token
  }

  return NextResponse.next();
}

// Only apply middleware to admin routes
export const config = {
  matcher: ["/admin/:path*"], // Only protect admin routes
};
