import { describe, expect, it } from "bun:test";
import { createHostingDeClient } from "../src/index";

describe("createHostingDeClient", () => {
  it("should create a client with default base URL", () => {
    const client = createHostingDeClient({
      apiToken: "test-token",
    });

    expect(client).toBeDefined();
    expect(typeof client.call).toBe("function");
  });

  it("should allow custom base URL", () => {
    const client = createHostingDeClient({
      apiToken: "test-token",
      baseUrl: "https://custom.hosting.de/api",
    });

    expect(client).toBeDefined();
  });
});
