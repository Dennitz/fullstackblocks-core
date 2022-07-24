import { Page } from "@playwright/test";
import { BasePage } from "@e2e/helpers/base-page";

export class SignoutPage extends BasePage {
  static readonly path: string = "/api/auth/signout";

  constructor(page: Page) {
    super(page, SignoutPage.path);
  }

  async signOut(): Promise<void> {
    await this.goto();
    await this.page.locator('button:has-text("Sign out")').click();
  }
}
