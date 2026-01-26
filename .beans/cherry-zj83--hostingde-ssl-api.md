---
# cherry-zj83
title: hosting.de SSL API
status: todo
type: feature
created_at: 2026-01-26T15:52:14Z
updated_at: 2026-01-26T15:52:14Z
---

Implement SSL service endpoints and schemas from hosting.de docs.

## Checklist
- [ ] Add Certificate/Order/CSR/Contact/Organization schemas
- [ ] Implement certificatesFind
- [ ] Implement domainApproverList
- [ ] Implement csrDecode and checkAutoValidationCapable
- [ ] Implement orderCreate and orderCancel
- [ ] Implement certificateDetailsGet and certificateGet
- [ ] Implement orderResendApproverEmail
- [ ] Implement certificateRevoke and certificateReissue
- [ ] Export routes/types and add tests