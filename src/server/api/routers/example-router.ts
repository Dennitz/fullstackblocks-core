import { createRouter } from "../context";
import { z } from "zod";
import { prisma } from "@/server/db/client";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve() {
      return await prisma.example.findMany();
    },
  });
