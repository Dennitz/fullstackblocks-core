import { useSession } from "next-auth/react";
import { NextPage } from "next";
import { TrpcHeader } from "@/components/examples/trpc/trpc-header";
import { trpc } from "@/utils/trpc";
import { FormEventHandler } from "react";

const QueryPublic: NextPage = () => {
  const { status: authStatus } = useSession();
  const utils = trpc.useContext();
  const allExamples = trpc.useQuery(["example.getAll"]);
  const addExample = trpc.useMutation(["example.add"], {
    async onSuccess() {
      // re-fetch all example records after a new one has been created
      await utils.invalidateQueries(["example.getAll"]);
    },
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const messageInput: HTMLInputElement = (e as any).target.elements.message;
    const input = {
      message: messageInput.value,
    };

    try {
      await addExample.mutateAsync(input);

      messageInput.value = "";
    } catch (e) {
      console.log("Error submitting form", e);
    }
  };

  return (
    <div>
      <TrpcHeader authenticated={authStatus === "authenticated"} />
      <main className="mx-auto max-w-7xl py-6 px-10">
        <h1 className="mb-10 text-3xl font-extrabold text-slate-800">
          tRPC Query - No authentication required
        </h1>
        <div className="max-w-3xl rounded-xl bg-white shadow-md">
          <div className="px-4 py-4 text-lg  text-slate-900 sm:px-6 lg:px-4 xl:px-6">
            {allExamples.isLoading && "Loading..."}
            {allExamples.data?.length === 0 && "No example records. Please create one!"}
            {allExamples.data &&
              allExamples.data.map((example) => (
                <div key={example.id} className="overflow-hidden text-ellipsis">
                  {example.message}
                </div>
              ))}
          </div>
        </div>
        <form onSubmit={onSubmit} className="mt-10 flex max-w-3xl rounded-xl bg-white shadow-sm">
          <input
            id="message"
            name="message"
            type="text"
            placeholder="New message..."
            className="w-full appearance-none rounded-l-xl border border-slate-300 py-2 pl-6 text-sm leading-6 text-slate-900 placeholder-slate-400"
          />
          <button type="submit" className="rounded-r-xl border border-slate-300 bg-slate-100 px-4">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default QueryPublic;
