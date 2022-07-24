import { Page, expect } from "@playwright/test";
import { BasePage } from "../helpers/base-page";

export class IndexPage extends BasePage {
  static readonly path: string = "/";

  constructor(page: Page) {
    super(page, IndexPage.path);
  }

  async expectStackBlock(args: {
    title: string;
    documentationUrl: string;
    exampleUrl?: string;
  }): Promise<void> {
    const { title, documentationUrl, exampleUrl } = args;

    const block = await this.page.locator("data-test-id=stack-component", {
      has: this.page.locator(`h2 >> text=${title}`),
    });

    await expect(block.locator(`text=${title}`)).toBeVisible();

    const documentationLink = block.locator(`text=Documentation`);
    await expect(documentationLink).toBeVisible();
    await expect(documentationLink).toHaveAttribute("href", documentationUrl);

    const exampleLink = block.locator(`text=Example`);
    if (exampleUrl) {
      await expect(exampleLink).toBeVisible();
      await expect(exampleLink).toHaveAttribute("href", exampleUrl);
    } else {
      await expect(exampleLink).toHaveCount(0);
    }
  }
}
