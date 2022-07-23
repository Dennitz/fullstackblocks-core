import { chromium, FullConfig } from "@playwright/test";
import { SigninPage } from "./pages/api/auth/signin-page";
import { faker } from "@faker-js/faker";

/**
 * Creates one new user with a random email for the whole test run.
 * The browser storage state with that user signed in, is stored in
 * `storage-state.json`
 *
 * To use the authenticated user, use the `authenticatedUser` fixture
 * defined in `tests/e2e/test.ts`.
 */
async function globalSetup(config: FullConfig): Promise<void> {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await context.tracing.start({ screenshots: true, snapshots: true });
    const randomEmail = faker.internet.email();
    process.env.AUTHENTICATED_USER_EMAIL = randomEmail;

    await page.goto(baseURL + SigninPage.path);
    const signinPage = await new SigninPage(page);
    await signinPage.signInByMagicLink(randomEmail);

    await page.context().storageState({ path: "storage-state.json" });
    await browser.close();
  } catch (error) {
    const tracePath = "./test-results/failed-setup-trace.zip";
    await context.tracing.stop({
      path: tracePath,
    });
    console.error(`Global setup failed. View trace with:\n\`npx playwright show-trace ${tracePath}\``);
    await browser.close();
    throw error;
  }
}

export default globalSetup;
