// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/api";
import { createContext } from "../../../server/api/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
