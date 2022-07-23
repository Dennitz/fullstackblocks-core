import { test, expect } from "@e2e/test";
import { SigninPage } from "@e2e/pages/api/auth/signin-page";
import escapeRegExp from "lodash/escapeRegExp";

/**
 * Test that the page at `pagePath` cannot be accessed when not signed in and that a
 * redirect happens to the sign-in page happens with the `callbackUrl` param set.
 *
 * The callbackUrl should be the URI encoded value either of `pagePath` (relative path), or
 * of `baseURL + pagePath` (absolute path)
 */
export function testRedirectIfNotSignedIn(pagePath: string): void {
  test("should redirect to sign-in page if not signed in", async ({ page, baseURL }) => {
    await page.goto(pagePath);

    const pathWithRelativeCallback = escapeRegExp(
      `${SigninPage.path}?callbackUrl=${encodeURIComponent(pagePath)}`
    );
    const pathWithAbsoluteCallback = escapeRegExp(
      `${SigninPage.path}?callbackUrl=${encodeURIComponent(baseURL + pagePath)}`
    );

    // We want to test that the page's URL matches either `pathWithRelativeCallback` or
    // `pathWithAbsoluteCallback`. The `toHaveURL` matcher expects takes a single string to match
    // or a regex. So we have to build a regex to do the `OR` test.
    await expect(page).toHaveURL(new RegExp(`(${pathWithRelativeCallback})|(${pathWithAbsoluteCallback})`));
  });
}
