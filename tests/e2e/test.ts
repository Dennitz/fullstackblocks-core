import { test as base, Page } from "@playwright/test";

// Declare the types of your fixtures.
interface Fixtures {
  /**
   * Use this fixture to get a page with a user already signed in.
   *
   * The same user is used for all tests in the current test run. The user is created with random
   * data at the start of the test run.
   */
  authenticated: {
    page: Page;
    user: {
      email: string;
    };
  };
}

// Extend base test by providing common fixtures.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<Fixtures>({
  authenticated: async ({ browser }, use) => {
    const email = process.env.AUTHENTICATED_USER_EMAIL;
    if (!email) {
      throw new Error(
        "Missing environment variable `AUTHENTICATED_USER_EMAIL`. This should get set in `global-setup.ts`"
      );
    }

    const context = await browser.newContext({ storageState: "storage-state.json" });
    const page = await context.newPage();
    await use({
      page,
      user: {
        email,
      },
    });
  },
});
export { expect } from "@playwright/test";
