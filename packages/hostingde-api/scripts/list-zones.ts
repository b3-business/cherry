#!/usr/bin/env bun
/**
 * List all DNS zones from hosting.de
 * 
 * Usage: bun run scripts/list-zones.ts
 * Requires: HOSTING_DE_API_TOKEN in .env or environment
 */

import { createHostingDeClient, zonesFind } from "../src/index";

const token = process.env.HOSTING_DE_API_TOKEN;
if (!token) {
  console.error("❌ Missing HOSTING_DE_API_TOKEN");
  process.exit(1);
}

const client = createHostingDeClient({
  apiToken: token,
  routes: { zonesFind },
});

console.log("🔍 Fetching zones from hosting.de...\n");

const result = await client.zonesFind({ limit: 100 });

if (result.isErr()) {
  console.error("❌ Error:", result.error);
  process.exit(1);
}

const { response } = result.value;
const activeZones = response.data.filter(z => z.zoneConfig.status === "active");
console.log(`Found ${activeZones.length} active zones:\n`);

for (const zone of activeZones) {
  const { zoneConfig, records } = zone;
  console.log(`📁 ${zoneConfig.name}`);
  console.log(`   ID: ${zoneConfig.id}`);
  console.log(`   Type: ${zoneConfig.type} | Status: ${zoneConfig.status}`);
  console.log(`   Records: ${records.length}`);
  console.log(`   Last changed: ${zoneConfig.lastChangeDate}`);
  console.log("");
}

console.log(`---`);
console.log(`Active: ${activeZones.length} / ${response.totalEntries} total`);
