# Mailboxes
The email section of the API allows you to create and manage mailboxes.
Currently six types of mailboxes are available in the system: ImapMailbox, Forwarder, SmtpForwarder, MailingList and Catchall. First section of the documentation describes the objects that represent each of these types of mailboxes in detail. How to create and manage existing mailboxes is explained in the following sections.
## ImapMailbox
### The ImapMailbox Object
```
﻿{
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "bundleId": "",
    "emailAddress": "testmailbox@example.com",
    "emailAddressUnicode": "testmailbox@example.com",
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "status": "active",
    "spamFilter": {
      "bannedFilesChecks": false,
      "deleteSpam": false,
      "headerChecks": false,
      "malwareChecks": false,
      "modifySubjectOnSpam": true,
      "spamChecks": false,
      "spamLevel": "low",
      "useGreylisting": true
    },
    "type": "ImapMailbox",
	"productCode": "email-imap-mailbox-12m",
    "forwarderTargets": [],
    "smtpForwarderTarget": "",
    "isAdmin": false,
    "storageQuota": 1024,
    "storageQuotaUsed": 0,
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
}

```

```
﻿<Mailbox>
 <id>150101aaaaaaaaaa001</id>
 <accountId>15010100000001</accountId>
 <bundleId></bundleId>
 <emailAddress>testmailbox@example.com</emailAddress>
 <emailAddressUnicode>testmailbox@example.com</emailAddressUnicode>
 <domainName>example.com</domainName>
 <domainNameUnicode>example.com</domainNameUnicode>
 <status>active</status>
 <spamFilter>
  <bannedFilesChecks>false</bannedFilesChecks>
  <deleteSpam>false</deleteSpam>
  <headerChecks>false</headerChecks>
  <malwareChecks>false</malwareChecks>
  <modifySubjectOnSpam>true</modifySubjectOnSpam>
  <spamChecks>false</spamChecks>
  <spamLevel>low</spamLevel>
  <useGreylisting>true</useGreylisting>
 </spamFilter>
 <type>ImapMailbox</type>
 <productCode>email-imap-mailbox-12m</productCode>
 <forwarderTargets/>
 <smtpForwarderTarget></smtpForwarderTarget>
 <isAdmin>false</isAdmin>
 <storageQuota>1024</storageQuota>
 <storageQuotaUsed>0</storageQuotaUsed>
 <paidUntil>2016-02-01T15:57:35Z</paidUntil>
 <renewOn>2016-01-31T15:57:35Z</renewOn>
 <deletionScheduledFor xsi:nil="true"/>
 <restorableUntil xsi:nil="true"/>
 <addDate>2016-01-01T15:57:35Z</addDate>
 <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
</Mailbox>

```

