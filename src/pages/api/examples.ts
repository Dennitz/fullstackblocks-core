import type { NextApiHandler } from "next";
import { prisma } from "@/server/db/client";

const examples: NextApiHandler = async (req, res) => {
  const examples = await prisma.example.findMany();
  res.status(200).json(examples);
};

export default examples;
