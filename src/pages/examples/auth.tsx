import { NextPage } from "next";
import { AuthHeader } from "@/components/examples/auth/auth-header";
import { useSession } from "next-auth/react";
import React from "react";

const Auth: NextPage = () => {
  const { status: authStatus } = useSession();
  return (
    <div>
      <AuthHeader authenticated={authStatus === "authenticated"} />
      <main className="mx-auto max-w-7xl py-6 px-10">
        <h1 className="mb-10 text-3xl font-extrabold text-slate-800">Examples - Auth</h1>
        <div className="max-w-3xl">
          <p className="mb-3">
            On this page, you can find examples related to authentication with NextAuth.js.
          </p>
          <p className="mb-3">
            You can click the links at the top to access examples of protected pages. These pages can only be
            accessed if signed-in. When not signed-in, they redirect to the sign-in page.
          </p>
          <p className="mb-3">
            The examples show the different patterns of protecting pages with Next.js - client-side,
            server-side or using middleware. For more information see:
          </p>
          <ul className="ml-7 mb-3 list-disc">
            <li className="mb-1">
              <a
                className="cursor-pointer text-indigo-600"
                href="https://next-auth.js.org/tutorials/securing-pages-and-api-routes"
                target="_blank"
                rel="noreferrer"
              >
                NextAuth.js - Securing pages and API routes
              </a>
            </li>
            <li>
              <a
                className="cursor-pointer text-indigo-600"
                href="https://nextjs.org/docs/authentication"
                target="_blank"
                rel="noreferrer"
              >
                Next.js - Authentication
              </a>
            </li>
          </ul>
          <p className="mb-3">
            For an example of how to protect API routes, see <code>src/pages/api/examples/restricted.ts</code>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Auth;
