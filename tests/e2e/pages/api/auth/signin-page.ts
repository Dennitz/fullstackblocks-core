import { Page, expect } from "@playwright/test";
import { BasePage } from "@e2e/helpers/base-page";
import { simpleParser } from "mailparser";
import { JSDOM } from "jsdom";
import { Mailhog } from "@e2e/helpers/mailhog";


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

async function getSignInMagicLinkFromEmail(emailAddress: string): Promise<string> {
  const mailhog = await Mailhog.init();
  const searchResult = await mailhog.search({ kind: "to", query: emailAddress });
  const messagesByCreatedDateDesc = searchResult.items.sort(
    (a, b) => new Date(b.Created).getTime() - new Date(a.Created).getTime()
  );
  const rawMessage = messagesByCreatedDateDesc[0]?.Raw.Data;
  const parsed = await simpleParser(rawMessage);

  const { document } = new JSDOM(parsed.textAsHtml).window;
  const link = document.querySelector("a")?.href;

  if (link) {
    return link;
  }

  throw new Error("Magic link not found");
}
