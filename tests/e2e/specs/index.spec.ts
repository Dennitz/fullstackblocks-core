import { test, expect } from "@playwright/test";
import { IndexPage } from "../pages/index-page";

test("should render the index page", async ({ page }) => {
  const indexPage = new IndexPage(page);
  await indexPage.goto();
  await expect(page.locator("h1")).toContainText("Full Stack Blocks");
});

[
  {
    title: "Next.js",
    documentationUrl: "https://nextjs.org/",
  },
  {
    title: "TypeScript",
    documentationUrl: "https://www.typescriptlang.org/",
  },
  {
    title: "TailwindCSS",
    documentationUrl: "https://tailwindcss.com/",
  },
  {
    title: "tRPC",
    documentationUrl: "https://trpc.io/",
    exampleUrl: "/examples/trpc",
  },
  {
    title: "NextAuth.js",
    documentationUrl: "https://next-auth.js.org/",
    exampleUrl: "/examples/auth",
  },
  {
    title: "Playwright",
    documentationUrl: "https://playwright.dev/",
  },
].forEach(({ title, documentationUrl, exampleUrl }) =>
  test(`should mention components of the stack - ${title}`, async ({ page }) => {
    const indexPage = new IndexPage(page);
    await indexPage.goto();
    await indexPage.expectStackBlock({ title, documentationUrl, exampleUrl });
  })
);
