import { test, expect } from "@e2e/test";
import { testRedirectIfNotSignedIn } from "@e2e/helpers/common-tests";

const pagePath = "/examples/auth/middleware-protected";

testRedirectIfNotSignedIn(pagePath);

test("should show the page if signed in", async ({ authenticated }) => {
  const { page, user } = authenticated;
  await page.goto(pagePath);
  await expect(page.locator("h1")).toContainText("Middleware protected page");
  await expect(page.locator(`text=${user.email}`)).toBeVisible();
});
