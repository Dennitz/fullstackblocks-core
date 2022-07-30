import { NextPage } from "next";
import { AuthHeader } from "@/components/examples/auth/auth-header";
import { useSession } from "next-auth/react";

const MiddlewareProtected: NextPage = () => {
  const { data: session } = useSession();
  return (
    <div>
      <AuthHeader authenticated />
      <main className="mx-auto max-w-7xl py-6 px-10">
        <h1 className="mb-10 text-3xl font-extrabold text-slate-800">Middleware protected page</h1>
        <div className="mb-10 max-w-3xl rounded-xl bg-white shadow-xl">
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
        <div className="max-w-3xl">
          <p className="mb-3">
            On this page, authentication is ensured through middleware running at the edge (see{" "}
            <code>src/middleware.ts</code>).
          </p>
          <p>
            Un-authenticated users are redirected to the sign in page, while authenticated users get access to
            this page. If you need data from the session, like the user&apos;s email address, this should
            still be requested client-side with the <code>useSession</code> hook.
          </p>
        </div>
      </main>
    </div>
  );
};

export default MiddlewareProtected;
