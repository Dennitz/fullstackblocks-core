import { Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class IndexPage extends BasePage {
  static readonly path: string = "/";
  private readonly isMobile: boolean;

  constructor(page: Page, isMobile: boolean = false) {
    super(page, IndexPage.path);
    this.isMobile = isMobile;
  }

  async clickSignIn(): Promise<void> {
    await this.page.click("text= Sign in");
  }
}
