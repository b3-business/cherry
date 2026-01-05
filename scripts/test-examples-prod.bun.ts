import { $ } from "bun";
import { join } from "path";

const ROOT_DIR = join(import.meta.dir, "..");
const EXAMPLES_PROD = join(ROOT_DIR, "examples-prod");

const variants = {
  bun: ["todo-jsr-bun", "todo-npm-bun"],
  npm: ["todo-jsr-npm", "todo-npm-npm"],
  deno: ["todo-jsr-deno", "todo-npm-deno"],
} as const;

console.log("=== Testing examples-prod packages ===\n");

for (const variant of variants.bun) {
  const dir = join(EXAMPLES_PROD, variant);
  console.log(`>>> ${variant} (bun)`);
  await $`bun install && bun test`.cwd(dir);
  console.log();
}

for (const variant of variants.npm) {
  const dir = join(EXAMPLES_PROD, variant);
  console.log(`>>> ${variant} (npm)`);
  await $`npm install && npm test`.cwd(dir);
  console.log();
}

for (const variant of variants.deno) {
  const dir = join(EXAMPLES_PROD, variant);
  console.log(`>>> ${variant} (deno)`);
  await $`deno install && deno task test`.cwd(dir);
  console.log();
}

console.log("=== All examples-prod tests completed ===");
