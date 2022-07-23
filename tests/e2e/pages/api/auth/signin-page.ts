import { Page, expect } from "@playwright/test";
import { BasePage } from "../../base-page";
import { getSignInMagicLinkFromEmail } from "@e2e/helpers/email";

export class SigninPage extends BasePage {
  static readonly path: string = "/api/auth/signin";

  constructor(page: Page) {
    super(page, SigninPage.path);
  }

  override async goto({ callbackUrl }: { callbackUrl?: string } = {}): Promise<void> {
    if (callbackUrl) {
      await this.page.goto(`${SigninPage.path}?callbackUrl=${encodeURIComponent(callbackUrl)}`);
    } else {
      await this.page.goto(SigninPage.path);
    }
  }

  async signInByMagicLink(email: string): Promise<void> {
    await this.page.locator("#input-email-for-email-provider").fill(email);
    await this.page.locator('button:has-text("Sign in with Email")').click();

    // URL has params, e.g. /api/auth/verify-request?provider=email&type=email, which we don't care about
    // here, so have to use a RegExp
    await expect(this.page).toHaveURL(new RegExp("/api/auth/verify-request"));
    await expect(this.page.locator("h1")).toContainText("Check your email");

    const signInLink = await getSignInMagicLinkFromEmail(email);
    await this.page.goto(signInLink);
  }
}
