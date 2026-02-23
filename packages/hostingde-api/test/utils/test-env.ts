import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const DEMO_PORTAL_BASE_URL = "https://demo.hosting.de/";

function normalizeHost(rawValue: string | undefined, fallback: string): string {
  if (!rawValue) return fallback;

  const value = rawValue.trim();
  if (!value) return fallback;

  try {
    if (value.includes("://")) {
      return new URL(value).host;
    }

    if (value.includes("/")) {
      return new URL(`https://${value}`).host;
    }

    return value;
  } catch {
    return fallback;
  }
}

function normalizeApiToken(rawValue: string | undefined): string | undefined {
  if (!rawValue) return undefined;

  return rawValue.replace(/\\\$/g, "$");
}

function unquote(value: string): string {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function readTokenFromEnvFile(envFilePath: string): string | undefined {
  if (!existsSync(envFilePath)) return undefined;

  const content = readFileSync(envFilePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    if (!line.startsWith("HOSTING_DE_API_TOKEN_TEST1=")) continue;

    const fileValue = unquote(line.slice("HOSTING_DE_API_TOKEN_TEST1=".length));
    const normalized = normalizeApiToken(fileValue);
    return normalized && normalized.length > 0 ? normalized : undefined;
  }

  return undefined;
}

function resolveTest1Token(): string | undefined {
  // Prefer raw .env file value to avoid interpolation/escaping edge cases.
  const fileToken =
    readTokenFromEnvFile(resolve(process.cwd(), "packages/hostingde-api/.env")) ??
    readTokenFromEnvFile(resolve(process.cwd(), ".env"));

  if (fileToken) return fileToken;

  return normalizeApiToken(process.env.HOSTING_DE_API_TOKEN_TEST1);
}

const defaultDemoHost = new URL(DEMO_PORTAL_BASE_URL).host;
const defaultApiHost = "secure.hosting.de";

export const hostingDeApiDemoHost = normalizeHost(process.env.HOSTINGDE_API_DEMO_HOST, defaultDemoHost);
export const hostingDeApiHost = normalizeHost(process.env.HOSTINGDE_API_HOST, defaultApiHost);

export const hostingDeDemoApiBaseUrl = `https://${hostingDeApiDemoHost}/api/`;
export const hostingDeApiBaseUrl = `https://${hostingDeApiHost}/api/`;

export const hostingDeDemoDnsJsonApiBaseUrl = `https://${hostingDeApiDemoHost}/api/dns/v1/json`;

export const hostingDeTest1ApiToken = resolveTest1Token();
