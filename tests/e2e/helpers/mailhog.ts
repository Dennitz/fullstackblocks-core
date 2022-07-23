import { APIRequestContext, request } from "@playwright/test";

interface MailhogMessages {
  total: number;
  start: number;
  count: number;
  items: {
    ID: string;
    From: { Relays: string[] | null; Mailbox: string; Domain: string; Params: string };
    To: { Relays: string[] | null; Mailbox: string; Domain: string; Params: string }[];
    Content: {
      Headers: {
        [key: string]: string[];
      };
      Body: string;
      Size: number;
    };
    Created: string;
    Raw: {
      From: string;
      To: string[];
      Data: string;
    };
  }[];
}

export class Mailhog {
  private context: APIRequestContext;

  static async init(): Promise<Mailhog> {
    const context = await request.newContext({
      baseURL: "http://localhost:8025",
    });
    return new Mailhog(context);
  }

  private constructor(context: APIRequestContext) {
    this.context = context;
  }

  search({
    kind,
    query,
    start = 0,
    limit = 50,
  }: {
    kind: "from" | "to" | "containing";
    query: string;
    start?: number;
    limit?: number;
  }): Promise<MailhogMessages> {
    const params = new URLSearchParams();
    params.append("kind", kind);
    params.append("query", query);
    params.append("start", start.toString());
    params.append("limit", limit.toString());

    return this.context.get(`/api/v2/search?${params.toString()}`).then((resp) => resp.json());
  }
}
