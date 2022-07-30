import { useSession } from "next-auth/react";
import { NextPage } from "next";
import { TrpcHeader } from "@/components/examples/trpc/trpc-header";
import { trpc } from "@/utils/trpc";
import Link from "next/link";

const QueryPublic: NextPage = () => {
  const { status: authStatus } = useSession();
  const publicMessage = trpc.useQuery(["protected.getPublicMessage"]);

  return (
    <div>
      <TrpcHeader authenticated={authStatus === "authenticated"} />
      <main className="mx-auto max-w-7xl py-6 px-10">
        <h1 className="mb-10 text-3xl font-extrabold text-slate-800">
          tRPC Query - No authentication required
        </h1>
        <div className="max-w-3xl rounded-xl bg-white shadow-md">
          <div className="px-4 py-4 text-lg  text-slate-900 sm:px-6 lg:px-4 xl:px-6">
            {publicMessage.data ? publicMessage.data : "Loading..."}
          </div>
        </div>
        <div className="mt-8">
          {authStatus === "authenticated" && (
            <>
              You are currently signed in. You can{" "}
              <Link href={`/api/auth/signout?callbackUrl=${encodeURIComponent(window.location.pathname)}`}>
                <a className="cursor-pointer text-violet-500">sign out</a>
              </Link>{" "}
              and you will still see the same message.
            </>
          )}
          {authStatus === "unauthenticated" && (
            <>
              You are not signed in. You can{" "}
              <Link href={`/api/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`}>
                <a className="cursor-pointer text-violet-500">sign in</a>
              </Link>{" "}
              and you will still see the same message.
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default QueryPublic;
