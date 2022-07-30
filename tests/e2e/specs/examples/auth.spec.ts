import { test, expect } from "@e2e/test";
import { Page } from "@playwright/test";
import { SigninPage } from "@e2e/pages/api/auth/signin-page";
import { BasePage } from "@e2e/pages/base-page";
import { faker } from "@faker-js/faker";
import { AuthPage } from "@e2e/pages/examples/auth-page";
import { SignoutPage } from "@e2e/pages/api/auth/signout-page";

test.describe("/examples/auth page", () => {
  test("should allow navigation to sign-in page signed out", async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.clickSignIn();
    await expect(page).toHaveURL(new RegExp(SigninPage.path));
  });

  test("should allow navigation to sign-out page if signed in", async ({ authenticated }) => {
    const {page} = authenticated
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.clickSignOut();
    await expect(page).toHaveURL(new RegExp(SignoutPage.path));
  });

  [
    {text: 'Protected (client-side)', expectedPath: '/examples/auth/client-side-protected'},
    {text: 'Protected (server-side)', expectedPath: '/examples/auth/server-side-protected'},
    {text: 'Protected (middleware)', expectedPath: '/examples/auth/middleware-protected'},
  ].forEach(({text, expectedPath}) =>
    test(`should allow navigation to ${expectedPath} if signed in`, async ({ authenticated }) => {
      const {page} = authenticated
      const authPage = new AuthPage(page);
      await authPage.goto();
      await page.locator(`text=${text}`).click()
      await expect(page).toHaveURL(expectedPath);
    })
  )
});

test.describe("Authentication flows", () => {
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

    // Now it should be possibe to access a protected page
    const protectedPage = new ProtectedPage(page);
    await protectedPage.goto();
    await protectedPage.expectContentToBeVisible();
  });

  test("should allow sign-out if signed in", async ({ authenticated }) => {
    const {page} = authenticated

    // Signed-in initially, so it should be possible to access a protected page
    const protectedPage = new ProtectedPage(page);
    await protectedPage.goto();
    await protectedPage.expectContentToBeVisible();

    // Sign out
    await new SignoutPage(page).signOut()

    // Now it should not be possible anymore to access the protected page. Trying to access the page
    // should redirect to sign-in page
    await protectedPage.goto();
    await expect(page).toHaveURL(new RegExp(SigninPage.path));
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
});
