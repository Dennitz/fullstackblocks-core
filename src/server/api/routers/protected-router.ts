import { createRouter, protect } from "../context";

export const protectedRouter = createRouter()
  .query("getPublicMessage", {
    resolve() {
      return "You may or may not be logged in. Everyone can see this public message.";
    },
  })
  .middleware(protect)
  .query("getSecretMessage", {
    resolve({ ctx }) {
      return `You are logged in and can see this secret message!. Your email is ${ctx.session.user?.email}`;
    },
  });
