# Domains
The domain part of the API allows to create and maintain domains in a wide variety of domain name registries.
Each domain requires [contact](https://www.hosting.de/api/#the-contact-object) information of the owner as well as other individuals and organizations involved in maintaining the domain.
Allocation | Description  
---|---  
owner | Legal owner of domain name  
admin | Administrative contact  
tech | Technical contact  
zone | Contact for issues regarding the DNS servers or DNS setup of the domain  
If a registry has a separate billing contact, the `admin` contact will be used as billing contact in registry operations.
Each domain requires two or more name servers. They need to serve authoritative answers regarding host names in the DNS zone corresponding to the domain.
Some registries implement strict quality checks for the setup and required answers of the 
name servers. This can result in the deletion of a domain in case the domain is not connected.
## The Contact Object
```
{
	"accountId": "15010100000001",
	"id": "15010100000010",
	"handle": "JS15",
	"type": "person",
	"name": "John Smith",
	"organization": "",
	"street": [
		"Happy ave. 42"
	],
	"postalCode": "12345",
	"city": "Where ever",
	"state": "",
	"country": "de",
	"emailAddress": "john@example.com",
	"phoneNumber": "+49 1234 567890",
	"faxNumber": "",
	"sipUri": "",
	"hidden": false,
	"usableBySubAccount": false,
	"addDate": "2015-01-01T00:00:00",
	"lastChangeDate": "2015-01-01T00:00:00"
}
```

```
<id>15010100000000</id>
<accountId>15010100000000</accountId>
<handle>JS15</handle>
<type>person</type>
<name>John Smith</name>
<organization></organization>
<street>
    <item>Happy ave. 42</item>
</street>
<postalCode>12345</postalCode>
<city>Where ever</city>
<state></state>
<country>de</country>
<emailAddress>john@example.com</emailAddress>
<phoneNumber>+49 1234 567890</phoneNumber>
<faxNumber></faxNumber>
<sipUri></sipUri>
<hidden>false</hidden>
<usableBySubAccount>false</usableBySubAccount>
<addDate>2015-01-01T00:00:00</addDate>
<lastChangeDate>2015-01-01T00:00:00</lastChangeDate>
```

The `contact object` is used for managing domains. It can have one of three types:
  * Person: Natural individual
  * Organization: Not a natural individual
  * Role: Abstract group of individuals

Some country code TLDs need additional information, e.g. ID card numbers. This information can be added by contact extensions. Please keep in mind that contact extensions are not documented yet, since they are still under review.
#### Contact Object
Property | Type | Required / Direction | Description  
---|---|---|---  
accountId | string | out-only | ID of contact managing account. Field never used in requests.  
id | string | see description | Contact ID. Ignored in contact create requests. Either `id` or `handle` is required in all other requests.  
handle | string | see description | Contact handle. Ignored in contact create requests. Either `id` or `handle` is required in all other requests.  
type | string | req | Valid types are `person`, `org`, and `role`  
name | string | req | Full contact name. For organizations this is the name of a contact in the organization.  
organization | string | see description | Is a required field for `org` handles. Name of the organization  
Example: _Beispiel Ltd._  
street | list<string> | req | List of address entries. Contains up to three entries.  
postalCode | string | opt | Postal code (address)  
city | string | req | City (address)  
state | string | opt | State (address)  
country | string | req | Country code in **ISO 3166-1 alpha-2** (see [iso.org](http://www.iso.org/iso/country_codes.htm) or [Wikipedia](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)). Will always be returned in lower case.   
Example: de  
emailAddress | string | req | Must be a valid email address  
phoneNumber | string | req | The phone number consists of country code, area code and the local number. These three parts are separated by spaces. Additional spaces are not allowed.  
example: `+49 123 4567890`.  
faxNumber | string | opt | Fax number (same rules apply as for the phone number)   
Example: `+49 123 4567899`  
sipUri | string | opt | SIP URI  
hidden | bool | opt | Can be used to mark unwanted contacts that are still in use. If a hidden contact is used as domain handle, the API will warn you.  
usableBySubAccount | bool | opt | Allows **direct subaccounts** to use this contact  
addDate | datetime | out-only | Date and time of contact creation  
lastChangeDate | datetime | out-only | Date and time the contact was last modified  
## Listing Contacts
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/contactsFind 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "filter": {
        "field": "ContactName",
        "value": "*Smith*"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "ContactName",
        "order": "asc"
    }
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <clientTransactionId></clientTransactionId>
 <filter>
  <field>ContactName</field>
  <value>*Smith*</value>
 </filter>
 <limit>10</limit>
 <page>1</page>
 <sort>
  <field>ContactName</field>
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
            // contact objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 15,
        "totalPages": 2,
        "type": "FindContactsResult"
    },
    ...
}
```

```
<response>
 <response>
  <data/>
     // contact objects
  </data>
  <limit>10</limit>
  <page>1</page>
  <totalEntries>15</totalEntries>
  <totalPages>2</totalPages>
  <type>FindContactsResult</type>
 </response>
</response>
```

Request | contactsFind  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/contactsFind  
Processing | synchronous  
Response | [FindContactsResult](https://www.hosting.de/api/#filtering-and-sorting)  
Listing contacts uses the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `contactsFind`. The response will contain a list of [Contact objects](https://www.hosting.de/api/#the-contact-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | Managing account ID  
ContactId | ID of contact  
ContactHandle | Handle of contact  
ContactType | Type of contact (cf. [Contact object](https://www.hosting.de/api/#the-contact-object))  
ContactName | Name of contact  
ContactOrganization | Organization of contact  
ContactStreet | All street entries (contact address)  
ContactPostalCode | Postal code (contact address)  
ContactCity | City (contact address)  
ContactState | State (contact address)  
ContactCountry | Country of address in ISO 3166-1 alpha-2 (cf. [Contact objects](https://www.hosting.de/api/#the-contact-object))  
ContactEmailAddress | Email address of contact  
ContactPhoneNumber | Phone number of contact (format, cf. [Contact objects](https://www.hosting.de/api/#the-contact-object))  
ContactFaxNumber | Fax number of the contact (format, cf. [Contact objects](https://www.hosting.de/api/#the-contact-object))  
ContactSipUri | SIP URI of contact  
ContactUsableBySubAccount | Contact is usable by subaccounts  
ContactHidden | Contact is hidden  
UsableForDomainInAccount | Must be an account ID. If set, the listing will only return contacts that are usable for domain operations for that specific account.  
ContactAddDate | Date and time the contact was created  
ContactLastChangeDate | Date and time the contact was last modified  
## Retrieving Specific Contacts
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/contactInfo 
```
{
    "authToken": "$$YOUR API KEY$$",
    "contactId": "15010100000010"
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <contactId>15010100000010</contactId>
</request>
```

> ##### Response
```
{
    ...
    "response": {
        // contact object
    },
    ...
}
```

```
<response>
 ...
 <response>
     // contact object
 </response>
 ...
</response>
```

Request | contactInfo  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/contactInfo  
Processing | synchronous  
Response | [Contact object](https://www.hosting.de/api/#the-contact-object)  
Parameter | Type | Required | Description  
---|---|---|---  
contactId | string | req | ID of contact  
In order to retrieve a specific contact, you can either use the `contactsFind` method and use the `ContactId` filter or you can use the `contactInfo` method which uses a contact ID as input and returns the `contact` object, if it exists.
## Creating New Contacts
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/contactCreate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "contact": {
        "type": "person",
    	"name": "John Smith",
    	"organization": "",
    	"street": [
    		"Happy ave. 42"
    	],
    	"postalCode": "12345",
    	"city": "Where ever",
    	"country": "de",
    	"emailAddress": "john@example.com",
    	"phoneNumber": "+49 1234 567890"
    }
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <contact>
  <type>person</type>
  <name>John Smith</name>
  <organization></organization>
  <street>
   <item>Happy ave. 42</item>
  </street>
  <postalCode>12345</postalCode>
  <city>Where ever</city>
  <country>de</country>
  <emailAddress>john@example.com</emailAddress>
  <phoneNumber>+49 1234 567890</phoneNumber>
 </contact>
</request>
```

> ##### Response
```
{
    ...
    "response": {
        "accountId": "15010100000001",
    	"id": "15010100000010",
    	"handle": "JS15",
	    "addDate": "2015-01-01T00:00:00",
    	"lastChangeDate": "2015-01-01T00:00:00",
    	...
    },
    ...
}
```

```
<response>
 <response>
  <id>15010100000010</id>
  <accountId>15010100000001</accountId>
  <handle>JS15</handle>
  <addDate>2015-01-01T00:00:00</addDate>
  <lastChangeDate>2015-01-01T00:00:00</lastChangeDate>
 </response>
</response>
```

Request | contactCreate  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/contactCreate  
Processing | synchronous  
Response | [Contact object](https://www.hosting.de/api/#the-contact-object)  
Parameter | Type | Required | Description  
---|---|---|---  
contact | [Contact object](https://www.hosting.de/api/#the-contact-object) | req | Complete contact object  
This method is used to create a new contact in the system. The object must contain all required fields. `id` and `handle` fields can be filled, but will be ignored. The response will contain the newly created [contact object](https://www.hosting.de/api/#the-contact-object).
## Updating Contacts
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/contactUpdate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "contact": {
        "handle": "JS48", // or "id": "15010100000010"
        ...
        "emailAddress": "jane@example.com",
        ...
    }
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <contact>
 <handle>JS48</handle> // or <id>15010100000010</id>
  ...
  <emailAddress>jane@example.com</emailAddress>
  ...
 </contact>
</request>
```

> ##### Response
```
{
    ...
    "response": {
        ...
    	"emailAddress": "jane@example.com",
    	"lastChangeDate": "2015-01-01T12:00:00",
    	...
    },
    ...
}
```

```
<response>
 ...
 <response>
  ...
  <emailAddress>jane@example.com</emailAddress>
  <lastChangeDate>2015-01-01T12:00:00</lastChangeDate>
  ...
 </response>
 ...
</response>
```

Request | contactUpdate  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/contactUpdate  
Processing | asynchronous  
Response | [Contact object](https://www.hosting.de/api/#the-contact-object)  
Parameter | Type | Required | Description  
---|---|---|---  
contact | [Contact object](https://www.hosting.de/api/#the-contact-object) | req | Complete contact object  
actingAs | string | opt | see below  
The contact to update can either be identified by `id` or by `handle`. All fields not marked ‘out-only’ are set to the values in the contact argument. Optional fields that are not specified in this request are reset to their default values.
The update is pushed to every registry the contact is connected to. This will result in seperate jobs for every registry.
Please note that `type`, `name`, and `organization` of a contact cannot be changed. Some registries do not allow changing phone numbers as well. In case the contact is used in a domain from these registries, the API will return a synchronous error.
The `email` of a contact that is linked to a domain in a generic extension (com, net, etc) may only be changed by an account that acts as an designated agent of both the new and the old contact.
By passing `designatedAgent` as the `actingAs` parameter you affirm that the current and the new contact have explicitly opted in to authorize you to approve a Change of Registrant on their behalf.
To check if an update is an owner change under ICANN rules (i.e. is material change and affects domains under icann rules) you can use the `contactUpdateIsIcannOwnerChange` api function.
Request | contactUpdateIsIcannOwnerChange  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/contactUpdateIsIcannOwnerChange  
Processing | synchronous  
Response | bool  
Parameter | Type | Required | Description  
---|---|---|---  
contact | [Contact object](https://www.hosting.de/api/#the-contact-object) | req | contact object to check  
## Deleting Contacts
Deleting contacts via API is not possible at the moment and might never be. Unused contacts will automatically be deleted after a while. In that case, an automatic poll message will inform you.
If you want to hide a contact, you can set the `hidden` parameter to `true`. Then, the contact will not be shown in the web control panel for registering new domains. Also, the `contactsFind` method will not return the contact any longer, if you use the filter `UsableForDomainInAccount`.
If you use a hidden contact 
for domain registrations, the response will contain a warning.
## The Domain Object
```
{
    "id": "150101000000010",
    "accountId": "150101000000001",
    "name": "example.com",
    "nameUnicode": "example.com",
    "status": ["ok"],
    "transferLockEnabled": false,
    "authInfo": "1234,ABCD+xyz",
    "contacts": [
        {
            "contact": "150101000000021",
            "type": "owner"
        },
        {
            "contact": "150101000000020",
            "type": "admin"
        },
        {
            "contact": "150101000000022",
            "type": "tech"
        },
        {
            "contact": "150101000000023",
            "type": "zone"
        }
    ],
    "nameservers": [
        {
            "ips": [],
            "name": "ns.example.net"
        },
        {
            "name": "ns.example.com",
            "ips": ["192.0.2.1", "2001:db8:3fe:1001:7777:772e:2:85"]
        }
    ],
    "createDate": "2014-01-01",
    "currentContractPeriodEnd": "2015-12-31",
    "nextContractPeriodStart": "2016-01-01",
    "deletionType": "",
    "deletionDate": "",
    "addDate": "2015-01-01T00:00:00",
    "lastChangeDate": "2014-12-15T00:00:00"
}
```

```
<domainObject>
 <id>150101000000010</id>
 <accountId>150101000000001</accountId>
 <name>example.com</name>
 <nameUnicode>example.com</nameUnicode>
 <status>
  <item>ok</item>
 </status>
 <transferLockEnabled>false</transferLockEnabled>
 <authInfo>1234,ABCD+xyz</authInfo>
 <contacts>
  <item>
   <contact>150101000000021</contact>
   <type>owner</type>
  </item>
  <item>
   <contact>150101000000020</contact>
   <type>admin</type>
  </item>
  <item>
   <contact>150101000000022</contact>
   <type>tech</type>
  </item>
  <item>
   <contact>150101000000023</contact>
   <type>zone</type>
  </item>
 </contacts>
 <nameservers>
  <item>
   <ips/>
   <name>ns.example.net</name>
  </item>
  <item>
   <ips>
    <item>192.0.2.1</item>
    <item>2001:db8:3fe:1001:7777:772e:2:85</item>
   </ips>
   <name>ns.example.com</name>
  </item>
 </nameservers>
 <createDate>2014-01-01</createDate>
 <currentContractPeriodEnd>2015-12-31</currentContractPeriodEnd>
 <nextContractPeriodStart>2016-01-01</nextContractPeriodStart>
 <deletionDate></deletionDate>
 <deletionType></deletionType>
 <addDate>2015-01-01T00:00:00</addDate>
 <lastChangeDate>2014-12-15T00:00:00</lastChangeDate>
</domainObject>
```

#### Domain Object
Property | Type | Required / Direction | Description  
---|---|---|---  
id | string | out-only | Domain ID  
accountId | string | out-only | ID of account managing domain (field is never used in requests)  
name | string | req | Domain name. (_Unicode_ or _ASCII_ format). The name will always be returned in _ASCII/ACE_ format.  
nameUnicode | string | out-only | Domain name in Unicode/international format  
status | string | out-only | Domain status, cf. below for explanation of statuses  
transferLockEnabled | bool | req | If set to `true`, outgoing transfers will be blocked. Please keep in mind that not every TLD supports this feature.  
authInfo | string | out-only | The domain transfer authorisation code for this domain. Only contains a value if `transferLockEnabled` is not set.  
contacts | list<DomainContact> | req | List of contacts for this domain, cf. [Domain Contact Object](https://www.hosting.de/api/#domaincontact-object) for details  
nameservers | list<Nameserver> | req | List of name servers for this domain, cf. [Name Server Object](https://www.hosting.de/api/#nameserver-object) for details.  
createDate | date | out-only | Date of domain creation. If the domain is transferred in and the registry does not support getting the original creation date, it will be the date of the transfer.  
currentContractPeriodEnd | date | out-only | End date of current contract period  
nextContractPeriodStart | date | out-only | Start date of next contract period  
deletionType | string | out-only | Removal mode (`delete` or `withdraw`). Empty when domain is not scheduled for removal.  
deletionDate | datetime | out-only | Date the domain is scheduled for deletion or withdrawal. Is empty if domain is not scheduled for removal.  
addDate | datetime | out-only | Date and time this domain was created in or transferred into our system.  
lastChangeDate | datetime | out-only | Date and time of last modification of any domain data in our system.  
#### DomainContact Object
Property | Type | Required | Description  
---|---|---|---  
type | string | req |  `owner`, `admin`, `tech`, or `zone`  
contact | string | req | Contact handle or ID in our system. The contact will always be returned as an ID.  
#### Nameserver Object
Property | Type | Required | Description  
---|---|---|---  
name | string | req | Fully qualified domain name of name server.  
Example: ns1.example.net  
ips | list<string> | cf. description | List of IP addresses of this name server. Required for name servers that are subdomains of the domain itself. Otherwise it is ignored.  
Examples: “192.0.2.15”, “2001:db8::cafe”, “2001:db8:3fe:1001:7777:772e:2:85”  
#### Domain Status
The following domain statuses are defined:
Domain status | Description  
---|---  
ordered | Domain is ordered but create or transfer process is not completed yet  
active | Domain is in customer’s account  
restorable | Domain was deleted and is in restore grace period  
failed | Domain is failed; registry will delete the domain if no action is taken  
## Listing Domains
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainsFind 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "domainNameUnicode",
        "value": "*example.com*"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "domainNameUnicode",
        "order": "asc"
    }
}
```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <filter>
  <field>domainNameUnicode</field>
  <value>*example.com*</value>
 </filter>
 <limit>10</limit>
 <page>1</page>
 <sort>
  <field>domainNameUnicode</field>
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
            // domain objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 15,
        "totalPages": 2,
        "type": "FindDomainsResult"
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
  <type>FindDomainsResult</type>
 </response>
 ...
</response>
```

Request | domainsFind  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/domainsFind  
Processing | synchronous  
Response | [FindDomainsResult](https://www.hosting.de/api/#filtering-and-sorting)  
When listing domains, you use the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `domainsFind`. The response will contain a list of [Domain objects](https://www.hosting.de/api/#the-domain-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
DomainId | ID of domain  
AccountId | ID of domain’s managing account  
DomainName | Domain name in ACE format  
DomainNameUnicode | Domain name in Unicode format  
DomainStatus | [Domain Status](https://www.hosting.de/api/#domain-status)  
DomainCreateDate | Creation date in registry  
DomainCurrentContractPeriodEnd | End date of current domain contract period  
DomainNextContractPeriodStart | Start date of next domain contract period  
DomainTransferLockEnabled | Activate blocking transfer outs  
DomainDeletionType | Delete or withdraw domain. Empty, if domain is not scheduled for removal.  
DomainDeletionDate | Withdrawal/Deletion date. Empty, if domain is not scheduled for removal.  
DomainAddDate | Date and time the domain name object was created in our system.  
DomainLastChangeDate | Date and time the domain name was last modified.  
ContactId | Match domain names using this contact  
DomainContactAllocation | Match domain names that use `ContactId` for this allocation  
ContactHandle | Handle of a contact connected to the domain name  
ContactName | Name of a contact connected to the domain name  
ContactOrganization | Organization of a contact connected to the domain name  
## Registering New Domains
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainCreate 
```
{
	"authToken": "$$YOUR API KEY$$",
	"domain": {
		"name": "example.com",
		"transferLockEnabled": true,
        "contacts": [
            {
                "contact": "150101000000021",
                "type": "owner"
            },
            {
                "contact": "150101000000020",
                "type": "admin"
            },
            {
                "contact": "150101000000022",
                "type": "tech"
            },
            {
                "contact": "150101000000023",
                "type": "zone"
            }
        ],
		"nameservers": [
			{
				"name": "ns1.example.net"
			},
			{
				"name": "ns2.example.net"
			},
			{
				"name": "ns3.example.com",
				"ip": ["192.0.2.1", "192.0.2.200", "2001:db8:3fe:1001:7777:772e:2:85"]
			}
		]
	}
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <domain>
  <name>example.com</name>
  <transferLockEnabled>true</transferLockEnabled>
  <contacts>
   <item>
    <contact>150101000000021</contact>
    <type>owner</type>
   </item>
   <item>
    <contact>150101000000020</contact>
    <type>admin</type>
   </item>
   <item>
    <contact>150101000000022</contact>
    <type>tech</type>
   </item>
   <item>
    <contact>150101000000023</contact>
    <type>zone</type>
   </item>
  </contacts>
  <nameservers>
   <item>
    <name>ns1.example.net</name>
   </item>
   <item>
    <name>ns2.example.net</name>
   </item>
   <item>
    <ip>
    <name>ns3.example.com</name>
     <item>192.0.2.1</item>
     <item>192.0.2.200</item>
     <item>2001:db8:3fe:1001:7777:772e:2:85</item>
    </ip>
   </item>
  </nameservers>
 </domain>
</request>
```

> ##### Response
```
{
    ...
    "response": {
        "id": "150101000000010",                    // newly generated id
        "accountId": "150101000000001",             // account id used for creation
        "name": "example.com",                      // domain name translated to Ace form
        "nameUnicode": "example.com",               // domain name translated to Unicode form
        "status": ["api-create-pending"],           // domain registration is running
        // ... as supplied in request, contact handles will be translated to ids
        "createDate": "2014-01-01",                 // always current date for create
        "currentContractPeriodEnd": "2015-12-31",   // provisional value
        "nextContractPeriodStart": "2016-01-01",    // provisional value
        "addDate": "2015-01-01T00:00:00",           // always current date for create
        "lastChangeDate": "2015-01-01T00:00:00"     // always current date and time
    }
}
```

```
<response>
 <response>
  <id>150101000000010</id>                                          // newly generated id
  <accountId>150101000000001</accountId>                            // account id used for creation
  <name>example.com</name>                                          // domain name translated to Ace form
  <nameUnicode>example.com</nameUnicode>                            // domain name translated to Unicode form
  <status>                                                          // domain registration is running
   <item>api-create-pending</item>
  </status>
  // ... as supplied in request, contact handles will be translated to ids
  <createDate>2014-01-01</createDate>                               // always current date for create
  <currentContractPeriodEnd>2015-12-31</currentContractPeriodEnd>   // provisional value
  <nextContractPeriodStart>2016-01-01</nextContractPeriodStart>     // provisional value
  <addDate>2015-01-01T00:00:00</addDate>                            // always current date for create
  <lastChangeDate>2015-01-01T00:00:00</lastChangeDate>              // always current date and time
 </response>
</response>
```

Request | domainCreate  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/domainCreate  
Processing | asynchronous  
Response | [Domain object](https://www.hosting.de/api/#the-domain-object)  
Parameter | Type | Required | Description  
---|---|---|---  
domain | Domain object | req | Data for to be created domain  
In order to create a domain, you need to send a `domainCreate` request. This request takes one parameter `domain` which contains all required information of a [domain object](https://www.hosting.de/api/#the-domain-object).
Each allocation (`owner`, `tech`, `admin`, `zone`) requires one contact. The system will ensure that only supported contact allocations will be used for registry operations.
Please note that domains will always be created with transfer lock, regardless of which value is specified for `transferLockEnabled` in the request. If you require a domain without transfer lock, you need to request an update after creating the domain.
The `contractPeriod` details are provisional values. If the actual registration of the domain is delayed, the contract period will be adjusted accordingly.
## Updating Domains
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainUpdate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "domain": {
        "name": "example.com",
        "transferLockEnabled": false,
        "contacts": [
            {
                "contact": "150101000000025",
                "type": "owner"
            },
            {
                "contact": "150101000000024",
                "type": "admin"
            },
            {
                "contact": "150101000000026",
                "type": "tech"
            },
            {
                "contact": "150101000000027",
                "type": "zone"
            }
        ],
		"nameservers": [
			{
				"name": "ns1.great-domains.net"
			},
			{
				"name": "ns2.great-domains.net"
			}
		]

    }
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <clientTransactionId></clientTransactionId>
 <domain>
  <name>example.com</name>
  <transferLockEnabled>false</transferLockEnabled>
  <contacts>
   <item>
    <contact>150101000000025</contact>
    <type>owner</type>
   </item>
   <item>
    <contact>150101000000024</contact>
    <type>admin</type>
   </item>
   <item>
    <contact>150101000000026</contact>
    <type>tech</type>
   </item>
   <item>
    <contact>150101000000027</contact>
    <type>zone</type>
   </item>
  </contacts>
  <nameservers>
   <item>
    <name>ns1.great-domains.net</name>
   </item>
   <item>
    <name>ns2.great-domains.net</name>
   </item>
  </nameservers>
 </domain>
</request>
```

Request | domainUpdate  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/domainUpdate  
Processing | asynchronous  
Response | [Domain object](https://www.hosting.de/api/#the-domain-object)  
Parameter | Type | Required | Description  
---|---|---|---  
domain | Domain object | req | Updated domain data  
actingAs | string | opt | see below  
In order to update a domain, you send a `domainUpdate` request with a domain object containing the modified properties.
Usually, you need to send a modified version of an object you received from [`domainInfo`](https://www.hosting.de/api/#retrieving-specific-domains) or [`domainsFind`](https://www.hosting.de/api/#listing-domains).
The modified domain is identified by the `id` or `name` property in the supplied domain object. All fields not marked ‘out-only’ are set to the values in the contact argument. Optional fields that are not specified in this request are reset to their default values.
The response will contain the modified [domain object](https://www.hosting.de/api/#the-domain-object).
Changing the owner contact of a domain in a generic extension (com, net, etc) may result in an owner change under the ICANN rules. If this is the case both new and old contact need to confirm the change via emailed confirm code.
By passing `designatedAgent` as the `actingAs` parameter you affirm that the current and the new contact have explicitly opted in to authorize you to approve a Change of Registrant on their behalf. Thus the email confirmation will not be needed.
To check if an update is an owner change under ICANN rules (i.e. is material change and affects domains under icann rules) you can use the `domainUpdateIsIcannOwnerChange` api function.
Request | domainUpdateIsIcannOwnerChange  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/domainUpdateIsIcannOwnerChange  
Processing | synchronous  
Response | bool  
Parameter | Type | Required | Description  
---|---|---|---  
domain | Domain object | req | domain data to check  
## Retrieving Specific Domains
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainInfo 
```
{
    "authToken": "$$YOUR API KEY$$",
    "domainName": "example.com"
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <domainName>example.com</domainName>
</request>
```

Request | domainInfo  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/domainInfo  
Processing | synchronous  
Response | [Domain object](https://www.hosting.de/api/#the-domain-object)  
Parameter | Type | Required | Description  
---|---|---|---  
domainName | string | req | Domain name (_ACE_ or _Unicode_)  
The `domainInfo` is a shortcut to retrieve data of a domain with a specific name.
## Checking Domain Name Availability
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainStatus 
```
{
    "authToken": "$$YOUR API KEY$$",
    "domainNames": [
        "somedomain.com"
    ]
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <domainNames>
  <item>somedomain.com</item>
 </domainNames>
</request>
```

> ##### Response
```
{
    "metadata": { ... },
    "responses": [
        {
            "domainName": "example.com",
            "domainNameUnicode": "example.com",
            "domainSuffix": "com",
            "status": "available",
            "transferMethod": "authInfo"
        }
    ],
    "status": "success",
    "warnings": [ ]
}
```

```
<response>
 <metadata>...</metadata>
 <responses>
  <item>
   <domainName>example.com</domainName>
   <domainnameUnicode>example.com</domainNameUnicode>
   <domainSuffix>com</domainSuffix>
   <status>available</status>
   <transferMethod>authInfo</transferMethod>
  </item>
 </responses>
 <status>success</status>
 <warnings/>
</response>
```

Request | domainStatus  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/domainStatus  
Processing | synchronous  
Response | DomainStatusResult object  
Parameter | Type | Required | Description  
---|---|---|---  
domainNames | list | req | Domain names to check either in _Unicode_ or _ASCII_ format.  
In order to check whether one or more domain names are available for registration, you only need to pass a list of the domain names you want to check as `domainNames` parameter.
The response will contain a list of objects of the following type:
#### DomainStatusResult Object
Property | Type | direction | Description  
---|---|---|---  
domainName | string | out | Name of checked domain in _ACE_ format  
domainNameUnicode | string | out | Name of checked domain in _Unicode_ format  
domainSuffix | string | out | Domain suffix  
status | string | out | Result of check  
transferMethod | string | out | Transfer method if domain is already registered  
The possible domain statuses can be returned to you:
status | Description  
---|---  
alreadyRegistered | You (or a sub account) already registered the domain  
registered | Somebody else registered domain  
nameContainsForbiddenCharacter | Domain name contains invalid characters  
available | Domain is available for registration  
suffixDoesNotExist | Domain suffix does not exist  
suffixCannotBeRegistered | You are not allowed to register a domain with this suffix  
canNotCheck | System is currently unable to check availability  
unknown | Other problems or difficulties occured  
If the `status` is `registered`, the `transferMethod` will further specify how you can start a transfer in:
transferMethod | Description  
---|---  
"" (empty string) | Transfer uses out-of-band authentication. In that case, do not specify `authInfo` in [`domainTransfer`](https://www.hosting.de/api/#starting-transfer-ins) request.  
authInfo | Transfer uses `authInfo`. Supply it in [`domainTransfer`](https://www.hosting.de/api/#starting-transfer-ins) request.  
push | Domain uses push. _First_ start a [`domainTransfer`](https://www.hosting.de/api/#starting-transfer-ins) to pre-authorize domain transfer to your account and _then_ push to our registrar’s tag with the domain’s current supplier.  
## Deleting Domains
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainDelete 
```
{
    "authToken": "$$YOUR API KEY$$",
    "domainName": "somedomain.de"
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <domainName>somedomain.de</domainName>
</request>
```

Request | domainDelete  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/domainDelete  
Processing | asynchronous  
Response | none  
Parameter | Type | Required | Description  
---|---|---|---  
domainName | string | req | Name of the domain to be deleted (_Unicode_ or _ASCII_ format)  
execDate | string | opt | Scheduled deletion date  
In order to delete a domain, you can use the `domainDelete` request. Its simplest form only requires `domainName` as parameter. The domain’s scheduled deletion date is set immediately.
> ### Scheduled delete
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainDelete 
```
{
    "authToken": "$$YOUR API KEY$$",
    "domainName": "somedomain.de",
    "execDate": "2015-01-01T00:00:00Z"
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <domainName>somedomain.de</domainName>
 <execDate>2015-01-01T00:00:00Z</execDate>
</request>
```

If you also specify an `execDate`, it will be scheduled for deletion on `execDate`. This will change the domain object’s `deletionType` to `delete` and set its `deletionDate`.
## Withdrawing Domains
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainWithdraw 
```
{
    "authToken": "$$YOUR API KEY$$",
    "disconnect": false,
    "domainName": "somedomain.de"
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <disconnect>false</disconnect>
 <domainName>somedomain.de</domainName>
</request>
```

Request | domainWithdraw  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/domainWithdraw  
Processing | asynchronous  
Response | none  
Parameter | Type | Required | Description  
---|---|---|---  
domainName | string | req | Name of the domain to be withdrawn (_Unicode_ or _ASCII_ format)  
disconnect | bool | req | Disconnect the domain from name servers after withdrawal  
execDate | string | opt | Scheduled withdrawal date  
In order to withdraw a domain, you can use the request `domainWithdraw`. Its simplest form only requires`domainName` and `disconnect` as parameter. The domain’s withdrawal date is set immediately.
> ### Scheduled withdraw
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainWithdraw 
```
{
    "authToken": "$$YOUR API KEY$$",
    "domainName": "example.de",
    "execDate": "2015-01-01T00:00:00Z"
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <domainName>example.de</domainName>
 <execDate>2015-01-01T00:00:00Z</execDate>
</request>
```

If you also specify an `execDate`, it will be scheduled for withdrawal on `execDate`. This will set the domain object’s `deletionType` to `withdraw` and set its `deletionDate`.
## Canceling Domain Deletion
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainDeletionCancel 
```
{
    "authToken": "$$YOUR API KEY$$",
    "domainName": "example.de"
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <domainName>example.de</domainName>
</request>

```

Parameter | Type | Required | Description  
---|---|---|---  
domainName | string | req | Name of the domain (_Unicode_ or _ASCII_ format)  
In order to cancel a scheduled deletion (or withdrawal) of a doman, you can use the request `domainDeletionCancel`. It’s only parameter specifies the domain for which the pending deletion is to be cancled.
## Starting Transfer-Ins
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainTransfer 
```
{
	"authToken": "$$YOUR API KEY$$",
	"domain": {
		"name": "example.org",
		"transferLockEnabled": true,
        "contacts": [
            {
                "contact": "150101000000021",
                "type": "owner"
            },
            {
                "contact": "150101000000020",
                "type": "admin"
            },
            {
                "contact": "150101000000022",
                "type": "tech"
            },
            {
                "contact": "150101000000023",
                "type": "zone"
            }
        ],
		"nameservers": [
			{
				"name": "ns1.example.net"
			},
			{
				"name": "ns2.example.net"
			},
			{
				"name": "ns3.example.net"
			}
		]
	},
	"transferData": {
		"authInfo": "1234,ABCD+xyz"
	}
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <domain>
  <name>example.org</name>
  <contacts>
   <item>
    <contact>150101000000021</contact>
    <type>owner</type>
   </item>
   <item>
    <contact>150101000000020</contact>
    <type>admin</type>
   </item>
   <item>
    <contact>150101000000022</contact>
    <type>tech</type>
   </item>
   <item>
    <contact>150101000000023</contact>
    <type>zone</type>
   </item>
  </contacts>
  <nameservers>
   <item>
    <name>ns1.example.net</name>
   </item>
   <item>
    <name>ns2.example.net</name>
   </item>
   <item>
    <name>ns3.example.net</name>
   </item>
  </nameservers>
  <transferLockEnabled>true</transferLockEnabled>
 </domain>
 <transferData>
  <authInfo>1234,ABCD+xyz</authInfo>
 </transferData>
</request>
```

Request | domainTransfer  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/domainTransfer  
Processing | asynchronous  
Response | [Domain object](https://www.hosting.de/api/#the-domain-object)  
Parameter | Type | Required | Description  
---|---|---|---  
domain | Domain object | req | Data for transferred domain  
transferData | TransferData object | req | Additional transfer settings  
#### TransferData Object
Property | Type | Required | Description  
---|---|---|---  
authInfo | string | opt | authInfo / Password for domain Transfer  
foaRecipient | string | opt |  `admin`, `owner`, or `both`: Which contacts should receive the FOA mail.  
Transferring domains with the API is a similar process to registering new domains. Please refer to `domainCreate` for further details on the `domain` parameter.
When transferring domains, your request needs a `transferData` object. For most domains you need to fill the `authInfo` field with a transfer password obtained from the registrar currently managing that domain.
You can check whether this field is required by using the response from the `domainStatus` request. If the response’s `transferMethod` is `authInfo`, it is needed.
Before requests for certain domain suffixes are processed, the registrar has to check with the current owner and/or administration contact whether the transfer is authorized. For these domain suffixes you can specify which contact shall receive an email to pre-confirm the transfer.
## Acknowledging Transfer-Out Requests
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainTransferOutAck 
```
{
	"authToken": "$$YOUR API KEY$$",
     "domainName": "example.com"
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <domainName>example.com</domainName>
</request>
```

Request | domainTransferOutAck  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/domainTransferOutAck  
Processing | asynchronous  
Response | [Domain object](https://www.hosting.de/api/#the-domain-object)  
Parameter | Type | Required | Description  
---|---|---|---  
domainName | string | req | Name of domain to acknowledge transfer for (_Unicode_ or _ASCII_ format)  
The outgoing transfers of certain domain suffixes can be aborted by the registrar currently managing the domain. In that case, a poll message will notify you about the requested transfer. Usually, if you do not send a `domainTransferOutNack` or `domainTransferOutAck` in a time period specified by the registry, the transfer out will automatically be approved.
To reject the transfer out, you can simply send a `domainTransferOutNack` request for the domain. Keep in mind that there are registry-specific restrictions which specify the permitted cases.
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainTransferOutNack 
```
{
	"authToken": "$$YOUR API KEY$$",
    "domainName": "example.com"
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <domainName>example.com</domainName>
</request>
```

Request | domainTransferOutNack  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/domainTransferOutNack  
Processing | asynchronous  
Response | [Domain object](https://www.hosting.de/api/#the-domain-object)  
Parameter | Type | Required | Description  
---|---|---|---  
domainName | string | req | Name of the domain to reject transfer for (_Unicode_ or _ASCII_ format)  
If you want the outgoing transfer to proceed, you can explicitly send a `domainTransferOutAck` request to reduce the time until the transfer out is completed.
## Restoring Deleted Domains
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainRestore 
```
{
	"authToken": "$$YOUR API KEY$$",
    "domainName": "example.com"
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <domainName>example.com</domainName>
</request>
```

Request | domainRestore  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/domainRestore  
Processing | asynchronous  
Response | -  
Parameter | Type | Required | Description  
---|---|---|---  
domainName | string | req | Name of the domain you want to restore (_Unicode_ or _ASCII_ format)  
When a domain is in `restorable` state, you can restore it by using the `domainRestore` request.
## Requesting Auth-Info2 (.de)
> ##### POST https://secure.hosting.de/api/domain/v1/jsonxml/domainCreateAuthInfo2 
```
{
	"authToken": "$$YOUR API KEY$$",
    "domainName": "example.com"
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <domainName>example.com</domainName>
</request>
```

Request | domainCreateAuthInfo2  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/domainCreateAuthInfo2  
Processing | asynchronous  
Response |   
Parameter | Type | Required | Description  
---|---|---|---  
domainName | string | req | Name of the domain that the auth-info 2 is requested for (_Unicode_ or _ASCII_ format)  
For `.de` domains there is an additional transfer authorization password. DeNIC will send it via mail to the current domain owner. It can be requested by any registrar. If you want to initiate this process, you need to send a `domainCreateAuthInfo2` request.
You can even send this request for domains that are not in your account.
## Job Object
```
{
    "id": "150223248499677",
    "accountId": "15010100000001",
    "displayName": "example.org",
    "domainNameAce": "example.org",
    "domainNameUnicode": "example.org",
    "handle": "",
    "type": "domainTransferIn",
    "state": "error",
    "subState": "",
    "comments": "",
    "errors": "[{\"code\":30003,\"context\":\"example.org\",\"details\":[],\"text\":\"The provided Authinfo is wrong\"}]",
    "executionDate": "2015-02-23T17:39:23Z",
    "addDate": "2015-01-01T00:00:00Z",
    "lastChangeDate": "2015-01-01T00:00:00Z"
}
```

```
<job>
 <id>150223248499677</id>
 <accountId>1</accountId>
 <displayName>example.org</displayName>
 <domainNameAce>example.org</domainNameAce>
 <domainNameUnicode>example.org</domainNameUnicode>
 <handle></handle>
 <type>domainTransferIn</type>
 <state>error</state>
 <subState></subState>
 <comments></comments>
 <errors>[{"code":30003,"context":"example.org","details":[],"text":"The provided Authinfo is wrong"}]</errors>
 <executionDate>2015-02-23T17:39:23Z</executionDate>
 <addDate>2015-01-01T00:00:00Z</addDate>
 <lastChangeDate>2015-01-01T00:00:00Z</lastChangeDate>
</job>
```

#### Job Object
Property | Type | Required / Direction | Description  
---|---|---|---  
id | string | out-only | Job ID  
accountId | string | out-only | ID of account, the job was executed for (usually owner of the object the job belongs to)  
type | string | out-only | Type of job  
displayName | string | out-only | Either `domainNameUnicode` or `handle`, depending on which is set  
domainNameAce | string | out-only | Domain name in _ACE_ format  
domainNameUnicode | string | out-only | Domain name in _Unicode_ format  
handle | string | out-only | Contact Handle  
state | string | out-only | State of job  
errors | string | out-only | JSON encoded list of errors encountered while executing this job  
warnings | strnig | out-only | JSON encoded list of warnings encountered while executing this job  
clientTransactionId | string | out-only | Client transaction ID used in request  
serverTransactionId | string | out-only | Server transaction ID created for request  
executionDate | datetime | out-only | Date and time job was or will be executed  
addDate | datetime | out-only | Date and time job object was created  
lastChangeDate | datetime | out-only | Date and time job was last modified  
## Listing Jobs
Request | jobsFind  
---|---  
Url |  https://secure.hosting.de/api/domain/v1/jsonxml/jobsFind  
Processing | synchronous  
Response | [FindJobsResult](https://www.hosting.de/api/#filtering-and-sorting)  
In order to list jobs, you use the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the `jobsFind` method. The response will contain a list of [Job objects](https://www.hosting.de/api/#job-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | Account ID associated with job  
JobId | ID of job  
JobType | Job type, e.g. `domainCreate` or `contactUpdate`  
JobDisplayName | May contain handle or domainNameUnicode (cf. [Job object](https://www.hosting.de/api/#job-object))  
JobDomainName | Domain name in _ACE_ format  
JobDomainNameUnicode | Domain name in _Unicode_ format  
JobHandle | Contact handle string  
JobStatus | Status of job  
JobSubStatus | Substatus of job  
JobComments | Comments of job  
JobAddDate | Date and time job was created  
JobLastChangeDate | Date and time job was last modified  
JobExecutionDate | Date and time job was or will be executed  
JobClientTransactionId | Client transaction ID used in request  
JobServerTransactionId | Server transaction ID created for request  
