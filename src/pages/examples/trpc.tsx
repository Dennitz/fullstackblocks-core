import { NextPage } from "next";
import React from "react";
import { useSession } from "next-auth/react";
import { TrpcHeader } from "@/components/examples/trpc/trpc-header";

const Trpc: NextPage = () => {
  const { status: authStatus } = useSession();

  return (
    <div>
      <TrpcHeader authenticated={authStatus === "authenticated"} />
      <main className="mx-auto max-w-7xl py-6 px-10">
        <h1 className="mb-10 text-3xl font-extrabold text-slate-800">Examples - tRPC</h1>
        <div className="max-w-3xl">
          <p className="mb-3">
            On this page, you can find examples related to consuming your typesafe tRPC API.
          </p>
          <p className="mb-3">
            Click the links at the top of the page, for examples of a basic query, a query that requires
            authentication and a more comprehensive example with query and mutation combined.
          </p>
          <p className="mb-3">Make sure to also check out the related source code:</p>
          <ul className="ml-7 mb-3 list-disc">
            <li className="mb-1">
              The <code>/src/pages/examples/trpc/</code> directory for the React pages
            </li>
            <li className="mb-1">
              The <code>/src/server/api/routers/</code> directory for tRPC router definitions
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Trpc;
