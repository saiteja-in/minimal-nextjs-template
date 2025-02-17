import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./actions/user";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
  unstable_update,
} = NextAuth({
  callbacks: {
    async jwt({ token }) {
      // console.log({ token });
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
    async session({ token, session }) {
      // console.log({token})
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    // async session({ token, session }) {
    //   // console.log({
    //   //   sessionToken: token,
    //   // });
    //   if (token.sub && session.user) {
    //     session.user.id = token.sub;
    //   }
    //   if (token.role && session.user) {
    //     // session.user.role = token.role as UserRole;
    //   }
    //   if(session.user){
    //     session.user.name=token.name ;
    //     session.user.email=token.email as string;
    //     // session.user.isOAuth=token.isOAuth as boolean
    //   }
    //   return session;
    // },
  },
  pages: {
    error: "/auth/error",
  },
  adapter: PrismaAdapter(db), // ✅ Automatically saves users to the database
  session: { strategy: "jwt" },
  ...authConfig,
});
