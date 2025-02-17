export { auth as middleware } from "@/auth"
import { publicRoutes,DEFAULT_LOGIN_REDIRECT,apiAuthPrefix,protectedRoutes, authRoutes } from "./routes";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
const {auth} =NextAuth(authConfig)
export default auth((req) => {
  const {nextUrl} = req;
  const isLoggedIn= !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  if(isApiAuthRoute){
    return;
  }
  if(isAuthRoute){
    if(isLoggedIn){
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