Property | Type | Required / Direction | Description  
---|---|---|---  
type | string | fixed | Type of the mailbox. For imap mailbox it must always be “ImapMailbox”.  
productCode | string | fixed | Contains the productCode of the mailbox and must be set at creation.  
accountId | string | out-only | ID of managing account  
bundleId | string | optional | ID of the bundle which handles contractual obligations.  
id | string | see description | ID of this mailbox. Ignored in mailboxCreate requests. This property is required in all other requests regarding mailbox management.  
emailAddress | string | required | Email address of the mailbox in ASCII/ACE format.  
emailAddressUnicode | string | out-only | Email address of the mailbox in Unicode/international format.  
domainName | string | out-only | Domain name of the mailbox in ASCII/ACE format.  
domainNameUnicode | string | out-only | Domain name of the mailbox in Unicode/international format.  
status | string | out-only | Status of the mailbox.  
spamFilter | [SpamFilter](https://www.hosting.de/api/#the-spamfilter-object) | optional | Spam settings of the mailbox.  
autoResponder | [AutoResponder](https://www.hosting.de/api/#the-autoresponder-object) | optional | AutoResponder settings of this mailbox.  
forwarderTargets | list | required | List of email addresses mails are forwarded to in addition to delivery to this imap mailbox.  
isAdmin | bool | optional | Indicates whether the mailbox has admin rights. Mailboxes with admin rights can create and manage other mailboxes in the same domain.  
storageQuota | int | required | Mailbox storage capacity in MB.  
storageQuotaUsed | int | out-only | Currently used storage of the mailbox in MB.  
deletionScheduledFor | datetime | out-only | Date and time the mailbox is scheduled for deletion. Is empty if mailbox is not scheduled for removal.  
restorableUntil | datetime | out-only | Date and Time before which the mailbox can be restored.  
paidUntil | datetime | out-only | Date that the mailbox is paid for.  
renewOn | datetime | out-only | Time of the next automatic debit of accounting period. This point of time is always before the paidUntil time. renewOn time calculation: subtract the notice period from paidUntil time.  
addDate | datetime | out-only | Date and time the mailbox was created in the system.  
lastChangeDate | datetime | out-only | Date and time of last mailbox modification  
### Creating ImapMailboxes
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/mailboxCreate 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "mailbox": {
        "type": "ImapMailbox",
		"productCode": "email-imap-mailbox-12m",
        "emailAddress": "testmailbox@example.com",
        "storageQuota": 1024,
        "isAdmin": false
    },
    "password": "!Secret23"
}

```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <mailbox>
  <type>ImapMailbox</type>
  <productCode>email-imap-mailbox-12m</productCode>
  <emailAddress>testmailbox@example.com</emailAddress>
  <storageQuota>1024</storageQuota>
  <isAdmin>false</isAdmin>
 </mailbox>
 <password>!Secret23</password>
</request>

```

> ##### Response
```
{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "bundleId": "",
    "emailAddress": "testmailbox@example.com",
    "emailAddressUnicode": "testmailbox@example.com",
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "spamFilter": {
      "bannedFilesChecks": false,
      "deleteSpam": false,
      "headerChecks": false,
      "malwareChecks": false,
      "modifySubjectOnSpam": true,
      "spamChecks": false,
      "spamLevel": "low",
      "useGreylisting": true
    },
    "status": "creating",
    "type": "ImapMailbox",
	"productCode": "email-imap-mailbox-12m",
    "forwarderTargets": [],
    "smtpForwarderTarget": "",
    "isAdmin": false,
    "storageQuota": 1024,
    "storageQuotaUsed": 0,
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
<response>
 <response>
  <response>
   <id>150101aaaaaaaaaa001</id>
   <accountId>15010100000001</accountId>
   <bundleId></bundleId>
   <emailAddress>testmailbox@example.com</emailAddress>
   <emailAddressUnicode>testmailbox@example.com</emailAddressUnicode>
   <domainName>example.com</domainName>
   <domainNameUnicode>example.com</domainNameUnicode>
   <spamFilter>
    <bannedFilesChecks>false</bannedFilesChecks>
    <deleteSpam>false</deleteSpam>
    <headerChecks>false</headerChecks>
    <malwareChecks>false</malwareChecks>
    <modifySubjectOnSpam>true</modifySubjectOnSpam>
    <spamChecks>false</spamChecks>
    <spamLevel>low</spamLevel>
    <useGreylisting>true</useGreylisting>
   </spamFilter>
   <status>creating</status>
   <type>ImapMailbox</type>
   <productCode>email-imap-mailbox-12m</productCode>
   <forwarderTargets/>
   <smtpForwarderTarget></smtpForwarderTarget>
   <isAdmin>false</isAdmin>
   <storageQuota>1024</storageQuota>
   <storageQuotaUsed>0</storageQuotaUsed>
   <paidUntil>2016-02-01T15:57:35Z</paidUntil>
   <renewOn>2016-01-31T15:57:35Z</renewOn>
   <deletionScheduledFor xsi:nil="true"/>
   <restorableUntil xsi:nil="true"/>
   <addDate>2016-01-01T15:57:35Z</addDate>
   <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>

```

Request | mailboxCreate  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/mailboxCreate  
Processing | asynchronous  
Response | [ImapMailbox object](https://www.hosting.de/api/#the-imapmailbox-object)  
Parameter | Type | Required | Description  
---|---|---|---  
mailbox | ImapMailbox object | req | Data for to be created imap mailbox  
password | string | req | Password for this mailbox  
In order to create an imap mailbox, you need to send a `mailboxCreate` request. This request takes as first parameter `mailbox` which contains all required information of the mailbox and as second parameter a password. Please note that in order to create an imap mailbox the `type` parameter of the `mailbox` must be ImapMailbox and all required properties of the [ImapMailbox object](https://www.hosting.de/api/#the-imapmailbox-object) must be set. object
## Forwarder
### The Forwarder Object
```
﻿{
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "bundleId": "",
    "emailAddress": "testmailbox@example.com",
    "emailAddressUnicode": "testmailbox@example.com",
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "status": "active",
    "spamFilter": {
      "bannedFilesChecks": false,
      "deleteSpam": false,
      "headerChecks": false,
      "malwareChecks": false,
      "modifySubjectOnSpam": true,
      "spamChecks": false,
      "spamLevel": "low",
      "useGreylisting": true
    },
    "type": "Forwarder",
    "forwarderType": "externalForwarder",
	"productCode": "email-forwarder-external-12m",
    "forwarderTargets": [
        "internal_target@example.com",
        "external_target@testdomain.com"
    ],
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
}

```

```
﻿<Mailbox>
 <id>150101aaaaaaaaaa001</id>
 <accountId>15010100000001</accountId>
 <bundleId></bundleId>
 <emailAddress>testmailbox@example.com</emailAddress>
 <emailAddressUnicode>testmailbox@example.com</emailAddressUnicode>
 <domainName>example.com</domainName>
 <domainNameUnicode>example.com</domainNameUnicode>
 <status>active</status>
 <spamFilter>
  <bannedFilesChecks>false</bannedFilesChecks>
  <deleteSpam>false</deleteSpam>
  <headerChecks>false</headerChecks>
  <malwareChecks>false</malwareChecks>
  <modifySubjectOnSpam>true</modifySubjectOnSpam>
  <spamChecks>false</spamChecks>
  <spamLevel>low</spamLevel>
  <useGreylisting>true</useGreylisting>
 </spamFilter>
 <type>Forwarder</type>
 <productCode>email-forwarder-external-12m</productCode>
 <forwarderType>externalForwarder</forwarderType>
 <forwarderTargets>
  <item>internal_target@example.com</item>
  <item>external_target@testdomain.com</item>
 </forwarderTargets>
 <paidUntil>2016-02-01T15:57:35Z</paidUntil>
 <renewOn>2016-01-31T15:57:35Z</renewOn>
 <deletionScheduledFor xsi:nil="true"/>
 <restorableUntil xsi:nil="true"/>
 <addDate>2016-01-01T15:57:35Z</addDate>
 <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
</Mailbox>

```

Property | Type | Required / Direction | Description  
---|---|---|---  
type | string | fixed | Type of the mailbox. For forwarder mailbox it must always be “Forwarder”.  
productCode | string | fixed | Contains the productCode of the mailbox and must be set at creation.  
accountId | string | out-only | ID of managing account  
bundleId | string | optional | ID of the bundle which handles contractual obligations.  
id | string | see description | ID of this mailbox. Ignored in mailboxCreate requests. This property is required in all other requests regarding mailbox management.  
emailAddress | string | required | Email address of the mailbox in ASCII/ACE format.  
emailAddressUnicode | string | out-only | Email address of the mailbox in Unicode/international format.  
domainName | string | out-only | Domain name of the mailbox in ASCII/ACE format.  
domainNameUnicode | string | out-only | Domain name of the mailbox in Unicode/international format.  
status | string | out-only | Status of the mailbox.  
spamFilter | [SpamFilter](https://www.hosting.de/api/#the-spamfilter-object) | optional | Spam settings of the mailbox.  
autoResponder | [AutoResponder](https://www.hosting.de/api/#the-autoresponder-object) | optional | AutoResponder settings of this mailbox.  
forwarderType | string | out-only | Type of the forwarder. The type of the forwarder can be either `internalForwarder` or `externalForwarder`. If all email addresses in the forwarderTargets list are in the same domain as the forwarder then the forwarderType will be `internalForwarder`. Otherwise it will be `externalForwarder`.  
forwarderTargets | list | required | List of email addresses mails are forwarded to.  
deletionScheduledFor | datetime | out-only | Date and time the mailbox is scheduled for deletion. Is empty if mailbox is not scheduled for removal.  
restorableUntil | datetime | out-only | Date and Time before which the mailbox can be restored.  
paidUntil | datetime | out-only | Date that the mailbox is paid for.  
renewOn | datetime | out-only | Time of the next automatic debit of accounting period. This point of time is always before the paidUntil time. renewOn time calculation: subtract the notice period from paidUntil time.  
addDate | datetime | out-only | Date and time the mailbox was created in the system.  
lastChangeDate | datetime | out-only | Date and time of last mailbox modification  
### Creating Forwarders
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/mailboxCreate 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "mailbox": {
        "type": "Forwarder",
		"productCode": "email-forwarder-external-12m",
        "emailAddress": "testmailbox@example.com",
        "forwarderTargets": [
            "internal_target@example.com",
            "external_target@testdomain.com"
        ]
    }
}

```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <mailbox>
  <type>Forwarder</type>
  <productCode>email-forwarder-external-12m</productCode>
  <emailAddress>testmailbox@example.com</emailAddress>
  <forwarderTargets>
   <item>internal_target@example.com</item>
   <item>external_target@testdomain.com</item>
  </forwarderTargets>
 </mailbox>
</request>

```

> ##### Response
```
{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "bundleId": "",
    "emailAddress": "testmailbox@example.com",
    "emailAddressUnicode": "testmailbox@example.com",
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "spamFilter": {
      "bannedFilesChecks": false,
      "deleteSpam": false,
      "headerChecks": false,
      "malwareChecks": false,
      "modifySubjectOnSpam": true,
      "spamChecks": false,
      "spamLevel": "low",
      "useGreylisting": true
    },
    "status": "creating",
    "type": "Forwarder",
    "productCode": "email-forwarder-external-12m",
    "forwarderType": "externalForwarder",
    "forwarderTargets": [
        "internal_target@example.com",
        "external_target@testdomain.com"
    ],
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
<response>
 <response>
  <response>
   <id>150101aaaaaaaaaa001</id>
   <accountId>15010100000001</accountId>
   <bundleId></bundleId>
   <emailAddress>testmailbox@example.com</emailAddress>
   <emailAddressUnicode>testmailbox@example.com</emailAddressUnicode>
   <domainName>example.com</domainName>
   <domainNameUnicode>example.com</domainNameUnicode>
   <spamFilter>
    <bannedFilesChecks>false</bannedFilesChecks>
    <deleteSpam>false</deleteSpam>
    <headerChecks>false</headerChecks>
    <malwareChecks>false</malwareChecks>
    <modifySubjectOnSpam>true</modifySubjectOnSpam>
    <spamChecks>false</spamChecks>
    <spamLevel>low</spamLevel>
    <useGreylisting>true</useGreylisting>
   </spamFilter>
   <status>creating</status>
   <type>Forwarder</type>
   <productCode>email-forwarder-external-12m</productCode>
   <forwarderType>externalForwarder</forwarderType>
   <forwarderTargets>
    <item>internal_target@example.com</item>
    <item>external_target@testdomain.com</item>
   </forwarderTargets>
   <paidUntil>2016-02-01T15:57:35Z</paidUntil>
   <renewOn>2016-01-31T15:57:35Z</renewOn>
   <deletionScheduledFor xsi:nil="true"/>
   <restorableUntil xsi:nil="true"/>
   <addDate>2016-01-01T15:57:35Z</addDate>
   <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>

```

Request | mailboxCreate  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/mailboxCreate  
Processing | asynchronous  
Response | [Forwarder object](https://www.hosting.de/api/#the-forwarder-object)  
Parameter | Type | Required | Description  
---|---|---|---  
mailbox | Forwarder object | req | Data for to be created forwarder  
In order to create a forwarder, you need to send a `mailboxCreate` request. This request takes one parameter `mailbox` which contains all required information of the mailbox to be created. Please note that in order to create an forwarder mailbox the `type` parameter of the `mailbox` must be Forwarder and all required properties of the [Forwarder object](https://www.hosting.de/api/#the-forwarder-object) must be set.
## SmtpForwarder
An SMTP Forwarder can be used to forward emails by SMTP to a target mailserver. It will be delivered on Port 25 with the SMTP protocol. The target mailserver must accept emails for the created email address. An SMTP Forwarder is useful if you want to forward emails to your local exchange server or if you want to use just our spamfiltering.
### The SmtpForwarder Object
```
{
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "bundleId": "",
    "emailAddress": "testmailbox@example.com",
    "emailAddressUnicode": "testmailbox@example.com",
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "spamFilter": {
      "bannedFilesChecks": false,
      "deleteSpam": false,
      "headerChecks": false,
      "malwareChecks": false,
      "modifySubjectOnSpam": true,
      "spamChecks": false,
      "spamLevel": "low",
      "useGreylisting": true
    },
    "status": "active",
    "type": "SmtpForwarder",
    "productCode": "email-smtp-forwarder-v1-12m",
    "server": "your.mailserver.hostname",
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
}

```

```
<Mailbox>
   <id>150101aaaaaaaaaa001</id>
   <accountId>15010100000001</accountId>
   <bundleId></bundleId>
   <emailAddress>testmailbox@example.com</emailAddress>
   <emailAddressUnicode>testmailbox@example.com</emailAddressUnicode>
   <domainName>example.com</domainName>
   <domainNameUnicode>example.com</domainNameUnicode>
   <spamFilter>
    <bannedFilesChecks>false</bannedFilesChecks>
    <deleteSpam>false</deleteSpam>
    <headerChecks>false</headerChecks>
    <malwareChecks>false</malwareChecks>
    <modifySubjectOnSpam>true</modifySubjectOnSpam>
    <spamChecks>false</spamChecks>
    <spamLevel>low</spamLevel>
    <useGreylisting>true</useGreylisting>
   </spamFilter>
   <status>active</status>
   <type>SmtpForwarder</type>
   <productCode>email-smtp-forwarder-v1-12m</productCode>
   <server>your.mailserver.hostname</server>
   <paidUntil>2016-02-01T15:57:35Z</paidUntil>
   <renewOn>2016-01-31T15:57:35Z</renewOn>
   <deletionScheduledFor xsi:nil="true"/>
   <restorableUntil xsi:nil="true"/>
   <addDate>2016-01-01T15:57:35Z</addDate>
   <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
</Mailbox>

```

Property | Type | Required / Direction | Description  
---|---|---|---  
type | string | fixed | Type of the mailbox. For SMTP Forwarder mailbox it must always be “SmtpForwarder”.  
productCode | string | fixed | Contains the productCode of the mailbox and must be set at creation.  
accountId | string | out-only | ID of managing account  
bundleId | string | optional | ID of the bundle which handles contractual obligations.  
id | string | see description | ID of this mailbox. Ignored in mailboxCreate requests. This property is required in all other requests regarding mailbox management.  
emailAddress | string | required | Email address of the mailbox in ASCII/ACE format.  
emailAddressUnicode | string | out-only | Email address of the mailbox in Unicode/international format.  
domainName | string | out-only | Domain name of the mailbox in ASCII/ACE format.  
domainNameUnicode | string | out-only | Domain name of the mailbox in Unicode/international format.  
status | string | out-only | Status of the mailbox.  
spamFilter | [SpamFilter](https://www.hosting.de/api/#the-spamfilter-object) | optional | Spam settings of the mailbox.  
autoResponder | [AutoResponder](https://www.hosting.de/api/#the-autoresponder-object) | optional | AutoResponder settings of this mailbox.  
server | string | required | FQDN or IP address of the server to which emails are forwarded.  
port | int | optional | The server port, default is 25.  
deletionScheduledFor | datetime | out-only | Date and time the mailbox is scheduled for deletion. Is empty if mailbox is not scheduled for removal.  
restorableUntil | datetime | out-only | Date and Time before which the mailbox can be restored.  
paidUntil | datetime | out-only | Date that the mailbox is paid for.  
renewOn | datetime | out-only | Time of the next automatic debit of accounting period. This point of time is always before the paidUntil time. renewOn time calculation: subtract the notice period from paidUntil time.  
addDate | datetime | out-only | Date and time the mailbox was created in the system.  
lastChangeDate | datetime | out-only | Date and time of last mailbox modification  
### Creating SMTP Forwarder
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/mailboxCreate 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "mailbox": {
        "type": "SmtpForwarder",
		"productCode": "email-smtp-forwarder-v1-12m",
        "emailAddress": "testmailbox@example.com",
        "server": "your.mailserver.hostname"
    }
}

```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <mailbox>
  <type>SmtpForwarder</type>
  <productCode>email-smtp-forwarder-v1-12m</productCode>
  <emailAddress>testmailbox@example.com</emailAddress>
  <server>your.mailserver.hostname</server>
 </mailbox>
</request>

```

> ##### Response
```
{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "bundleId": "",
    "emailAddress": "testmailbox@example.com",
    "emailAddressUnicode": "testmailbox@example.com",
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "spamFilter": {
      "bannedFilesChecks": false,
      "deleteSpam": false,
      "headerChecks": false,
      "malwareChecks": false,
      "modifySubjectOnSpam": true,
      "spamChecks": false,
      "spamLevel": "low",
      "useGreylisting": true
    },
    "status": "creating",
    "type": "SmtpForwarder",
    "productCode": "email-smtp-forwarder-v1-12m",
    "server": "your.mailserver.hostname",
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
<response>
 <response>
  <response>
   <id>150101aaaaaaaaaa001</id>
   <accountId>15010100000001</accountId>
   <bundleId></bundleId>
   <emailAddress>testmailbox@example.com</emailAddress>
   <emailAddressUnicode>testmailbox@example.com</emailAddressUnicode>
   <domainName>example.com</domainName>
   <domainNameUnicode>example.com</domainNameUnicode>
   <spamFilter>
    <bannedFilesChecks>false</bannedFilesChecks>
    <deleteSpam>false</deleteSpam>
    <headerChecks>false</headerChecks>
    <malwareChecks>false</malwareChecks>
    <modifySubjectOnSpam>true</modifySubjectOnSpam>
    <spamChecks>false</spamChecks>
    <spamLevel>low</spamLevel>
    <useGreylisting>true</useGreylisting>
   </spamFilter>
   <status>creating</status>
   <type>SmtpForwarder</type>
   <productCode>email-smtp-forwarder-v1-12m</productCode>
   <server>your.mailserver.hostname</server>
   <paidUntil>2016-02-01T15:57:35Z</paidUntil>
   <renewOn>2016-01-31T15:57:35Z</renewOn>
   <deletionScheduledFor xsi:nil="true"/>
   <restorableUntil xsi:nil="true"/>
   <addDate>2016-01-01T15:57:35Z</addDate>
   <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>

```

Request | mailboxCreate  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/mailboxCreate  
Processing | asynchronous  
Response | [SmtpForwarder object](https://www.hosting.de/api/#the-smtpforwarder-object)  
Parameter | Type | Required | Description  
---|---|---|---  
mailbox | SMTP Forwarder object | req | Data for to be created smtpForwarder  
In order to create an SMTP Forwarder, you need to send a `mailboxCreate` request. This request takes one parameter `mailbox` which contains all required information of the mailbox to be created. Please note that in order to create an SMTP Forwarder mailbox the `type` parameter of the `mailbox` must be SmtpForwarder and all required properties of the [SmtpForwarder object](https://www.hosting.de/api/#the-smtpforwarder-object) must be set.
## MailingList
### The MailingList Object
```
{
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "bundleId": "",
    "emailAddress": "testlist@example.com",
    "emailAddressUnicode": "testlist@example.com",
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "spamFilter": {
      "bannedFilesChecks": false,
      "deleteSpam": false,
      "headerChecks": false,
      "malwareChecks": false,
      "modifySubjectOnSpam": true,
      "spamChecks": false,
      "spamLevel": "low",
      "useGreylisting": true
    },
    "status": "active",
    "type": "MailingList",
    "productCode": "email-mailinglist-team-v1-12m",
    "name": "Test Mailinglist",
    "accessMode": "everyone",
    "replyToMode": "list",
    "owners": [
      "ownerlist@example.com"
    ],
    "members": [
      "internal_member@example.com",
      "external_member@testdomain.com"
    ],
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
}

```

```
<Mailbox>
   <id>150101aaaaaaaaaa001</id>
   <accountId>15010100000001</accountId>
   <bundleId></bundleId>
   <emailAddress>testlist@example.com</emailAddress>
   <emailAddressUnicode>testlist@example.com</emailAddressUnicode>
   <domainName>example.com</domainName>
   <domainNameUnicode>example.com</domainNameUnicode>
   <spamFilter>
    <bannedFilesChecks>false</bannedFilesChecks>
    <deleteSpam>false</deleteSpam>
    <headerChecks>false</headerChecks>
    <malwareChecks>false</malwareChecks>
    <modifySubjectOnSpam>true</modifySubjectOnSpam>
    <spamChecks>false</spamChecks>
    <spamLevel>low</spamLevel>
    <useGreylisting>true</useGreylisting>
   </spamFilter>
   <status>active</status>
   <type>MailingList</type>
   <productCode>email-mailinglist-team-v1-12m</productCode>
   <name>Test Mailinglist</name>
   <accessMode>everyone</accessMode>
   <replyToMode>list</replyToMode>
   <owners>
    <item>ownerlist@example.com</item>
   </owners>
   <members>
    <item>internal_member@example.com</item>
    <item>external_member@testdomain.com</item>
   </members>
   <paidUntil>2016-02-01T15:57:35Z</paidUntil>
   <renewOn>2016-01-31T15:57:35Z</renewOn>
   <deletionScheduledFor xsi:nil="true"/>
   <restorableUntil xsi:nil="true"/>
   <addDate>2016-01-01T15:57:35Z</addDate>
   <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
</Mailbox>

```

Property | Type | Required / Direction | Description  
---|---|---|---  
type | string | fixed | Type of the mailbox. For a mailinglist it must always be “MailingList”.  
productCode | string | fixed | Contains the productCode of the mailbox and must be set at creation.  
accountId | string | out-only | ID of managing account  
bundleId | string | optional | ID of the bundle which handles contractual obligations.  
id | string | see description | ID of this mailbox. Ignored in mailboxCreate requests. This property is required in all other requests regarding mailbox management.  
emailAddress | string | required | Email address of the mailbox in ASCII/ACE format.  
emailAddressUnicode | string | out-only | Email address of the mailbox in Unicode/international format.  
domainName | string | out-only | Domain name of the mailbox in ASCII/ACE format.  
domainNameUnicode | string | out-only | Domain name of the mailbox in Unicode/international format.  
status | string | out-only | Status of the mailbox.  
spamFilter | [SpamFilter](https://www.hosting.de/api/#the-spamfilter-object) | optional | Spam settings of the mailbox.  
autoResponder | [AutoResponder](https://www.hosting.de/api/#the-autoresponder-object) | optional | AutoResponder settings of this mailbox.  
name | string | required | Name of the mailinglist.  
subjectPrefix | string | optional | This prefix, if set, will be added to the subject of any email sent to this mailinglist.  
accessMode | string | required | Controls who is allowed to send emails to this mailinglist.  
replyToMode | string | required | Controls the reply-to header of emails coming from this mailinglist.  
replyToEmailAddress | string | optional | If set, this email address will override the reply-to header of emails coming from this mailinglist.  
allowHtmlMails | bool | optional | If set to false, HTML emails will be rejected. Default is true.  
digestSize | int | optional | Controls the maximum digest size of this mailinglist. Default is 0 which deactivates digest function.  
owners | list | required | Email addresses of the owners of this mailinglist.  
members | list | optional | Email addresses of the members of this mailinglist.  
deletionScheduledFor | datetime | out-only | Date and time the mailbox is scheduled for deletion. Is empty if mailbox is not scheduled for removal.  
restorableUntil | datetime | out-only | Date and Time before which the mailbox can be restored.  
paidUntil | datetime | out-only | Date that the mailbox is paid for.  
renewOn | datetime | out-only | Time of the next automatic debit of accounting period. This point of time is always before the paidUntil time. renewOn time calculation: subtract the notice period from paidUntil time.  
addDate | datetime | out-only | Date and time the mailbox was created in the system.  
lastChangeDate | datetime | out-only | Date and time of last mailbox modification  
### Creating MailingList
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/mailboxCreate 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "mailbox": {
        "type": "MailingList",
		"productCode": "email-mailinglist-team-v1-12m",
        "emailAddress": "testlist@example.com",
        "name": "Test Mailinglist",
        "accessMode": "everyone",
        "replyToMode": "list",
        "owners": [
            "ownerlist@example.com"
        ],
        "members": [
            "internal_member@example.com",
            "external_member@testdomain.com"
        ]
    }
}

```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <mailbox>
  <type>MailingList</type>
  <productCode>email-mailinglist-team-v1-12m</productCode>
  <emailAddress>testlist@example.com</emailAddress>
  <name>Test Mailinglist</name>
  <accessMode>everyone</accessMode>
  <replyToMode>list</replyToMode>
  <owners>
   <item>ownerlist@example.com</item>
  </owners>
  <members>
   <item>internal_member@example.com</item>
   <item>external_member@testdomain.com</item>
  </members>
 </mailbox>
</request>

```

> ##### Response
```
{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "bundleId": "",
    "emailAddress": "testlist@example.com",
    "emailAddressUnicode": "testlist@example.com",
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "spamFilter": {
      "bannedFilesChecks": false,
      "deleteSpam": false,
      "headerChecks": false,
      "malwareChecks": false,
      "modifySubjectOnSpam": true,
      "spamChecks": false,
      "spamLevel": "low",
      "useGreylisting": true
    },
    "status": "creating",
    "type": "MailingList",
    "productCode": "email-mailinglist-team-v1-12m",
    "name": "Test Mailinglist",
    "accessMode": "everyone",
    "replyToMode": "list",
    "owners": [
      "ownerlist@example.com"
    ],
    "members": [
      "internal_member@example.com",
      "external_member@testdomain.com"
    ],
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
<response>
 <response>
  <response>
   <id>150101aaaaaaaaaa001</id>
   <accountId>15010100000001</accountId>
   <bundleId></bundleId>
   <emailAddress>testlist@example.com</emailAddress>
   <emailAddressUnicode>testlist@example.com</emailAddressUnicode>
   <domainName>example.com</domainName>
   <domainNameUnicode>example.com</domainNameUnicode>
   <spamFilter>
    <bannedFilesChecks>false</bannedFilesChecks>
    <deleteSpam>false</deleteSpam>
    <headerChecks>false</headerChecks>
    <malwareChecks>false</malwareChecks>
    <modifySubjectOnSpam>true</modifySubjectOnSpam>
    <spamChecks>false</spamChecks>
    <spamLevel>low</spamLevel>
    <useGreylisting>true</useGreylisting>
   </spamFilter>
   <status>creating</status>
   <type>MailingList</type>
   <productCode>email-mailinglist-team-v1-12m</productCode>
   <name>Test Mailinglist</name>
   <accessMode>everyone</accessMode>
   <replyToMode>list</replyToMode>
   <owners>
    <item>ownerlist@example.com</item>
   </owners>
   <members>
    <item>internal_member@example.com</item>
    <item>external_member@testdomain.com</item>
   </members>
   <paidUntil>2016-02-01T15:57:35Z</paidUntil>
   <renewOn>2016-01-31T15:57:35Z</renewOn>
   <deletionScheduledFor xsi:nil="true"/>
   <restorableUntil xsi:nil="true"/>
   <addDate>2016-01-01T15:57:35Z</addDate>
   <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>

```

Request | mailboxCreate  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/mailboxCreate  
Processing | asynchronous  
Response | [MailingList object](https://www.hosting.de/api/#the-mailinglist-object)  
Parameter | Type | Required | Description  
---|---|---|---  
mailbox | MailingList object | req | Data for to be created mailinglist  
In order to create a mailinglist, you need to send a `mailboxCreate` request. This request takes one parameter `mailbox` which contains all required information of the mailbox to be created. Please note that in order to create a mailinglist mailbox the `type` parameter of the `mailbox` must be MailingList and all required properties of the [MailingList object](https://www.hosting.de/api/#the-mailinglist-object) must be set.
Valid Modes for `accessMode` are:
  * owners: Only the email addresses defined in owners are allowed to send emails to this mailinglist. Other emails will be silently discarded.
  * members: Only the email addresses defined in owners and members are allowed to send emails to this mailinglist. Other emails will be silently discarded.
  * everyone: Everyone may send emails to this mailinglist.


Valid Modes for `replyToMode` are:
  * list: The reply-to header will be set to the email address of the mailinglist.
  * self: The reply-to header will be set to the original sender of the email address.


## Catchall
With a catchall mailbox one can create a wildcard email address for a domain name. All emails sent to non existing mailboxes of that domain will be forwarded to a specified IMAP mailbox.
### The Catchall Object
```
{
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "bundleId": "",
    "emailAddress": "catchall@example.com",
    "emailAddressUnicode": "catchall@example.com",
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "spamFilter": {
      "bannedFilesChecks": false,
      "deleteSpam": false,
      "headerChecks": false,
      "malwareChecks": false,
      "modifySubjectOnSpam": true,
      "spamChecks": false,
      "spamLevel": "low",
      "useGreylisting": true
    },
    "status": "active",
    "type": "Catchall",
    "productCode": "email-catchall-12m",
    "forwarderTarget": "internal_mailbox@example.com",
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,
    "restorableUntil": null,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
}

```

```
<Mailbox>
   <id>150101aaaaaaaaaa001</id>
   <accountId>15010100000001</accountId>
   <bundleId></bundleId>
   <emailAddress>catchall@example.com</emailAddress>
   <emailAddressUnicode>catchall@example.com</emailAddressUnicode>
   <domainName>example.com</domainName>
   <domainNameUnicode>example.com</domainNameUnicode>
   <spamFilter>
    <bannedFilesChecks>false</bannedFilesChecks>
    <deleteSpam>false</deleteSpam>
    <headerChecks>false</headerChecks>
    <malwareChecks>false</malwareChecks>
    <modifySubjectOnSpam>true</modifySubjectOnSpam>
    <spamChecks>false</spamChecks>
    <spamLevel>low</spamLevel>
    <useGreylisting>true</useGreylisting>
   </spamFilter>
   <status>active</status>
   <type>Catchall</type>
   <productCode>email-catchall-12m</productCode>
   <forwarderTarget>internal_mailbox@example.com</forwarderTarget>
   <paidUntil>2016-02-01T15:57:35Z</paidUntil>
   <renewOn>2016-01-31T15:57:35Z</renewOn>
   <deletionScheduledFor xsi:nil="true"/>
   <restorableUntil xsi:nil="true"/>
   <addDate>2016-01-01T15:57:35Z</addDate>
   <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
</Mailbox>

```

Property | Type | Required / Direction | Description  
---|---|---|---  
type | string | fixed | Type of the mailbox. For catchall mailbox it must always be “Catchall”.  
productCode | string | fixed | Contains the productCode of the mailbox and must be set at creation.  
accountId | string | out-only | ID of managing account  
bundleId | string | optional | ID of the bundle in which the mailbox should be created.  
id | string | see description | ID of this mailbox. Ignored in mailboxCreate requests. This property is required in all other requests regarding mailbox management.  
emailAddress | string | required | Email address of the mailbox in ASCII/ACE format. This property must contain “*” as prefix before the @, e.g. *@example.com.net.  
emailAddressUnicode | string | out-only | Email address of the mailbox in Unicode/international format.  
domainName | string | out-only | Domain name of the mailbox in ASCII/ACE format.  
domainNameUnicode | string | out-only | Domain name of the mailbox in Unicode/international format.  
status | string | out-only | Status of the mailbox.  
spamFilter | [SpamFilter](https://www.hosting.de/api/#the-spamfilter-object) | optional | Spam settings of the mailbox.  
autoResponder | [AutoResponder](https://www.hosting.de/api/#the-autoresponder-object) | optional | AutoResponder settings of this mailbox.  
forwarderTarget | string | required | Receiving mailbox of this catchall mailbox. Must be an IMAP mailbox without any further forwarders.  
deletionScheduledFor | datetime | out-only | Date and time the mailbox is scheduled for deletion. Is empty if mailbox is not scheduled for removal.  
restorableUntil | datetime | out-only | Date and Time before which the mailbox can be restored.  
paidUntil | datetime | out-only | Date that the mailbox is paid for.  
renewOn | datetime | out-only | Time of the next automatic debit of accounting period. This point of time is always before the paidUntil time. renewOn time calculation: subtract the notice period from paidUntil time.  
addDate | datetime | out-only | Date and time the mailbox was created in the system.  
lastChangeDate | datetime | out-only | Date and time of last mailbox modification  
### Creating Catchall
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/mailboxCreate 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "mailbox": {
        "type": "Catchall",
		"productCode": "email-catchall-12m",
        "emailAddress": "*@example.com",
        "forwarderTargets": "internal_mailbox@example.com"
    }
}

```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <mailbox>
  <type>Catchall</type>
  <productCode>email-catchall-12m</productCode>
  <emailAddress>*@example.com</emailAddress>
  <forwarderTarget>internal_mailbox@example.com</forwarderTarget>
 </mailbox>
</request>

```

> ##### Response
```
{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "bundleId": "",
    "emailAddress": "*@example.com",
    "emailAddressUnicode": "*@example.com",
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "spamFilter": {
      "bannedFilesChecks": false,
      "deleteSpam": false,
      "headerChecks": false,
      "malwareChecks": false,
      "modifySubjectOnSpam": true,
      "spamChecks": false,
      "spamLevel": "low",
      "useGreylisting": true
    },
    "status": "creating",
    "type": "Catchall",
    "productCode": "email-catchall-12m",
    "forwarderTarget": "internal_mailbox@example.com",
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
<response>
 <response>
  <response>
   <id>150101aaaaaaaaaa001</id>
   <accountId>15010100000001</accountId>
   <bundleId></bundleId>
   <emailAddress>*@example.com</emailAddress>
   <emailAddressUnicode>*@example.com</emailAddressUnicode>
   <domainName>example.com</domainName>
   <domainNameUnicode>example.com</domainNameUnicode>
   <spamFilter>
    <bannedFilesChecks>false</bannedFilesChecks>
    <deleteSpam>false</deleteSpam>
    <headerChecks>false</headerChecks>
    <malwareChecks>false</malwareChecks>
    <modifySubjectOnSpam>true</modifySubjectOnSpam>
    <spamChecks>false</spamChecks>
    <spamLevel>low</spamLevel>
    <useGreylisting>true</useGreylisting>
   </spamFilter>
   <status>creating</status>
   <type>Catchall</type>
   <productCode>email-catchall-12m</productCode>
   <forwarderTarget>internal_mailbox@example.com</forwarderTarget>
   <paidUntil>2016-02-01T15:57:35Z</paidUntil>
   <renewOn>2016-01-31T15:57:35Z</renewOn>
   <deletionScheduledFor xsi:nil="true"/>
   <restorableUntil xsi:nil="true"/>
   <addDate>2016-01-01T15:57:35Z</addDate>
   <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>

```

Request | mailboxCreate  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/mailboxCreate  
Processing | asynchronous  
Response | [Catchall object](https://www.hosting.de/api/#the-catchall-object)  
Parameter | Type | Required | Description  
---|---|---|---  
mailbox | Catchall object | req | Data for to be created catchall  
In order to create a catchall, you need to send a `mailboxCreate` request. This request takes one parameter `mailbox` which contains all required information of the mailbox to be created. Please note that in order to create a catchall mailbox the `type` parameter of the `mailbox` must be Catchall and all required properties of the [Catchall object](https://www.hosting.de/api/#the-catchall-object) must be set.
## Spam filtering settings
### The SpamFilter Object
```
{
    "bannedFilesChecks": false,
    "deleteSpam": false,
    "headerChecks": false,
    "malwareChecks": false,
    "modifySubjectOnSpam": true,
    "spamChecks": false,
    "spamLevel": "low",
    "useGreylisting": true
}
```

```
<spamFilter>
 <bannedFilesChecks>false</bannedFilesChecks>
 <deleteSpam>false</deleteSpam>
 <headerChecks>false</headerChecks>
 <malwareChecks>false</malwareChecks>
 <modifySubjectOnSpam>true</modifySubjectOnSpam>
 <spamChecks>false</spamChecks>
 <spamLevel>low</spamLevel>
 <useGreylisting>true</useGreylisting>
</spamFilter>
```

Property | Type | Required / Direction | Description  
---|---|---|---  
bannedFilesChecks | bool | optional | Will reject mails with potentially dangerous attachments (like .exe files).  
deleteSpam | bool | optional | Reject spam mails  
headerChecks | bool | optional | The email headers will be checked for unusual patterns.  
malwareChecks | bool | optional | This option enables the scanning of content and attachments of emails for malware and viruses.  
modifySubjectOnSpam | bool | optional | Will modify the subject to mark a recognized spam email as such.  
spamChecks | bool | optional | The content of emails will be compared against a spam database and will mark the Subject if required (see modifySubjectOnSpam).  
spamLevel | string | optional | The levels indicate how many spam factors are taken into account when an email arrives. Valid values: `low`, `medium`. `high`  
useGreylisting | bool | optional | Greylisting will delay the acceptance of emails, allowing significantly better recognition of spam.  
## AutoResponder settings
### The AutoResponder Object
```
{
    "subject": "Out of office",
    "body": "Dear sender, I am out of office.",
    "start": "2016-01-01T15:57:35Z",
    "end": "2016-12-31T15:57:35Z",
    "active": true,
    "enabled": true
}
```

```
<autoResponder>
 <subject>Out of office</subject>
 <body>Dear sender, I am out of office.</body>
 <start>2016-12-31T15:57:35Z</start>
 <end>2016-12-31T15:57:35Z</end>
 <active>true</active>
 <enabled>true</enabled>
</autoResponder>
```

Property | Type | Required / Direction | Description  
---|---|---|---  
subject | string | optional | The subject of the autoresponded email.  
body | string | optional | The email body of the autoresponded email.  
start | datetime | optional | A time on which the autoresponder will become active.  
end | datetime | optional | A time on which the autoresponder will deactivated automatically.  
active | bool | optional | True when the autoresponder is currently active and sending replies.  
enabled | bool | optional | Enable this autoresponder. This option is independent from start and end dates.  
## Updating Mailboxes
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/mailboxUpdate 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "mailbox": {
        "id": "150101aaaaaaaaaa001",
        "type": "ImapMailbox",
        "emailAddress": "testmailbox@example.com",
        "storageQuota": 1024,
        "isAdmin": false
    },
    "password": "!Secret23"
}

```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <mailbox>
  <id>150101aaaaaaaaaa001</id>
  <emailAddress>testmailbox@example.com</emailAddress>
  <storageQuota>1024</storageQuota>
  <type>ImapMailbox</type>
  <isAdmin>false</isAdmin>
 </mailbox>
 <password>!Secret23</password>
</request>

```

> ##### Response
```
{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "bundleId": "",
    "emailAddress": "testmailbox@example.com",
    "emailAddressUnicode": "testmailbox@example.com",
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "spamFilter": {
      "bannedFilesChecks": false,
      "deleteSpam": false,
      "headerChecks": false,
      "malwareChecks": false,
      "modifySubjectOnSpam": true,
      "spamChecks": false,
      "spamLevel": "low",
      "useGreylisting": true
    },
    "status": "active",
    "type": "ImapMailbox",
    "forwarderTargets": [],
    "smtpForwarderTarget": "",
    "isAdmin": false,
    "storageQuota": 1024,
    "storageQuotaUsed": 0,
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
<response>
 <response>
  <response>
   <id>150101aaaaaaaaaa001</id>
   <accountId>15010100000001</accountId>
   <emailAddress>testmailbox@example.com</emailAddress>
   <emailAddressUnicode>testmailbox@example.com</emailAddressUnicode>
   <domainName>example.com</domainName>
   <domainNameUnicode>example.com</domainNameUnicode>
   <spamFilter>
    <bannedFilesChecks>false</bannedFilesChecks>
    <deleteSpam>false</deleteSpam>
    <headerChecks>false</headerChecks>
    <malwareChecks>false</malwareChecks>
    <modifySubjectOnSpam>true</modifySubjectOnSpam>
    <spamChecks>false</spamChecks>
    <spamLevel>low</spamLevel>
    <useGreylisting>true</useGreylisting>
   </spamFilter>
   <status>active</status>
   <type>ImapMailbox</type>
   <forwarderTargets/>
   <smtpForwarderTarget></smtpForwarderTarget>
   <isAdmin>false</isAdmin>
   <storageQuota>1024</storageQuota>
   <storageQuotaUsed>0</storageQuotaUsed>
   <paidUntil>2016-02-01T15:57:35Z</paidUntil>
   <renewOn>2016-01-31T15:57:35Z</renewOn>
   <deletionScheduledFor xsi:nil="true"/>
   <restorableUntil xsi:nil="true"/>
   <addDate>2016-01-01T15:57:35Z</addDate>
   <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
  </response>
 </response>
 ...
</response>

```

Request | mailboxUpdate  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/mailboxUpdate  
Processing | asynchronous  
Response | [ImapMailbox, Forwarder, SmtpForwarder, MailingList or Catchall object](https://www.hosting.de/api/#the-imapmailbox-object)  
Parameter | Type | Required | Description  
---|---|---|---  
mailbox | ImapMailbox, Forwarder, SmtpForwarder, MailingList or Catchall | req | Complete mailbox object of the same type as the mailbox to update.  
password | string | opt | Password for this mailbox  
The mailbox that you want to update is identified by it’s id. All fields not marked out-only are set to the values in the mailbox argument. Optional fields that are not specified in this call are reset to their default values.
The parameter password will only be accepted for ImapMailbox objects.
## Listing Mailboxes
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/Find 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "MailboxEmailAddress",
        "value": "testmailbox@example.com"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "MailboxEmailAddress",
        "order": "asc"
    }
}


```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <filter>
  <field>MailboxEmailAddress</field>
  <value>testmailbox@example.com</value>
 </filter>
 <limit>10</limit>
 <page>1</page>
 <sort>
  <field>MailboxEmailAddress</field>
  <order>asc</order>
 </sort>
</request>


```

> ##### Response
```
{
    ...
    "response": {
        "data": [
            // Mailbox objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 15,
        "totalPages": 2,
        "type": "FindMailboxesResult"
    },
    ...
}


```

```
<response>
 <response>
  <data>
   ...
  </data>
  <limit>10</limit>
  <page>1</page>
  <totalEntries>15</totalEntries>
  <totalPages>2</totalPages>
  <type>FindMailboxesResult</type>
 </response>
 ...
</response>


```

Request | mailboxesFind  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/mailboxesFind  
Processing | synchronous  
Response | [FindMailboxesResult](https://www.hosting.de/api/#filtering-and-sorting)  
Listing mailboxes uses the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `mailboxesFind`. The response will contain a list of mailbox objects.
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | ID of account managing the mailbox  
MailboxId | ID of mailbox  
MailboxEmailAddress | Email address of the mailbox  
MailboxEmailAddressUnicode | Email address of the mailbox in Unicode-Form  
MailboxDomainName | Domain name of the mailbox  
MailboxDomainNameUnicode | Domain name of the mailbox in Unicode-Form  
MailboxType | Type of the mailbox  
MailboxStatus | Status of the mailbox  
MailboxStorageQuota | Mailbox storage capacity  
MailboxStorageQuotaUsed | Currently used storage of the mailbox  
MailboxDeletionScheduledFor | Deletion date and time of the mailbox  
MailboxRestorableUntil | Date and Time until mailbox can be restored  
MailboxPaidUntil | Time that the mailbox is paid for  
MailboxRenewOn | Date and Time of next automatic renewal (and payment)  
MailboxAddDate | Date and time mailbox was created  
MailboxLastChangeDate | Date and time of last modification  
## Deleting Mailboxes
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/mailboxDelete 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "mailboxId": "150101aaaaaaaaaa001",
    "execDate": "2016-01-15T12:00:00Z"
}

```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <mailboxId>150101aaaaaaaaaa001</mailboxId>
 <execDate>2016-01-15T12:00:00Z</execDate>
</request>

```

> ##### Response
```
{
  ...
  "status": "pending"
}

```

```
<response>
 <response>  
   <status>pending</status>
 ...
</response>

```

Request | mailboxDelete  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/mailboxDelete  
Processing | asynchronous  
Response | none  
Parameter | Type | Required | Description  
---|---|---|---  
mailboxId | string | see description | Id of the mailbox  
emailAddress | string | see description | Email address of the meilbox  
execDate | datetime | optional | Scheduled deletion date  
This method deletes a mailbox. To delete a mailbox you must specify either the id of the mailbox or its email address, but not both.
A deleted mailbox can be restored within the restore period with the [mailboxRestore](https://www.hosting.de/api/#restoring-mailboxes) API method. If the mailbox will not be restored within the restore period it will be removed from the system.
If you also specify an execDate, it will be scheduled for deletion on execDate. This will set the mailbox object’s and deletionDate. A scheduled deletion can be canceled with the [mailboxDeletionCancel](https://www.hosting.de/api/#canceling-deletion-of-mailboxes) API method.
## Canceling Deletion of Mailboxes
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/mailboxDeletionCancel 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "mailboxId": "150101aaaaaaaaaa001"
}

```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <mailboxId>150101aaaaaaaaaa001</mailboxId>
</request>

```

Request | mailboxDeletionCancel  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/mailboxDeletionCancel  
Processing | synchronous  
Response | [Mailbox object](https://www.hosting.de/api/#the-imapmailbox-object)  
Parameter | Type | Required | Description  
---|---|---|---  
mailboxId | string | see description | Id of the mailbox  
emailAddress | string | see description | Email address of the mailbox  
This method cancels a scheduled deletion for a mailbox. To cancel a deletion of a mailbox you must specify either the id of the mailbox or its email address, but not both.
## Restoring Mailboxes
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/mailboxRestore 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "mailboxId": "150101aaaaaaaaaa001"
}

```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <mailboxId>150101aaaaaaaaaa001</mailboxId>
</request>

```

> ##### Response
```
{
  ...
  "response": {
    "id": "150101aaaaaaaaaa001",
    "accountId": "15010100000001",
    "emailAddress": "testmailbox@example.com",
    "emailAddressUnicode": "testmailbox@example.com",
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "spamFilter": {
      "bannedFilesChecks": false,
      "deleteSpam": false,
      "headerChecks": false,
      "malwareChecks": false,
      "modifySubjectOnSpam": true,
      "spamChecks": false,
      "spamLevel": "low",
      "useGreylisting": true
    },
    //mailbox type specific properties
    "status": "restorable",
    "paidUntil": "2016-02-01T15:57:35Z",
    "renewOn": "2016-01-31T15:57:35Z",
    "deletionScheduledFor": null,
    "restorableUntil": "2016-01-22T12:00:00Z",
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-15T12:00:00Z"
  }
}

```

```
<response>
 <response>
  <response>
   <id>150101aaaaaaaaaa001</id>
   <accountId>15010100000001</accountId>
   <emailAddress>testmailbox@example.com</emailAddress>
   <emailAddressUnicode>testmailbox@example.com</emailAddressUnicode>
   <domainName>example.com</domainName>
   <domainNameUnicode>example.com</domainNameUnicode>
   <spamFilter>
    <bannedFilesChecks>false</bannedFilesChecks>
    <deleteSpam>false</deleteSpam>
    <headerChecks>false</headerChecks>
    <malwareChecks>false</malwareChecks>
    <modifySubjectOnSpam>true</modifySubjectOnSpam>
    <spamChecks>false</spamChecks>
    <spamLevel>low</spamLevel>
    <useGreylisting>true</useGreylisting>
   </spamFilter>
   ...mailbox type specific properties
   <status>restorable</status>
   <paidUntil>2016-02-01T15:57:35Z</paidUntil>
   <renewOn>2016-01-31T15:57:35Z</renewOn>
   <deletionScheduledFor xsi:nil="true"/>
   <restorableUntil>2016-01-22T12:00:00Z</restorableUntil>
   <addDate>2016-01-01T15:57:35Z</addDate>
   <lastChangeDate>2016-01-15T12:00:00Z</lastChangeDate>
  </response>
 </response>
 ...
</response>

```

Request | mailboxRestore  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/mailboxRestore  
Processing | asynchronous  
Response | [Mailbox object](https://www.hosting.de/api/#the-imapmailbox-object)  
Parameter | Type | Required | Description  
---|---|---|---  
mailboxId | string | see description | Id of the mailbox  
emailAddress | string | see description | Email address of the mailbox  
This method restores a previously deleted mailbox. After the mailbox is restored it can be used normally. To restore a mailbox you must specify either the id of the mailbox or its email address, but not both.
## Purging Restorable Mailboxes
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/mailboxPurgeRestorable 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "mailboxId": "150101aaaaaaaaaa001"
}

```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <mailboxId>150101aaaaaaaaaa001</mailboxId>
</request>

```

> ##### Response
```
{
  ...
  "status": "pending"
}

```

```
<response>
 <response>  
   <status>pending</status>
 ...
</response>

```

Request | mailboxPurgeRestorable  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/mailboxPurgeRestorable  
Processing | asynchronous  
Response | none  
Parameter | Type | Required | Description  
---|---|---|---  
mailboxId | string | see description | id of the mailbox  
emailAddress | string | see description | email address of the mailbox  
This method deletes a restorable mailbox immediately from the system. You will not be able to restore it afterwards. To use this method you must specify either the id of the mailbox or its email address, but not both.
Please note that only restorable mailboxes can be purged
## Checking Mailbox Authorization
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/checkEmailAddress 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "emailAddress": "testmailbox@example.com"
}

```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <emailAddress>testmailbox@example.com</emailAddress>
</request>

```

> ##### Response
```
{
  ...
  "response": {
    "status": "emailAddressAvailable",
    "verificationCode": "",
    "errors": [],
    "bundleCompatibility": true,
    "dnsConfigurationRequired": false,
    "dnsAutoconfigurationPossible": true,
    "currentDnsRecords": [],
    "requiredDnsRecords": []
  }
}
```

```
<response>
 <response>
  <response>
 <status>emailAddressAvailable</status>
 <verificationCode></verificationCode>
 <errors></errors>
 <bundleCompatibility>true</bundleCompatibility>
 <dnsConfigurationRequired>false</dnsConfigurationRequired>
 <dnsAutoconfigurationPossible>true</dnsAutoconfigurationPossible>
 <currentDnsRecords></currentDnsRecords>
 <requiredDnsRecords></requiredDnsRecords>
  </response>
 </response>
 ...
</response>
```

Request | checkEmailAddress  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/checkEmailAddress  
Processing | synchronous  
Response | CheckEmailAddressResult  
Parameter | Type | Required | Description  
---|---|---|---  
emailAddress | string | required | Email address of the mailbox  
productCode | string | optional | ProductCode of the mailbox  
accountId | string | optional | ID of the account under which the mailbox should be created  
bundleId | string | optional | ID of the bundle in which the mailbox should be created  
skipDnsCheck | bool | optional | Skip the DNS validation checks  
This method checks if an mailbox can be created and if dns authorizationes required (This happens when the domain is not in your account).
If `status` in the result object is `emailAddressAvailable` you can proceed to create the mailbox.
If `status` in the result object is `verificationRequired` you need to create a TXT DNS record in the domain with the value from the `verificationCode` field in the result object.
## Domain Settings
Domain settings serve to display and limit the usage of mailboxes in a certain domain.
### The DomainSettings Object
```
﻿{
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "storageQuota": -1,
    "storageQuotaAllocated": 1024,
    "mailboxQuota": -1,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-01T15:57:35Z"
}
```

```
﻿<DomainSettings>
 <domainName>example.com</domainName>
 <domainNameUnicode>example.com</domainNameUnicode>
 <storageQuota>-1</storageQuota>
 <storageQuotaAllocated>1024</storageQuotaAllocated>
 <mailboxQuota>-1</mailboxQuota>
 <addDate>2016-01-01T15:57:35Z</addDate>
 <lastChangeDate>2016-01-01T15:57:35Z</lastChangeDate>
</DomainSettings>
```

Property | Type | Required / Direction | Description  
---|---|---|---  
domainName | string | required | Domain name in ASCII/ACE format.  
domainNameUnicode | string | out-only | Domain name in Unicode/international format.  
storageQuota | int | optional | Storage quota allowed to be used in this domain for imap mailboxes.  
storageQuotaAllocated | int | out-only | Currently used storage in this domain for imap mailboxes.  
mailboxQuota | int | optional | Number of imap mailboxes allowed to be created in this domain.  
exchangeStorageQuota | int | removal pending | Always 0  
exchangeStorageQuotaAllocated | int | removal pending | Always 0  
exchangeMailboxQuota | int | removal pending | Always 0  
addDate | datetime | out-only | Date and time the mailbox was created in the system.  
lastChangeDate | datetime | out-only | Last date and time the mailbox was modified.  
The value of -1 for all limits in domain settings means unlimited
### Listing Domain Settings
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/Find 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "DomainName",
        "value": "example.com"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "DomainName",
        "order": "asc"
    }
}


```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <filter>
  <field>DomainName</field>
  <value>example.com</value>
 </filter>
 <limit>10</limit>
 <page>1</page>
 <sort>
  <field>DomainName</field>
  <order>asc</order>
 </sort>
</request>


```

> ##### Response
```
{
    ...
    "response": {
        "data": [
            // DomainSettings objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 15,
        "totalPages": 2,
        "type": "FindDomainSettingsResult"
    },
    ...
}


```

```
<response>
 <response>
  <data>
   ...DomainSettings objects
  </data>
  <limit>10</limit>
  <page>1</page>
  <totalEntries>15</totalEntries>
  <totalPages>2</totalPages>
  <type>FindDomainSettingsResult</type>
 </response>
 ...
</response>


```

Request | domainSettingsFind  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/domainSettingsFind  
Processing | synchronous  
Response | [FindDomainSettingsResult](https://www.hosting.de/api/#filtering-and-sorting)  
Listing domain settings uses the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `domainSettingsFind`. The response will contain a list of [DomainSettings](https://www.hosting.de/api/#the-domainsettings-object) objects.
The following fields are available for filtering and sorting:
Field | Description  
---|---  
DomainName | Domain name  
MailboxId | ID of mailbox  
MailboxEmailAddress | Email address of the mailbox  
MailboxEmailAddressUnicode | Email address of the mailbox in Unicode-Form  
MailboxDomainName | Domain name of the mailbox  
MailboxDomainNameUnicode | Domain name of the mailbox in Unicode-Form  
### Updating DomainSettings
It is possible to limit mailboxes number or storage usage for certain domains using the [DomainSettings](https://www.hosting.de/api/#the-domainsettings-object) object and [domainSettingsUpdate](https://www.hosting.de/api/#updating-domainsettings) API method.
> ##### POST https://secure.hosting.de/api/email/v1/jsonxml/domainSettingsUpdate 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "domainSettings": {
        "domainName": "example.com",
        "storageQuota": 10240,
        "mailboxQuota": 10
    }
}

```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
<domainSettings>
 <domainName>example.com</domainName>
 <storageQuota>10240</storageQuota>
 <mailboxQuota>10</mailboxQuota>
</domainSettings>
</request>

```

> ##### Response
```
{
  ...
  "response": {
    "domainName": "example.com",
    "domainNameUnicode": "example.com",
    "storageQuota": 10240,
    "storageQuotaAllocated": 1024,
    "mailboxQuota": 10,
    "addDate": "2016-01-01T15:57:35Z",
    "lastChangeDate": "2016-01-15T12:00:00Z"
  }
}

```

```
<response>
 <response>
  <response>
 <domainName>example.com</domainName>
 <domainNameUnicode>example.com</domainNameUnicode>
 <storageQuota>10240</storageQuota>
 <storageQuotaAllocated>1024</storageQuotaAllocated>
 <mailboxQuota>10</mailboxQuota>
 <addDate>2016-01-01T15:57:35Z</addDate>
 <lastChangeDate>2016-01-15T12:00:00Z</lastChangeDate>
  </response>
 </response>
 ...
</response>

```

Request | domainSettingsUpdate  
---|---  
Url |  https://secure.hosting.de/api/email/v1/jsonxml/domainSettingsUpdate  
Processing | synchronous  
Response | [DomainSettings object](https://www.hosting.de/api/#the-domainsettings-object)  
Parameter | Type | Required | Description  
---|---|---|---  
domainSettings | DomainSettings object | req | Data for the domain settings to be updated  
