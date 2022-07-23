import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/server/db/client";

// In development, no credentials are needed to connect to the email service (mailhog).
// In production, credentials will be needed and can be set with EMAIL_SERVER_USER
// and EMAIL_SERVER_PASSWORD environment variables.
const emailAuth =
  process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD
    ? {
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      }
    : { auth: false };

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    // ...add more providers here
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        ...emailAuth,
      },
    }),
  ],
  // Uncomment the below as required to use your own custom auth pages.
  // pages: {
  // signIn: "/auth/signin",
  // signOut: '/auth/signout',
  // error: '/auth/error', // Error code passed in query string as ?error=
  // verifyRequest: '/auth/verify-request', // (used for check email message)
  // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
};

export default NextAuth(authOptions);
