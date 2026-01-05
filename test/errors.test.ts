import { describe, it, expect } from "bun:test";
import {
  CherryError,
  HttpError,
  ValidationError,
  NetworkError,
  UnknownCherryError,
  isCherryError,
  cherryErr,
} from "../src/errors";

describe("CherryError", () => {
  it("should be abstract and cannot be instantiated directly", () => {
    // This should be a type error at compile time
    // @ts-expect-error - Cannot create an instance of an abstract class
    expect(() => new CherryError("test")).toThrow();
  });

  it("should define abstract properties", () => {
    class TestError extends CherryError {
      readonly type = "TestError";
      readonly retryable = false;
    }

    const error = new TestError("test");
    expect(error.type).toBe("TestError");
    expect(error.retryable).toBe(false);
  });
});

describe("HttpError", () => {
  it("should extend CherryError", () => {
    const error = new HttpError(404, "Not Found");
    expect(error).toBeInstanceOf(CherryError);
    expect(error).toBeInstanceOf(HttpError);
  });

  it("should have type property", () => {
    const error = new HttpError(404, "Not Found");
    expect(error.type).toBe("HttpError");
  });

  it("should have retryable property - true for 5xx", () => {
    const error = new HttpError(500, "Internal Server Error");
    expect(error.retryable).toBe(true);
  });

  it("should have retryable property - true for 429", () => {
    const error = new HttpError(429, "Too Many Requests");
    expect(error.retryable).toBe(true);
  });

  it("should have retryable property - false for 4xx (except 429)", () => {
    const error = new HttpError(404, "Not Found");
    expect(error.retryable).toBe(false);
  });

  it("should have retryable property - false for 3xx", () => {
    const error = new HttpError(301, "Moved Permanently");
    expect(error.retryable).toBe(false);
  });

  it("should have message property", () => {
    const error = new HttpError(404, "Not Found");
    expect(error.message).toBe("HTTP 404: Not Found");
  });

  it("should have name property", () => {
    const error = new HttpError(404, "Not Found");
    expect(error.name).toBe("HttpError");
  });

  it("should store status, statusText, and optional body", () => {
    const error = new HttpError(404, "Not Found", {
      message: "User not found",
    });
    expect(error.status).toBe(404);
    expect(error.statusText).toBe("Not Found");
    expect(error.body).toEqual({ message: "User not found" });
  });

  it("should accept optional cause", () => {
    const cause = new Error("Network timeout");
    const error = new HttpError(500, "Internal Server Error", undefined, cause);
    expect(error.cause).toBe(cause);
  });

  it("should work with cause parameter without body", () => {
    const cause = new Error("Network timeout");
    const error = new HttpError(500, "Internal Server Error", undefined, cause);
    expect(error.cause).toBe(cause);
  });
});

describe("ValidationError", () => {
  it("should extend CherryError", () => {
    const error = new ValidationError("request", []);
    expect(error).toBeInstanceOf(CherryError);
    expect(error).toBeInstanceOf(ValidationError);
  });

  it("should have type property", () => {
    const error = new ValidationError("request", []);
    expect(error.type).toBe("ValidationError");
  });

  it("should have retryable property - always false", () => {
    const error = new ValidationError("request", []);
    expect(error.retryable).toBe(false);
  });

  it("should have message property", () => {
    const error = new ValidationError("request", []);
    expect(error.message).toBe("Validation failed for request");
  });

  it("should have name property", () => {
    const error = new ValidationError("request", []);
    expect(error.name).toBe("ValidationError");
  });

  it("should store target and issues", () => {
    const issues = [{ path: ["email"], message: "Invalid email" }];
    const error = new ValidationError("response", issues);
    expect(error.target).toBe("response");
    expect(error.issues).toEqual(issues);
  });

  it("should accept target as 'request' or 'response'", () => {
    const reqError = new ValidationError("request", []);
    const resError = new ValidationError("response", []);
    expect(reqError.target).toBe("request");
    expect(resError.target).toBe("response");
  });

  it("should accept optional cause", () => {
    const cause = new Error("Parse error");
    const error = new ValidationError("request", [], cause);
    expect(error.cause).toBe(cause);
  });
});

describe("NetworkError", () => {
  it("should extend CherryError", () => {
    const error = new NetworkError();
    expect(error).toBeInstanceOf(CherryError);
    expect(error).toBeInstanceOf(NetworkError);
  });

  it("should have type property", () => {
    const error = new NetworkError();
    expect(error.type).toBe("NetworkError");
  });

  it("should have retryable property - always true", () => {
    const error = new NetworkError();
    expect(error.retryable).toBe(true);
  });

  it("should have message property", () => {
    const error = new NetworkError();
    expect(error.message).toBe("Network error");
  });

  it("should have name property", () => {
    const error = new NetworkError();
    expect(error.name).toBe("NetworkError");
  });

  it("should accept optional cause", () => {
    const cause = new Error("Connection refused");
    const error = new NetworkError(cause);
    expect(error.cause).toBe(cause);
  });
});

describe("UnknownCherryError", () => {
  it("should extend CherryError", () => {
    const error = new UnknownCherryError();
    expect(error).toBeInstanceOf(CherryError);
    expect(error).toBeInstanceOf(UnknownCherryError);
  });

  it("should have type property", () => {
    const error = new UnknownCherryError();
    expect(error.type).toBe("UnknownCherryError");
  });

  it("should have retryable property - always false", () => {
    const error = new UnknownCherryError();
    expect(error.retryable).toBe(false);
  });

  it("should have message property", () => {
    const error = new UnknownCherryError();
    expect(error.message).toBe("Unknown error");
  });

  it("should have name property", () => {
    const error = new UnknownCherryError();
    expect(error.name).toBe("UnknownCherryError");
  });

  it("should accept optional cause", () => {
    const cause = new Error("Unexpected error");
    const error = new UnknownCherryError(cause);
    expect(error.cause).toBe(cause);
  });
});

describe("isCherryError", () => {
  it("should return true for CherryError instances", () => {
    expect(isCherryError(new HttpError(404, "Not Found"))).toBe(true);
    expect(isCherryError(new ValidationError("request", []))).toBe(true);
    expect(isCherryError(new NetworkError())).toBe(true);
    expect(isCherryError(new UnknownCherryError())).toBe(true);
  });

  it("should return false for non-CherryError objects", () => {
    expect(isCherryError(new Error("test"))).toBe(false);
    expect(isCherryError("not an error")).toBe(false);
    expect(isCherryError(null)).toBe(false);
    expect(isCherryError(undefined)).toBe(false);
    expect(isCherryError({ type: "fake" })).toBe(false);
  });

  it("should narrow type correctly in if statements", () => {
    const error = new HttpError(404, "Not Found");
    if (isCherryError(error)) {
      // TypeScript should know error.type exists
      expect(error.type).toBe("HttpError");
    }
  });
});

describe("cherryErr", () => {
  it("should create a ResultAsync with CherryError", async () => {
    const error = new HttpError(404, "Not Found");
    const result = await cherryErr<string>(error);

    await result.match(
      () => {
        throw new Error("Should not be Ok");
      },
      (err) => {
        expect(err).toBe(error);
        expect(err.type).toBe("HttpError");
      },
    );
  });

  it("should preserve error type", async () => {
    const validationError = new ValidationError("request", []);
    const result = cherryErr<string>(validationError);

    await result.match(
      () => {
        throw new Error("Should not be Ok");
      },
      (err) => {
        expect(err.type).toBe("ValidationError");
      },
    );
  });
});
