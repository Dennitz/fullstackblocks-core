// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./routers/example-router";
import { protectedRouter } from "./routers/protected-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("protected.", protectedRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
