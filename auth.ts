import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();


export const NAuth = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  secret: 'secret',
  callbacks: {
    authorized({ request, auth }) {
      try {
        const { pathname } = request.nextUrl;
        if (pathname === "/main") return !!auth; //ログインしているユーザーだけ見れるページだよ。
        return true; //ログインしてなくても取りあえず全ページ見れるよ。
      } catch (err) {
        console.log(err);
      }
    },
    jwt({ token, trigger, session }) {
      // console.log(token);
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
  },
});

export const { handlers, auth, signIn, signOut } = NAuth;