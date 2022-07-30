import { NextPage, GetServerSideProps } from "next";
import { AuthHeader } from "@/components/examples/auth/auth-header";
import { unstable_getServerSession, Session } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

// Export the `session` prop to use sessions with Server Side Rendering
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=${encodeURIComponent("/examples/auth/server-side-protected")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

// As the session is set server side, it is available on first render, without going through a loading state.
const ServerSideProtected: NextPage<{ session: Session }> = (props) => {
  return (
    <div>
      <AuthHeader authenticated />
      <main className="mx-auto max-w-7xl py-6 px-10">
        <h1 className="mb-10 text-3xl font-extrabold text-slate-800">Server-side rendered protected page</h1>
        <div className="max-w-3xl rounded-xl bg-white shadow-md">
          <h2 className="px-4 pt-4 text-lg font-semibold text-slate-900 sm:px-6 lg:px-4 xl:px-6">
            Some protected data
          </h2>
          <dl className="flex flex-wrap divide-y divide-slate-200 border-b border-slate-200 text-sm sm:text-base lg:text-sm xl:text-base">
            <div className="px-4 pb-4 sm:px-6 lg:px-4 xl:px-6"></div>
            <div className="flex w-full flex-none items-center p-4 sm:p-6 lg:p-4 xl:p-6">
              <dt className="w-2/5 flex-none font-medium text-slate-900 sm:w-1/4">Email</dt>
              <dd className="">{props.session.user?.email || "-"}</dd>
            </div>
            <div className="flex w-full flex-none items-center p-4 sm:p-6 lg:p-4 xl:p-6">
              <dt className="w-2/5 flex-none font-medium text-slate-900 sm:w-1/4">Session expiry</dt>
              <dd className="">{props.session.expires || "-"}</dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
};

export default ServerSideProtected;
