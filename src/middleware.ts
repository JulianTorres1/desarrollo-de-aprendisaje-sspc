import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  console.log("🚀 Middleware iniciado");

  const token = await getToken({ req, secret });


  const { pathname } = req.nextUrl;

  
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/") {
    if (token.role === "docente") {
      return NextResponse.redirect(new URL("/home_docentes", req.url));
    }
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  if (pathname.startsWith("/home_docentes")) {
    if (token.role === "docente") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/home")) {
    if (token.role === "admin") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/home_docentes/:path*", "/home/:path*"],
};
