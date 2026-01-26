---
# cherry-iuim
title: 'hosting.de DNS: implement remaining endpoints'
status: todo
type: feature
created_at: 2026-01-26T15:51:53Z
updated_at: 2026-01-26T15:51:53Z
---

Implement DNS routes and schemas that are listed in docs but not in src.

## Checklist
- [ ] Add schemas for DNSSEC options/keys/DS data and template values/replacements
- [ ] Implement zoneCreate and zoneRecreate
- [ ] Implement recordsUpdate and resourceRecordSetUpdate
- [ ] Implement zoneDelete, zoneRestore, zonePurgeRestorable
- [ ] Implement changeContent, zonesUntieFromTemplate, zonesTieToTemplate
- [ ] Implement nameserverSetCreate, nameserverSetUpdate, nameserverSetDelete, nameserverSetGetDefault
- [ ] Implement recordTemplatesFind
- [ ] Implement templateCreate, templateRecreate, templateUpdate, templateDelete
- [ ] Export routes/types from index and add tests