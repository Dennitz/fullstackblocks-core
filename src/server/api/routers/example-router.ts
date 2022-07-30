import { createRouter } from "../context";
import { z } from "zod";
import { prisma } from "@/server/db/client";
import { Prisma } from "@prisma/client";

const defaultExampleSelect = Prisma.validator<Prisma.ExampleSelect>()({
  id: true,
  message: true,
});

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
      return await prisma.example.findMany({ select: defaultExampleSelect });
    },
  })
  .mutation("add", {
    input: z.object({
      message: z.string().min(1),
    }),
    async resolve({ input }) {
      return await prisma.example.create({
        data: input,
        select: defaultExampleSelect,
      });
    },
  });
