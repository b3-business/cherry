// Clean up test TXT records from tt-bj2.de
const token = process.env.HOSTING_DE_API_TOKEN;

// Get the zone
const findResp = await fetch("https://secure.hosting.de/api/dns/v1/json/zonesFind", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ 
    authToken: token, 
    filter: { field: "zoneName", value: "tt-bj2.de", relation: "equal" },
  }),
});
const findJson = await findResp.json();
const zone = findJson.response.data[0];

// Find all test records
const testRecords = zone.records.filter((r: any) => r.name.includes("_clawd-test"));
console.log(`Found ${testRecords.length} test records to delete`);

if (testRecords.length > 0) {
  // Delete them
  const response = await fetch("https://secure.hosting.de/api/dns/v1/json/zoneUpdate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      authToken: token, 
      zoneConfig: { 
        name: "tt-bj2.de",
        type: zone.zoneConfig.type,
        emailAddress: zone.zoneConfig.emailAddress,
        dnsSecMode: zone.zoneConfig.dnsSecMode,
      },
      recordsToDelete: testRecords.map((r: any) => ({ id: r.id })),
    }),
  });

  const json = await response.json();
  console.log(`Delete status: ${json.status}`);
  if (json.errors?.length > 0) {
    console.log("Errors:", json.errors);
  }
}
