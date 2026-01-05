import { errAsync, ResultAsync } from "neverthrow";

/** Base error class for all Cherry errors */
export abstract class CherryError extends Error {
  abstract readonly type: string;
  abstract readonly retryable: boolean;

  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = this.constructor.name;
  }
}

/** HTTP response errors (4xx, 5xx) */
export class HttpError extends CherryError {
  readonly type = "HttpError";
  readonly retryable: boolean;

  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly body?: unknown,
    cause?: unknown,
  ) {
    super(`HTTP ${status}: ${statusText}`, { cause });
    this.retryable = status >= 500 || status === 429;
  }
}

/** Valibot validation errors */
export class ValidationError extends CherryError {
  readonly type = "ValidationError";
  readonly retryable = false;

  constructor(
    public readonly target: "request" | "response",
    public readonly issues: unknown[],
    cause?: unknown,
  ) {
    super(`Validation failed for ${target}`, { cause });
  }
}

/** Network/fetch errors */
export class NetworkError extends CherryError {
  readonly type = "NetworkError";
  readonly retryable = true;

  constructor(cause?: unknown) {
    super(`Network error`, { cause });
  }
}

/** Serialization errors (e.g., circular references, BigInt in JSON) */
export class SerializationError extends CherryError {
  readonly type = "SerializationError";
  readonly retryable = false;

  constructor(
    public readonly target: "query" | "body",
    public readonly key: string,
    cause?: unknown,
  ) {
    super(`Failed to serialize ${target} parameter "${key}"`, { cause });
  }
}

/** Catch-all for unexpected errors */
export class UnknownCherryError extends CherryError {
  readonly type = "UnknownCherryError";
  readonly retryable = false;

  constructor(cause?: unknown) {
    super(`Unknown error`, { cause });
  }
}

/** Type guard for CherryError */
export function isCherryError(error: unknown): error is CherryError {
  return error instanceof CherryError;
}

/** Helper to create error ResultAsync */
export function cherryErr<T>(error: CherryError): ResultAsync<T, CherryError> {
  return errAsync(error);
}
