---
# cherry-kkvd
title: hosting.de Domains API
status: todo
type: feature
created_at: 2026-01-26T15:52:04Z
updated_at: 2026-01-26T15:52:04Z
---

Implement Domains service (contacts, domains, jobs) from hosting.de docs.

## Checklist
- [ ] Add Contact schemas and routes: contactsFind, contactInfo, contactCreate, contactUpdate, contactUpdateIsIcannOwnerChange
- [ ] Add Domain schemas and routes: domainsFind, domainCreate, domainUpdate, domainUpdateIsIcannOwnerChange
- [ ] Add domainInfo and domainStatus (availability)
- [ ] Add lifecycle routes: domainDelete, domainWithdraw, domainDeletionCancel, domainRestore
- [ ] Add transfer routes: domainTransfer, domainTransferOutAck, domainTransferOutNack
- [ ] Add auth-info2 route: domainCreateAuthInfo2 (.de)
- [ ] Add Job schemas and jobsFind
- [ ] Export routes/types and add tests