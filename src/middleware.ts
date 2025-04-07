import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const { pathname } = req.nextUrl;

  // 🟡 Verifica primero /home_docentes
  if (pathname.startsWith("/home_docentes")) {
    if (token.role === "docente") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/unauthorized", req.url)); // Redirige a /unauthorized si no es docente
  }

  // 🔵 Luego verifica /home
  if (pathname.startsWith("/home")) {
    if (token.role === "admin") {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/unauthorized", req.url)); // Redirige a /unauthorized si no es admin
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/home/:path*", "/home_docentes", "/home_docentes/:path*"],
};
