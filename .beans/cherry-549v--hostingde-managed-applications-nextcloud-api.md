---
# cherry-549v
title: hosting.de Managed Applications (Nextcloud) API
status: todo
type: feature
created_at: 2026-01-26T15:53:19Z
updated_at: 2026-01-26T15:53:19Z
---

Implement Managed Applications (Nextcloud) service endpoints and schemas from hosting.de docs.

## Checklist
- [ ] Add Nextcloud object schemas (users, groups, groupfolders, apps, configs)
- [ ] Implement nextcloudsFind, nextcloudCreate, nextcloudUpdate
- [ ] Implement nextcloudUsersFind and nextcloudModifyUsers
- [ ] Implement nextcloudGroupsFind
- [ ] Implement nextcloudModifyGroupFolders
- [ ] Implement nextcloudAppsList and nextcloudAppGetConfiguration
- [ ] Export routes/types and add tests