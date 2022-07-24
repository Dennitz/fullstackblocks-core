import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession as getServerSession, Session } from "next-auth";

import { authOptions as nextAuthOptions } from "../../pages/api/auth/[...nextauth]";
import { prisma } from "../db/client";
import { NextApiRequest, NextApiResponse } from "next";
import { MiddlewareFunction } from "@trpc/server/src/internals/middlewares";

export interface Context {
  req: NextApiRequest | undefined;
  res: NextApiResponse | undefined;
  session: Session | null | undefined;
  prisma: typeof prisma;
}

export type ProtectedContext = Context & { session: Session };

// This equates to an empty object.
export type Meta = Record<string, never>;

export async function createContext(opts?: trpcNext.CreateNextContextOptions): Promise<Context> {
  const req = opts?.req;
  const res = opts?.res;

  const session = req && res && (await getServerSession(req, res, nextAuthOptions));

  return {
    req,
    res,
    session,
    prisma,
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createRouter() {
  return trpc.router<Context, Meta>();
}

/**
 * Middleware to require authentication on any queries or mutations defined after using this middleware.
 * Throws an unauthorized error if a user is not signed in and tries to use a protected query/mutation.
 *
 * Examples:
 *
 * - Protect parts of a router. `getPublicMessage` does not required authentication,
 *  only `getSecretMessage` does:
 * ```typescript
 * export const authRouter = createRouter()
 *   .query("getPublicMessage", {
 *      resolve() {
 *        return "You may or may not be logged in. Everyone can see this public message.";
 *      },
 *    })
 *   .middleware(protect)
 *   .query("getSecretMessage", {
 *      resolve({ ctx }) {
 *        return `You are logged in and can see this secret message!. Your session expires at ${ctx.session.expires}`;
 *      },
 *    });
 * ```
 *
 * - Protect all routes of a router:
 * ```typescript
 * export const authRouter = createRouter()
 *   .middleware(protect)
 *   .query("getSecretMessage", {
 *      resolve({ ctx }) {
 *        return `You are logged in and can see this secret message!. Your session expires at ${ctx.session.expires}`;
 *      },
 *    });
 * ```
 */
export const protect: MiddlewareFunction<Context, ProtectedContext, Meta> = ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      // infers that `session` is non-nullable to downstream resolvers
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
};
