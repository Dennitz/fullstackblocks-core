import { test, expect } from "@e2e/test";

test.describe("protected.getPublicMessage", () => {
  test("authenticated user should be able to query", async ({ api }) => {
    const result = await api.authenticated.client.query("protected.getPublicMessage");
    expect(result).toEqual("This is a public message, no authentication required.");
  });

  test("unauthenticated user should be able to query", async ({ api }) => {
    const result = await api.client.query("protected.getPublicMessage");
    expect(result).toEqual("This is a public message, no authentication required.");
  });
});

test.describe("protected.getSecretMessage", () => {
  test("authenticated user should be able to query", async ({ api }) => {
    const { client, user } = api.authenticated;
    const result = await client.query("protected.getSecretMessage");
    expect(result).toEqual(
      `You are logged in and can see this secret message!. Your email is ${user.email.toLowerCase()}`
    );
  });

  test("unauthenticated user should not be able to query", async ({ api }) => {
    await expect(api.client.query("protected.getSecretMessage")).rejects.toMatchObject({
      data: { code: "UNAUTHORIZED" },
    });
  });
});
