import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "@/utils/trpc";
import React from "react";
import Link from "next/link";

const stackComponents: {
  title: string;
  description: string;
  documentationUrl: string;
  exampleUrl?: string;
}[] = [
  {
    title: "Next.js",
    description: "The React framework for production",
    documentationUrl: "https://nextjs.org/",
  },
  {
    title: "TypeScript",
    description:
      "Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale",
    documentationUrl: "https://www.typescriptlang.org/",
  },
  {
    title: "TailwindCSS",
    description: "Rapidly build modern websites without ever leaving your HTML",
    documentationUrl: "https://tailwindcss.com/",
  },
  {
    title: "tRPC",
    description: "End-to-end typesafe APIs made easy",
    documentationUrl: "https://trpc.io/",
  },
  {
    title: "NextAuth.js",
    description: "Authentication built for Next.js",
    documentationUrl: "https://next-auth.js.org/",
    exampleUrl: "/examples/auth",
  },
  {
    title: "Playwright",
    description: "Fast and reliable end-to-end testing for modern web apps",
    documentationUrl: "https://playwright.dev/",
  },
];

const Index: NextPage = () => {
  const hello = trpc.useQuery(["example.hello"]);

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold text-slate-700 md:text-7xl lg:text-7xl">
          Create <span className="text-purple-300">T3</span> App
        </h1>
        <p className="text-2xl text-slate-700">This stack uses</p>
        <div className="mt-3 grid w-full grid-cols-1 grid-rows-3 items-center justify-center gap-3 pt-3 md:w-full md:grid-cols-2 md:grid-rows-2 lg:w-2/3 lg:grid-cols-2 lg:grid-rows-2">
          {stackComponents.map((details) => (
            <div
              key={details.title}
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded border-2 border-slate-500 p-6 text-center shadow-xl duration-500 hover:scale-105"
              data-test-id="stack-component"
            >
              <h2 className="text-lg text-slate-700">{details.title}</h2>
              <p className="text-sm text-slate-600">{details.description}</p>
              <div>
                <a
                  className="mt-3 cursor-pointer text-sm text-violet-500 underline decoration-dotted underline-offset-2"
                  href={details.documentationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Documentation
                </a>
                {details.exampleUrl && (
                  <Link href={details.exampleUrl}>
                    <a className="mt-3 ml-3 cursor-pointer text-sm text-violet-500 underline decoration-dotted underline-offset-2">
                      Example
                    </a>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full items-center justify-center pt-6 text-2xl text-blue-500">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>
      </div>
    </>
  );
};

export default Index;
