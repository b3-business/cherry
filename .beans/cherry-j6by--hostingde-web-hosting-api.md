---
# cherry-j6by
title: hosting.de Web Hosting API
status: todo
type: feature
created_at: 2026-01-26T15:52:44Z
updated_at: 2026-01-26T15:52:44Z
---

Implement Web Hosting service endpoints and schemas from hosting.de docs.

## Checklist
- [ ] Add Webspace/User/VHost/CronJob/SSL settings/PHP config schemas
- [ ] Implement webspacesFind, webspaceCreate, webspaceUpdate, webspaceDelete
- [ ] Implement usersFind, userCreate, userUpdate, userDelete
- [ ] Implement vhostsFind, vhostCreate, vhostUpdate, vhostDelete, vhostRestore
- [ ] Implement vhostActivateSsl
- [ ] Implement phpConfigurationMetadata, vhostPhpIniDefault, vhostPhpIniList
- [ ] Implement phpversions
- [ ] Export routes/types and add tests