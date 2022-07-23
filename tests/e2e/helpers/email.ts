import { Mailhog } from "./mailhog";
import { simpleParser } from "mailparser";
import { JSDOM } from "jsdom";

export async function getSignInMagicLinkFromEmail(emailAddress: string): Promise<string> {
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
