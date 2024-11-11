// src/types/nextauth.d.ts (or somewhere relevant)
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's role (if applicable) */
      role?: string;
    } & DefaultSession["user"];
  }
}
