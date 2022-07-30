import { useSession } from "next-auth/react";
import { NextPage } from "next";
import { TrpcHeader } from "@/components/examples/trpc/trpc-header";
import { trpc } from "@/utils/trpc";
import Link from "next/link";

const QueryProtected: NextPage = () => {
  const { status: authStatus } = useSession();
  const privateMessage = trpc.useQuery(["protected.getSecretMessage"], {
    retry: (failureCount, error) => {
      // retry 3 times by (default), but don't retry on UNAUTHORIZED error
      return failureCount < 3 && error?.data?.code !== "UNAUTHORIZED";
    },
  });

  if (privateMessage.error) {
    console.log(privateMessage.error);
  }
  const message = privateMessage.isLoading
    ? "Loading..."
    : privateMessage.error
    ? "Error: Unauthenticated. You need to sign in first."
    : privateMessage.data;

  return (
    <div>
      <TrpcHeader authenticated={authStatus === "authenticated"} />
      <main className="mx-auto max-w-7xl py-6 px-10">
        <h1 className="mb-10 text-3xl font-extrabold text-slate-800">tRPC Query - Authentication required</h1>
        <div className="max-w-3xl rounded-xl bg-white shadow-xl">
          <div className="px-4 py-4 text-lg  text-slate-900 sm:px-6 lg:px-4 xl:px-6">{message}</div>
        </div>
        <div className="mt-8">
          {authStatus === "authenticated" && (
            <>
              You are currently signed in. You can{" "}
              <Link
                href={`/api/auth/signout?callbackUrl=${encodeURIComponent(window.location.pathname)}`}
              >
                <a className="cursor-pointer text-violet-500">sign out</a>
              </Link>{" "}
              to see an error returned by the tRPC query.
            </>
          )}
          {authStatus === "unauthenticated" && (
            <>
              You are not signed in. To see data returned by the tRPC query,{" "}
              <Link
                href={`/api/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`}
              >
                <a className="cursor-pointer text-violet-500">sign in</a>
              </Link>{" "}
              first.
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default QueryProtected;
