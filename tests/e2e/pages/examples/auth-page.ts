import { Page } from "@playwright/test";
import { BasePage } from "@e2e/pages/base-page";

export class AuthPage extends BasePage {
  static readonly path: string = "/examples/auth";

  constructor(page: Page) {
    super(page, AuthPage.path);
  }

  async clickSignIn(): Promise<void> {
    await this.page.click("text=Sign in");
  }

  async clickSignOut(): Promise<void> {
    await this.page.click("text=Sign out");
  }
}
