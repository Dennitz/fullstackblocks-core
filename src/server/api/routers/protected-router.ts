import { createRouter, protect } from "../context";

export const protectedRouter = createRouter()
  .query("getPublicMessage", {
    resolve() {
      return "This is a public message, no authentication required.";
    },
  })
  .middleware(protect)
  .query("getSecretMessage", {
    resolve({ ctx }) {
      return `You are logged in and can see this secret message!. Your email is ${ctx.session.user?.email}`;
    },
  });
