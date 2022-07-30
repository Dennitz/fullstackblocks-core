import { test as base, Page } from "@playwright/test";
import { trpc } from "@/utils/trpc";
import superjson from "superjson";
import fetch from "node-fetch";
import AbortController from "abort-controller";
import type { HTTPHeaders } from "@trpc/client/src/links/core";
import type { TRPCClient } from "@trpc/client";
import type { AppRouter } from "@/server/api";

// Declare the types of your fixtures.
interface Fixtures {
  /**
   * Use this fixture to get a page with a user already signed in.
   *
   * The same user is used for all tests in the current test run. The user is created with random
   * data at the start of the test run.
   */
  authenticated: {
    /**
     * The browser page with a user signed in.
     */
    page: Page;
    /**
     * Data about the signed-in user.
     */
    user: {
      email: string;
    };
  };
  /**
   * Fixture for API testing. It provides both a default tRPC client as `api.client` that sends
   * un-authenticated requests, and another client as `api.authenticated.client` for authenticated requests.
   */
  api: {
    /**
     * A tRPC client that sends un-authenticated requests.
     */
    client: TRPCClient<AppRouter>;
    /**
     * Use this fixture to get a tRPC client that sends authenticated requests (i.e. requests sent
     * by a logged-in user).
     */
    authenticated: {
      /**
       * A tRPC client that sends authenticated requests.
       */
      client: TRPCClient<AppRouter>;
      /**
       * Data about the signed-in user.
       */
      user: {
        email: string;
      };
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
    await use({ page, user: { email } });
  },

  api: async ({ baseURL, playwright }, use) => {
    if (baseURL === undefined) {
      throw new Error("Expected baseURL to be defined in playwright config.");
    }

    const email = process.env.AUTHENTICATED_USER_EMAIL;
    if (!email) {
      throw new Error(
        "Missing environment variable `AUTHENTICATED_USER_EMAIL`. This should get set in `global-setup.ts`"
      );
    }

    const apiContext = await playwright.request.newContext({ storageState: "storage-state.json" });
    const storageState = await apiContext.storageState();
    const cookiesForApp = storageState.cookies.filter(
      (cookie) => cookie.domain === new URL(baseURL).hostname
    );
    const cookieHeader = cookiesForApp.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");

    const headers = { Cookie: cookieHeader };
    const authenticatedClient = createTrpcClient(baseURL, headers);

    const unauthenticatedClient = createTrpcClient(baseURL);

    await use({
      client: unauthenticatedClient,
      authenticated: { client: authenticatedClient, user: { email } },
    });
  },
});
export { expect } from "@playwright/test";

function createTrpcClient(baseUrl: string, headers?: HTTPHeaders): TRPCClient<AppRouter> {
  return trpc.createClient({
    url: `${baseUrl}/api/trpc`,
    transformer: superjson,
    fetch: fetch as any, // polyfill fetch
    AbortController: AbortController as any, // polyfill AbortController
    headers,
  });
}
