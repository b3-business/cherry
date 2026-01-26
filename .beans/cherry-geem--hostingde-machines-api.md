---
# cherry-geem
title: hosting.de Machines API
status: todo
type: feature
created_at: 2026-01-26T15:52:29Z
updated_at: 2026-01-26T15:52:29Z
---

Implement Machines service endpoints and schemas from hosting.de docs.

## Checklist
- [ ] Add VirtualMachine schema and related request/response types
- [ ] Implement virtualMachinesFind and virtualMachineCreate
- [ ] Implement virtualMachineInstall
- [ ] Implement virtualMachineEnableRescue and virtualMachineDisableRescue
- [ ] Implement virtualMachineChangeProduct
- [ ] Implement virtualMachineDelete and virtualMachinePurgeRestorable
- [ ] Implement power actions: virtualMachinePowerOn/PowerOff/Shutdown/Reboot/Reset
- [ ] Export routes/types and add tests