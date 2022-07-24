import { Page } from "@playwright/test";
import { BasePage } from "../helpers/base-page";

export class IndexPage extends BasePage {
  static readonly path: string = "/";
  private readonly isMobile: boolean;

  constructor(page: Page, isMobile: boolean = false) {
    super(page, IndexPage.path);
    this.isMobile = isMobile;
  }
}
