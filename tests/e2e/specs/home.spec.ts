import { test, expect } from "@playwright/test";
import { IndexPage } from "../pages/index-page";
import { SigninPage } from "../pages/api/auth/signin-page";

test("should render the index page", async ({ page, isMobile }) => {
  const indexPage = new IndexPage(page, isMobile);
  await indexPage.goto();
  await expect(page.locator("h1")).toContainText("Create T3 App");
});

test("should allow navigation to sign-in page", async ({ page, isMobile }) => {
  const indexPage = new IndexPage(page, isMobile);
  await indexPage.goto();
  await indexPage.clickSignIn();
  await expect(page).toHaveURL(new RegExp(SigninPage.path));
});
