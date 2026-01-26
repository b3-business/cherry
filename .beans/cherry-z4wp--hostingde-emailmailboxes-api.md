---
# cherry-z4wp
title: hosting.de Email/Mailboxes API
status: todo
type: feature
created_at: 2026-01-26T15:53:07Z
updated_at: 2026-01-26T15:53:07Z
---

Implement Email/Mailbox service endpoints and schemas from hosting.de docs.

## Checklist
- [ ] Add mailbox type schemas (ImapMailbox, Forwarder, SmtpForwarder, MailingList, Catchall)
- [ ] Add spam filtering and autoresponder settings schemas
- [ ] Implement mailboxCreate (all types) and mailboxUpdate
- [ ] Implement mailboxesFind
- [ ] Implement mailboxDelete, mailboxDeletionCancel, mailboxRestore, mailboxPurgeRestorable
- [ ] Implement checkEmailAddress
- [ ] Implement domainSettingsFind and domainSettingsUpdate
- [ ] Export routes/types and add tests