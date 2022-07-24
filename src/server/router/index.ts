// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./routers/example-router";
import { partiallyProtectedRouter } from "./routers/partially-protected-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("partiallyProtected.", partiallyProtectedRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
