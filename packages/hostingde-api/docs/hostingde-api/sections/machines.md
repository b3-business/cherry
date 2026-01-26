# Machines
The machine section of the API allows you to create and manage virtual machines.
The object that describes a virtual machine is the [Virtual Machine](https://www.hosting.de/api/#the-virtualmachine-object) object.
## The VirtualMachine Object
#### VirtualMachine Object
Property | Type | Required / Direction | Description  
---|---|---|---  
accountId | string | out-only | ID of account that manages this virtual machine. This field is never used in requests.  
id | string | see description | ID of this virtual machine. Ignored in vm create requests. This property is required in all other requests regarding virtual machine management.  
name | string | required | Virtual machine name  
description | string | optional | Custom description for virtual machine  
product | string | required | Product code of the virtual machine which defines its main properties.  
memory | int | out-only | RAM memory capacity of the virtual machine  
cpuNumber | int | out-only | Number of CPU cores assigned to the virtual machine  
architecture | string | out-only | Architecture of the virtual machine  
status | string | out-only | Status of the virtual machine  
ipAddress | string | out-only | IP address assigned to the virtual machine during creation or migration  
rdns | string | out-only | Reverse DNS entry to the virtual machine’s IP address.  
power | string | out-only | Describes the virtual machine’s power status: `on` or `off`  
rescue | string | out-only | Indicates whether the virtual machine is in rescue mode:`on` or `off`  
disks | Disk | out-only | Shows the virtual machine’s disks (cf. description of disk object in according section)  
networkInterfaces | NetworkInterface | out-only | Shows the virtual machine’s network interfaces (cf. description of network interface object in according section)  
paidUntil | datetime | out-only | Time that the virtual machine is paid for  
renewOn | datetime | out-only | Time of the next automatic debit of accounting period. This point of time is always before the paidUntil time. renewOn time calculation: subtract the notice period from paidUntil time  
addDate | datetime | out-only | Date and time the contact was created in the system  
lastChangeDate | datetime | out-only | Last date and time the contact was modified  
## Listing Virtual Machines
> ##### POST https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachinesFind 
```
﻿{
    ...
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "virtualMachineName",
        "value": "test vm"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "virtualMachineName",
        "order": "asc"
    }
}
```

```
﻿<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <filter>
  <field>virtualMachineName</field>
  <value>test vm</value>
 </filter>
 <limit>10</limit>
 <page>1</page>
 <sort>
  <field>virtualMachineName</field>
  <order>asc</order>
 </sort>
</request>
```

> ##### Response
```
﻿{
    ...
    "response": {
        "data": [
            // vm objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 15,
        "totalPages": 2,
        "type": "FindVirtualMachinesResult"
    },
    ...
}
```

```
﻿<response>
 <response>
  <data>
   ...
  </data>
  <limit>10</limit>
  <page>1</page>
  <totalEntries>15</totalEntries>
  <totalPages>2</totalPages>
  <type>FindVirtualMachinesResult</type>
 </response>
 ...
</response>
```

Request | virtualMachinesFind  
---|---  
Url |  https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachinesFind  
Processing | synchronous  
Response | [FindVirtualMachinesResult](https://www.hosting.de/api/#filtering-and-sorting)  
Listing virtual machines uses the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `virtualMachinesFind`. The response will contain a list of [VirtualMachine objects](https://www.hosting.de/api/#the-virtualmachine-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | ID of account managing the virtual machine  
VirtualMachineId | ID of virtual machine  
VirtualMachineName | Name of virtual machine  
VirtualMachineDescription | Description of virtual machine  
VirtualMachineProductCode | Virtual machine product code  
VirtualMachineMemory | Virtual machine assigned RAM  
VirtualMachineCpuNumber | Virtual machine assigned cpu cores  
VirtualMachineArchitecture | Architecture of virtual machine  
VirtualMachineStatus | Status of virtual machine  
VirtualMachinePower | Power status of virtual machine  
VirtualMachineRescue | Rescue mode status of virtual machine  
VirtualMachineIpAddress | IP address of virtual machine  
VirtualMachineDeletionScheduledFor | Deletion date and time of virtual machine  
VirtualMachinePaidUntil | Date and Time until virtual machine is paid for  
VirtualMachineRenewOn | Date and Time of next automatic renewal (and payment)  
VirtualMachineAddDate | Date and time virtual machine was created  
VirtualMachineLastChangeDate | Date and time of last modification  
## Creating Virtual Machines
> ##### POST https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineCreate 
```
﻿{
    ...
    "authToken": "$$YOUR API KEY$$",    
    "virtualMachine": {
      "name": "example vm",
      "productCode": "machine-virtualmachine-small-v1-1m",
      "description": "test vm",
      "backupEnabled": false
    }    
}

```

```
﻿<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <virtualMachine>
  <description>test vms</description>
  <name>example vm</name>
  <productCode>machine-virtualmachine-small-v1-1m</productCode>
 </virtualMachine>
</request>

```

> ##### Response
```
﻿{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",                                     // generated id
    "accountId": "15010100000001",                                   // account id used for creation
    "name": "example vm",
    "description": "test vm",
    "productCode": "machine-virtualmachine-small-v1-1m",
    "memory": 1024,
    "cpuNumber": 1,
    "architecture": "x86_64",
    "ipAddress": "",                                                 // the ip address will be assigned later
    "networkInterfaces": [
      {
        "mac": "1a:01:b7:4e:32:d3"
      }
    ],
    "status": "creating",
    "power": "off",
    "rescue": "off",
    "rdns": null,
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,   
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
  }  
}
```

```
﻿<response>
 <response>  
  <response>
    <id>150101aaaaaaaaaa001</id>                                     // generated id
    <accountId>15010100000001</accountId>                            // account id used for creation
    <name>example vm</name>
    <description>test vm</description>
    <productCode>machine-virtualmachine-small-v1-1m</productCode>
    <memory>1024</memory>
    <cpuNumber>1</cpuNumber>
    <architecture>x86_64</architecture>
    <ipAddress></ipAddress>                                          // the ip address will be assigned later
    <networkInterfaces>
      <item>
        <mac>1a:01:b7:4e:32:d3</mac>
      </item>
    </networkInterfaces>
    <status>creating</status>
    <power>off</power>
    <rescue>off</rescue>
    <rdns></rdns>
    <paidUntil>2016-02-01T15:57:35Z</paidUntil>
    <renewOn>2016-01-31T15:57:35Z</renewOn>
    <deletionScheduledFor></deletionScheduledFor>
    <restorableUntil></restorableUntil>
    <addDate>2016-01-01T15:57:35Z</addDate>
    <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>
```

Request | virtualMachineCreate  
---|---  
Url |  https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineCreate  
Processing | asynchronous  
Response | [VirtualMachine object](https://www.hosting.de/api/#the-virtualmachine-object)  
This method is used to create new virtual machines. It takes a [VirtualMachine object](https://www.hosting.de/api/#the-virtualmachine-object) as a parameter. The required properties that have to be specified in order to create a virtual machine are `name` and `product code`.
The response will be a temporary status of your object, so it might not display or differ from its final status after the creation. After fully creating the virtual machine, all properties of the object will be completed. It can be retrieved by the [virtualMachinesFind](https://www.hosting.de/api/#listing-virtual-machines) method.
## Install OS Image on a Virtual Machine
```
﻿{
    ...
    "authToken": "$$YOUR API KEY$$",
    "virtualMachineId": "150101aaaaaaaaaa001",
    "json": "{ \"rootUserKeys\": \"\", \"rootUserPass\": \"yourpassword\" }",
    "osId": "debian-bullseye"
}
```

```
﻿<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <virtualMachineId>150101aaaaaaaaaa001</virtualMachineId>
 <json>{ "rootUserKeys": "", "rootUserPass": "yourpassword" }</json>
 <osId>debian-bullseye</odId>
</request>
```

> ##### Response
```
﻿{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "name": "example vm",
    "description": "test vm",
    "productCode": "machine-virtualmachine-small-v1-1m",
    "memory": 1024,
    "cpuNumber": 1,
    "architecture": "x86_64",
    "ipAddress": "192.0.2.2",
    "networkInterfaces": [
      {
        "mac": "1a:01:b7:4e:32:d3"
      }
    ],
    "status": "active",
    "power": "on",
    "rescue": "off",
    "rdns": null,
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,   
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
  }  
}
```

```
﻿<response>
 <response>  
  <response>
    <id>150101aaaaaaaaaa001</id>
    <accountId>15010100000001</accountId>
    <name>example vm</name>
    <description>test vm</description>
    <productCode>machine-virtualmachine-small-v1-1m</productCode>
    <memory>1024</memory>
    <cpuNumber>1</cpuNumber>
    <architecture>x86_64</architecture>
    <ipAddress>192.0.2.2</ipAddress>
    <networkInterfaces>
      <item>
        <mac>1a:01:b7:4e:32:d3</mac>
      </item>
    </networkInterfaces>
    <status>active</status>
    <power>on</power>
    <rescue>off</rescue>
    <rdns></rdns>
    <paidUntil>2016-02-01T15:57:35Z</paidUntil>
    <renewOn>2016-01-31T15:57:35Z</renewOn>
    <deletionScheduledFor></deletionScheduledFor>
    <restorableUntil></restorableUntil>
    <addDate>2016-01-01T15:57:35Z</addDate>
    <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>
```

Request | virtualMachineInstall  
---|---  
Url |  https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineInstall  
Processing | asynchronous  
Response | [VirtualMachine object](https://www.hosting.de/api/#the-virtualmachine-object)  
In our example we install a Debian OS. Other operating systems may need other variables. One can receive a list of possible operating systems with the `osInstallerList` method. In the `applications` variable of this method one can find the possible variables for any OS. The variables must be passed as JSON string in `json`.
## Enabling Rescue Mode
> ##### POST https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineEnableRescue 
```
﻿{
    ...
    "authToken": "$$YOUR API KEY$$",    
    "virtualMachineId": "150101aaaaaaaaaa001",
    "rootPassword" : "jaDr49Ang!sd2eonH",
    "publicKeys" : [],
    "reset" : true
}
```

```
﻿<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <virtualMachineId>150101aaaaaaaaaa001</virtualMachineId>
 <rootPasswort>jaDr49Ang!sd2eonH</rootPasswort>
 <publicKeys></publicKeys>
 <reset>true</reset> 
</request>
```

> ##### Response
```
﻿{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "name": "example vm",
    "description": "test vm",
    "productCode": "machine-virtualmachine-small-v1-1m",
    "memory": 1024,
    "cpuNumber": 1,
    "architecture": "x86_64",
    "ipAddress": "192.0.2.2",
    "networkInterfaces": [
      {
        "mac": "1a:01:b7:4e:32:d3"
      }
    ],
    "status": "active",
    "power": "on",
    "rescue": "off",
    "rdns": null,
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,   
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
  }  
}
```

```
﻿<response>
 <response>  
  <response>
    <id>150101aaaaaaaaaa001</id>
    <accountId>15010100000001</accountId>
    <name>example vm</name>
    <description>test vm</description>
    <productCode>machine-virtualmachine-small-v1-1m</productCode>
    <memory>1024</memory>
    <cpuNumber>1</cpuNumber>
    <architecture>x86_64</architecture>
    <ipAddress>192.0.2.2</ipAddress>
    <networkInterfaces>
      <item>
        <mac>1a:01:b7:4e:32:d3</mac>
      </item>
    </networkInterfaces>
    <status>active</status>
    <power>on</power>
    <rescue>off</rescue>
    <rdns></rdns>
    <paidUntil>2016-02-01T15:57:35Z</paidUntil>
    <renewOn>2016-01-31T15:57:35Z</renewOn>
    <deletionScheduledFor></deletionScheduledFor>
    <restorableUntil></restorableUntil>
    <addDate>2016-01-01T15:57:35Z</addDate>
    <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>
```

Request | virtualMachineEnableRescue  
---|---  
Url |  https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineEnableRescue  
Processing | asynchronous  
Response | [VirtualMachine object](https://www.hosting.de/api/#the-virtualmachine-object)  
This method enables the rescue mode for the virtual machine. If the virtual machine is already in rescue mode, you will not be able to turn it on again.
Setting a rescue mode password is mandatory. Additionally, you are able to supply public SSH keys for the access. When rescue mode is activated, the virtual machine will boot in this mode the next time you restart the system. The ‘reset’ parameter lets you decide whether you want to restart the machine manually or the machine should restart automatically after the configuration is done.
After successfully completing the job for enabling the rescue mode and restarting the virtual machine, you can access it with the specified access options.
Please note that it is not possible to install operating systems via the OS installer in rescue mode.
It is important to notice that the rescue mode will not be disabled automatically. You must disable it using the [virtualMachineDisableRescue](https://www.hosting.de/api/#disabling-rescue-mode).
## Disabling Rescue Mode
> ##### POST https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineDisableRescue 
```
﻿{
    ...
    "authToken": "$$YOUR API KEY$$",    
    "virtualMachineId": "150101aaaaaaaaaa001",
    "reset" : true
}
```

```
﻿<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <virtualMachineId>150101aaaaaaaaaa001</virtualMachineId>
 <reset>true</reset> 
</request>
```

> ##### Response
```
﻿{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "name": "example vm",
    "description": "test vm",
    "productCode": "machine-virtualmachine-small-v1-1m",
    "memory": 1024,
    "cpuNumber": 1,
    "architecture": "x86_64",
    "ipAddress": "192.0.2.2",                                        
    "networkInterfaces": [
      {
        "mac": "1a:01:b7:4e:32:d3"
      }
    ],
    "status": "active",
    "power": "on",
    "rescue": "on",
    "rdns": null,
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,   
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
  }  
}
```

```
﻿<response>
 <response>  
  <response>
    <id>150101aaaaaaaaaa001</id>
    <accountId>15010100000001</accountId>
    <name>example vm</name>
    <description>test vm</description>
    <productCode>machine-virtualmachine-small-v1-1m</productCode>
    <memory>1024</memory>
    <cpuNumber>1</cpuNumber>
    <architecture>x86_64</architecture>
    <ipAddress>192.0.2.2</ipAddress>
    <networkInterfaces>
      <item>
        <mac>1a:01:b7:4e:32:d3</mac>
      </item>
    </networkInterfaces>
    <status>active</status>
    <power>on</power>
    <rescue>on</rescue>
    <rdns></rdns>
    <paidUntil>2016-02-01T15:57:35Z</paidUntil>
    <renewOn>2016-01-31T15:57:35Z</renewOn>
    <deletionScheduledFor></deletionScheduledFor>
    <restorableUntil></restorableUntil>
    <addDate>2016-01-01T15:57:35Z</addDate>
    <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>
```

Request | virtualMachineDisableRescue  
---|---  
Url |  https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineDisableRescue  
Processing | asynchronous  
Response | [VirtualMachine object](https://www.hosting.de/api/#the-virtualmachine-object)  
This method disables the rescue mode of the virtual machine. It is only possible to disable it for machines that are currently in rescue mode. After disabling rescue mode, the virtual machine will boot the currently installed operating system (as usual), the next time you start the machine. You can set the ‘reset’ parameter to ‘true’ to run the machine’s restart automatically at the and of the rescue mode disabling process.
## Changing the Virtual Machine Product Code
> ##### POST https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineChangeProduct 
```
﻿{
    ...
    "authToken": "$$YOUR API KEY$$",    
    "virtualMachineId": "150101aaaaaaaaaa001",
    "productCode" : "machine-virtualmachine-large-v1-1m"    
}
```

```
﻿<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <virtualMachineId>150101aaaaaaaaaa001</virtualMachineId>
 <productCode>machine-virtualmachine-large-v1-1m</productCode> 
</request>
```

> ##### Response
```
﻿{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "name": "example vm",
    "description": "test vm",
    "productCode": "machine-virtualmachine-large-v1-1m",
    "memory": 1024,
    "cpuNumber": 1,
    "architecture": "x86_64",
    "ipAddress": "192.0.2.2",
    "networkInterfaces": [
      {
        "mac": "1a:01:b7:4e:32:d3"
      }
    ],
    "status": "active",
    "power": "on",
    "rescue": "off",
    "rdns": null,
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,   
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
  }  
}
```

```
﻿<response>
 <response>  
  <response>
    <id>150101aaaaaaaaaa001</id>
    <accountId>15010100000001</accountId>
    <name>example vm</name>
    <description>test vm</description>
    <productCode>machine-virtualmachine-large-v1-1m</productCode>
    <memory>1024</memory>
    <cpuNumber>1</cpuNumber>
    <architecture>x86_64</architecture>
    <ipAddress>192.0.2.2</ipAddress>
    <networkInterfaces>
      <item>
        <mac>1a:01:b7:4e:32:d3</mac>
      </item>
    </networkInterfaces>
    <status>active</status>
    <power>on</power>
    <rescue>off</rescue>
    <rdns></rdns>
    <paidUntil>2016-02-01T15:57:35Z</paidUntil>
    <renewOn>2016-01-31T15:57:35Z</renewOn>
    <deletionScheduledFor></deletionScheduledFor>
    <restorableUntil></restorableUntil>
    <addDate>2016-01-01T15:57:35Z</addDate>
    <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>
```

Request | virtualMachineChangeProduct  
---|---  
Url |  https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineChangeProduct  
Processing | asynchronous  
Response | [VirtualMachine object](https://www.hosting.de/api/#the-virtualmachine-object)  
Every virtual machine has a `product code` parameter that defines the major characteristics of the machine, e.g. CPU core numbers, RAM, disc capacity, etc. Using the `virtualMachineChangeProductCode`, you can change the product code of the virtual machine, upgrading or downgrading to the selected code.
The changes will take effect after the next restart of the virtual machine. You can set the ‘reset’ parameter of the method to ‘true’ to restart the virtual machine automatically after the machine’s properties are adjusted according to the chosen product.
## Deleting Virtual Machines
> ##### POST https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineDelete 
```
﻿{
    ...
    "authToken": "$$YOUR API KEY$$",    
    "virtualMachineId": "150101aaaaaaaaaa001"
}
```

```
﻿<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <virtualMachineId>150101aaaaaaaaaa001</virtualMachineId> 
</request>
```

> ##### Response
```
﻿{
  ...
  "status": "pending"
}
```

```
﻿<response>
 <response>  
   <status>pending</status>
 ...
</response>
```

Request | virtualMachineDelete  
---|---  
Url |  https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineDelete  
Processing | asynchronous  
Response | none  
This method deletes a virtual machine. It will be in status `restorable` for 7 days, afterwards it will removed automatically.
## Purging Virtual Machines
> ##### POST https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachinePurgeRestorable 
```
﻿{
    ...
    "authToken": "$$YOUR API KEY$$",    
    "virtualMachineId": "150101aaaaaaaaaa001"
}
```

```
﻿<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <virtualMachineId>150101aaaaaaaaaa001</virtualMachineId> 
</request>
```

> ##### Response
```
﻿{
  ...
  "status": "pending"
}
```

```
﻿<response>
 <response>  
   <status>pending</status>
 ...
</response>
```

Request | virtualMachinePurgeRestorable  
---|---  
Url |  https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachinePurgeRestorable  
Processing | asynchronous  
Response | none  
This method removes a restorable object permanently. You will not be able to restore it afterwards.
## Power Management
The API provides convenient methods to manage the power status of virtual machines. All power management methods take only one parameter - the ID of the virtual machine.
## Power On
> ##### POST https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachinePowerOn 
```
﻿{
    ...
    "authToken": "$$YOUR API KEY$$",    
    "virtualMachineId": "150101aaaaaaaaaa001"
}
```

```
﻿<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <virtualMachineId>150101aaaaaaaaaa001</virtualMachineId> 
</request>
```

> ##### Response
```
﻿{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "name": "example vm",
    "description": "test vm",
    "productCode": "machine-virtualmachine-small-v1-1m",
    "memory": 1024,
    "cpuNumber": 1,
    "architecture": "x86_64",
    "ipAddress": "192.0.2.2",
    "networkInterfaces": [
      {
        "mac": "1a:01:b7:4e:32:d3"
      }
    ],
    "status": "active",
    "power": "off",
    "rescue": "off",
    "rdns": null,
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,   
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
  }  
}
```

```
﻿<response>
 <response>  
  <response>
    <id>150101aaaaaaaaaa001</id>
    <accountId>15010100000001</accountId>
    <name>example vm</name>
    <description>test vm</description>
    <productCode>machine-virtualmachine-small-v1-1m</productCode>
    <memory>1024</memory>
    <cpuNumber>1</cpuNumber>
    <architecture>x86_64</architecture>
    <ipAddress>192.0.2.2</ipAddress>
    <networkInterfaces>
      <item>
        <mac>1a:01:b7:4e:32:d3</mac>
      </item>
    </networkInterfaces>
    <status>active</status>
    <power>off</power>
    <rescue>off</rescue>
    <rdns></rdns>
    <paidUntil>2016-02-01T15:57:35Z</paidUntil>
    <renewOn>2016-01-31T15:57:35Z</renewOn>
    <deletionScheduledFor></deletionScheduledFor>
    <restorableUntil></restorableUntil>
    <addDate>2016-01-01T15:57:35Z</addDate>
    <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>
```

Request | virtualMachinePowerOn  
---|---  
Url |  https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachinePowerOn  
Processing | asynchronous  
Response | [VirtualMachine object](https://www.hosting.de/api/#the-virtualmachine-object)  
You can use the [virtualMachinePowerOn](https://www.hosting.de/api/#power-on) method to turn on a virtual machine.
## Power Off
> ##### POST https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachinePowerOff 
```
﻿{
    ...
    "authToken": "$$YOUR API KEY$$",    
    "virtualMachineId": "150101aaaaaaaaaa001"
}
```

```
﻿<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <virtualMachineId>150101aaaaaaaaaa001</virtualMachineId> 
</request>
```

> ##### Response
```
﻿{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "name": "example vm",
    "description": "test vm",
    "productCode": "machine-virtualmachine-small-v1-1m",
    "memory": 1024,
    "cpuNumber": 1,
    "architecture": "x86_64",
    "ipAddress": "192.0.2.2",
    "networkInterfaces": [
      {
        "mac": "1a:01:b7:4e:32:d3"
      }
    ],
    "status": "active",
    "power": "on",
    "rescue": "off",
    "rdns": null,
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,   
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
  }  
}
```

```
﻿<response>
 <response>  
  <response>
    <id>150101aaaaaaaaaa001</id>
    <accountId>15010100000001</accountId>
    <name>example vm</name>
    <description>test vm</description>
    <productCode>machine-virtualmachine-small-v1-1m</productCode>
    <memory>1024</memory>
    <cpuNumber>1</cpuNumber>
    <architecture>x86_64</architecture>
    <ipAddress>192.0.2.2</ipAddress>
    <networkInterfaces>
      <item>
        <mac>1a:01:b7:4e:32:d3</mac>
      </item>
    </networkInterfaces>
    <status>active</status>
    <power>on</power>
    <rescue>off</rescue>
    <rdns></rdns>
    <paidUntil>2016-02-01T15:57:35Z</paidUntil>
    <renewOn>2016-01-31T15:57:35Z</renewOn>
    <deletionScheduledFor></deletionScheduledFor>
    <restorableUntil></restorableUntil>
    <addDate>2016-01-01T15:57:35Z</addDate>
    <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>
```

Request | virtualMachinePowerOff  
---|---  
Url |  https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachinePowerOff  
Processing | asynchronous  
Response | [VirtualMachine object](https://www.hosting.de/api/#the-virtualmachine-object)  
The [virtualMachinePowerOff](https://www.hosting.de/api/#power-off) method lets you turn off a virtual machine. It basically emulates unplugging the machine’s power adapter.
## Shutdown
> ##### POST https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineShutdown 
```
﻿{
    ...
    "authToken": "$$YOUR API KEY$$",    
    "virtualMachineId": "150101aaaaaaaaaa001"
}
```

```
﻿<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <virtualMachineId>150101aaaaaaaaaa001</virtualMachineId> 
</request>
```

> ##### Response
```
﻿{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "name": "example vm",
    "description": "test vm",
    "productCode": "machine-virtualmachine-small-v1-1m",
    "memory": 1024,
    "cpuNumber": 1,
    "architecture": "x86_64",
    "ipAddress": "192.0.2.2",
    "networkInterfaces": [
      {
        "mac": "1a:01:b7:4e:32:d3"
      }
    ],
    "status": "active",
    "power": "on",
    "rescue": "off",
    "rdns": null,
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,   
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
  }  
}
```

```
﻿<response>
 <response>  
  <response>
    <id>150101aaaaaaaaaa001</id>
    <accountId>15010100000001</accountId>
    <name>example vm</name>
    <description>test vm</description>
    <productCode>machine-virtualmachine-small-v1-1m</productCode>
    <memory>1024</memory>
    <cpuNumber>1</cpuNumber>
    <architecture>x86_64</architecture>
    <ipAddress>192.0.2.2</ipAddress>
    <networkInterfaces>
      <item>
        <mac>1a:01:b7:4e:32:d3</mac>
      </item>
    </networkInterfaces>
    <status>active</status>
    <power>on</power>
    <rescue>off</rescue>
    <rdns></rdns>
    <paidUntil>2016-02-01T15:57:35Z</paidUntil>
    <renewOn>2016-01-31T15:57:35Z</renewOn>
    <deletionScheduledFor></deletionScheduledFor>
    <restorableUntil></restorableUntil>
    <addDate>2016-01-01T15:57:35Z</addDate>
    <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>
```

Request | virtualMachineShutdown  
---|---  
Url |  https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineShutdown  
Processing | asynchronous  
Response | [VirtualMachine object](https://www.hosting.de/api/#the-virtualmachine-object)  
By using the [virtualMachineShutdown](https://www.hosting.de/api/#shutdown) method you can gracefully shutdown a virtual machine. It will receive an ACPI shutdown request. If the currently installed operating system of the virtual machine does not handle ACPI request, this method will have no effect.
All operating systems you installed by using our installer system will automatically handle ACPI requests. For any other custom installations, you need to ensure that those request are handled properly.
## Reboot
> ##### POST https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineReboot 
```
﻿{
    ...
    "authToken": "$$YOUR API KEY$$",    
    "virtualMachineId": "150101aaaaaaaaaa001"
}
```

```
﻿<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <virtualMachineId>150101aaaaaaaaaa001</virtualMachineId> 
</request>
```

> ##### Response
```
﻿{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "name": "example vm",
    "description": "test vm",
    "productCode": "machine-virtualmachine-small-v1-1m",
    "memory": 1024,
    "cpuNumber": 1,
    "architecture": "x86_64",
    "ipAddress": "192.0.2.2",
    "networkInterfaces": [
      {
        "mac": "1a:01:b7:4e:32:d3"
      }
    ],
    "status": "active",
    "power": "on",
    "rescue": "off",
    "rdns": null,
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,   
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
  }  
}
```

```
﻿<response>
 <response>  
  <response>
    <id>150101aaaaaaaaaa001</id>
    <accountId>15010100000001</accountId>
    <name>example vm</name>
    <description>test vm</description>
    <productCode>machine-virtualmachine-small-v1-1m</productCode>
    <memory>1024</memory>
    <cpuNumber>1</cpuNumber>
    <architecture>x86_64</architecture>
    <ipAddress>192.0.2.2</ipAddress>
    <networkInterfaces>
      <item>
        <mac>1a:01:b7:4e:32:d3</mac>
      </item>
    </networkInterfaces>
    <status>active</status>
    <power>on</power>
    <rescue>off</rescue>
    <rdns></rdns>
    <paidUntil>2016-02-01T15:57:35Z</paidUntil>
    <renewOn>2016-01-31T15:57:35Z</renewOn>
    <deletionScheduledFor></deletionScheduledFor>
    <restorableUntil></restorableUntil>
    <addDate>2016-01-01T15:57:35Z</addDate>
    <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>
```

Request | virtualMachineReboot  
---|---  
Url |  https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineReboot  
Processing | asynchronous  
Response | [VirtualMachine object](https://www.hosting.de/api/#the-virtualmachine-object)  
By using the [virtualMachineReboot](https://www.hosting.de/api/#reboot) method you can gracefully reboot a virtual machine. Similarly to the [virtualMachineShutdown](https://www.hosting.de/api/#shutdown) method the virtual machine will also receive an ACPI request - this time for a reboot. If the currently installed operating system does not handle ACPI requests, this method will have no effect.
All operating systems you installed by using our installer system will automatically handle ACPI requests. For any other custom installations, you need to ensure that the ACPI requests are handled properly.
## Reset
> ##### POST https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineReset 
```
﻿{
    ...
    "authToken": "$$YOUR API KEY$$",    
    "virtualMachineId": "150101aaaaaaaaaa001"
}
```

```
﻿<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <virtualMachineId>150101aaaaaaaaaa001</virtualMachineId> 
</request>
```

> ##### Response
```
﻿{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "name": "example vm",
    "description": "test vm",
    "productCode": "machine-virtualmachine-small-v1-1m",
    "memory": 1024,
    "cpuNumber": 1,
    "architecture": "x86_64",
    "ipAddress": "192.0.2.2",
    "networkInterfaces": [
      {
        "mac": "1a:01:b7:4e:32:d3"
      }
    ],
    "status": "active",
    "power": "on",
    "rescue": "off",
    "rdns": null,
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,   
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
  }  
}
```

```
﻿<response>
 <response>  
  <response>
    <id>150101aaaaaaaaaa001</id>
    <accountId>15010100000001</accountId>
    <name>example vm</name>
    <description>test vm</description>
    <productCode>machine-virtualmachine-small-v1-1m</productCode>
    <memory>1024</memory>
    <cpuNumber>1</cpuNumber>
    <architecture>x86_64</architecture>
    <ipAddress>192.0.2.2</ipAddress>
    <networkInterfaces>
      <item>
        <mac>1a:01:b7:4e:32:d3</mac>
      </item>
    </networkInterfaces>
    <status>active</status>
    <power>on</power>
    <rescue>off</rescue>
    <rdns></rdns>
    <paidUntil>2016-02-01T15:57:35Z</paidUntil>
    <renewOn>2016-01-31T15:57:35Z</renewOn>
    <deletionScheduledFor></deletionScheduledFor>
    <restorableUntil></restorableUntil>
    <addDate>2016-01-01T15:57:35Z</addDate>
    <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>
```

Request | virtualMachineReset  
---|---  
Url |  https://secure.hosting.de/api/machine/v1/jsonxml/virtualMachineReset  
Processing | asynchronous  
Response | [VirtualMachine object](https://www.hosting.de/api/#the-virtualmachine-object)  
By using the [virtualMachineReset](https://www.hosting.de/api/#reset) method the user can reset a virtual machine. This method emulates the behavior of pushing the reset power button.
