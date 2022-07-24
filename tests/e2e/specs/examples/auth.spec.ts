import { test, expect, Page } from "@playwright/test";
import { SigninPage } from "@e2e/pages/api/auth/signin-page";
import { BasePage } from "@e2e/pages/base-page";
import { faker } from "@faker-js/faker";

test("should not allow access to protected page without sign-in", async ({ page }) => {
  const protectedPage = new ProtectedPage(page);
  await protectedPage.goto();
  // When trying to access the protected page and not signed in, should redirect to sign-in page
  await expect(page).toHaveURL(new RegExp(SigninPage.path));
});

test("should allow sign-in", async ({ page }) => {
  const signinPage = new SigninPage(page);
  await signinPage.goto();

  const randomEmail = faker.internet.email();
  await signinPage.signInByMagicLink(randomEmail);

  // By default, should redirect to index page
  await expect(page).toHaveURL("/");

  const protectedPage = new ProtectedPage(page);
  await protectedPage.goto();
  await protectedPage.expectContentToBeVisible();
});

test("follows relative callbackURL", async ({ page }) => {
  const signinPage = new SigninPage(page);
  await signinPage.goto({ callbackUrl: ProtectedPage.path });

  const randomEmail = faker.internet.email();
  await signinPage.signInByMagicLink(randomEmail);

  await expect(page).toHaveURL(ProtectedPage.path);
  await new ProtectedPage(page).expectContentToBeVisible();
});

test("follows absolute callbackURL on same hostname", async ({ page, baseURL }) => {
  const signinPage = new SigninPage(page);
  await signinPage.goto({ callbackUrl: baseURL + ProtectedPage.path });

  const randomEmail = faker.internet.email();
  await signinPage.signInByMagicLink(randomEmail);

  await expect(page).toHaveURL(ProtectedPage.path);
  await new ProtectedPage(page).expectContentToBeVisible();
});

test("falls back to baseUrl if callbackURL is for different hostname", async ({ page, baseURL }) => {
  const signinPage = new SigninPage(page);
  await signinPage.goto({ callbackUrl: "https://www.google.com/" });

  const randomEmail = faker.internet.email();
  await signinPage.signInByMagicLink(randomEmail);

  await expect(page).toHaveURL(baseURL as string);
});

/** An arbitrary page that requires authentication. */
class ProtectedPage extends BasePage {
  static readonly path: string = "/examples/auth/client-side-protected";

  constructor(page: Page) {
    super(page, ProtectedPage.path);
  }

  async expectContentToBeVisible(): Promise<void> {
    await expect(this.page.locator("h1")).toContainText("Client-side rendered protected page");
  }
}
