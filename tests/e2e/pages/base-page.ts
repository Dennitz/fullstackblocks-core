import { Page } from "@playwright/test";

export abstract class BasePage {
  readonly path: string;
  readonly page: Page;

  protected constructor(page: Page, path: string) {
    this.page = page;
    this.path = path;
  }

  async goto(): Promise<void> {
    await this.page.goto(this.path);
  }
}
