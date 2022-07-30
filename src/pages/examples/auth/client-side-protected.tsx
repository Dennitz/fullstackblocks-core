import { useSession } from "next-auth/react";
import { NextPage } from "next";
import { LoadingSpinnerPage } from "@/components/loading-spinner";
import { AuthHeader } from "@/components/examples/auth/auth-header";
import { useRouter } from "next/router";

const ClientSideProtected: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () =>
      router.push(`/api/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`),
  });

  // Show a loading spinner while auth state is loading. In case the page is requested directly (i.e.
  // without client side navigation) this will be also be shown as status === 'loading' is also true
  // during static generation.
  if (status === "loading") {
    return <LoadingSpinnerPage />;
  }

  // Otherwise, successfully authenticated. Show the private page.
  return (
    <div>
      <AuthHeader authenticated />
      <main className="mx-auto max-w-7xl py-6 px-10">
        <h1 className="mb-10 text-3xl font-extrabold text-slate-800">Client-side rendered protected page</h1>
        <div className="max-w-3xl rounded-xl bg-white shadow-md">
          <h2 className="px-4 pt-4 text-lg font-semibold text-slate-900 sm:px-6 lg:px-4 xl:px-6">
            Some protected data
          </h2>
          <dl className="flex flex-wrap divide-y divide-slate-200 border-b border-slate-200 text-sm sm:text-base lg:text-sm xl:text-base">
            <div className="px-4 pb-4 sm:px-6 lg:px-4 xl:px-6"></div>
            <div className="flex w-full flex-none items-center p-4 sm:p-6 lg:p-4 xl:p-6">
              <dt className="w-2/5 flex-none font-medium text-slate-900 sm:w-1/4">Email</dt>
              <dd className="">{session?.user?.email || "-"}</dd>
            </div>
            <div className="flex w-full flex-none items-center p-4 sm:p-6 lg:p-4 xl:p-6">
              <dt className="w-2/5 flex-none font-medium text-slate-900 sm:w-1/4">Session expiry</dt>
              <dd className="">{session?.expires || "-"}</dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
};

export default ClientSideProtected;
