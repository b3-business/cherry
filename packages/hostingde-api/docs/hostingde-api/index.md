[ NAV ![hosting.de Navigation](https://www.hosting.de/api/slate/images/navbar.png) ](https://www.hosting.de/api/#)
![hosting.de Logo](https://www.hosting.de/api/logos/hostingde.svg)
[JSON](https://www.hosting.de/api/#) [XML](https://www.hosting.de/api/#)
  * Introduction
    * Requests and Authentication
    * Responses
    * Metadata Object
    * HTTP Status Codes
    * Warnings and Errors


  * Filtering and Sorting
    * Filter Object
    * Chain Object
    * SortOptions Object
    * Listing Response


  * Domains
    * The Contact Object
    * Listing Contacts
    * Retrieving Specific Contacts
    * Creating New Contacts
    * Updating Contacts
    * Deleting Contacts
    * The Domain Object
    * Listing Domains
    * Registering New Domains
    * Updating Domains
    * Retrieving Specific Domains
    * Checking Domain Name Availability
    * Deleting Domains
    * Withdrawing Domains
    * Canceling Domain Deletion
    * Starting Transfer-Ins
    * Acknowledging Transfer-Out Requests
    * Restoring Deleted Domains
    * Requesting Auth-Info2 (.de)
    * Job Object
    * Listing Jobs


  * DNS
    * The ZoneConfig Object
    * The Template Values Object
    * The Template Replacements Object
    * The SOA Values Object
    * The Record Object
    * The Zone Object
    * List ZoneConfigs
    * Listing Records
    * Listing Zones
    * Creating New Zones
    * Recreating Existing Zones
    * Updating Zones
    * Updating Records in a Zone
    * Updating a Record Record Set in a Zone
    * Deleting Zones
    * Restoring Zones
    * Purging Zones
    * Changing Content of Records
    * Untying Zones From Their Templates
    * Tying Zones to Templates
    * DNSSEC
    * The DnsSecOptions Object
    * The DnsSecKey Object
    * The DnsSecKeyData Object
    * The DnsSecDsData Object
    * NameserverSet Object
    * List Nameserver Sets
    * Creating NameserverSet
    * Updating NameserverSets
    * Deleting NameserverSets
    * Getting Default NameserverSet
    * The Template Object
    * The Template Replacements Object
    * The Record Template Object
    * Listing Templates
    * Listing Record Templates
    * Creating Templates
    * Recreating Templates
    * Updating Templates
    * Deleting Templates


  * SSL
    * Typical Workflow
    * Available SSL Products
    * The Certificate Order Object
    * The OrderConfirmation Object
    * The Contact Object
    * The Organization Object
    * The CSR Object
    * Decode CSR Result Object
    * The Certificate Details Object
    * The Certificate Object
    * Listing Certificates
    * Getting List of Approver Email Addresses
    * Decoding CSR
    * Checking Auto Validation Capability
    * Ordering SSL Certificates
    * Ordering SMIME Certificates
    * Canceling Orders
    * Getting Certificate Details
    * Getting one Certificate
    * Resending Approver Email
    * Revoking Certificates
    * Reissuing a Certificate


  * Machines
    * The VirtualMachine Object
    * Listing Virtual Machines
    * Creating Virtual Machines
    * Install OS Image on a Virtual Machine
    * Enabling Rescue Mode
    * Disabling Rescue Mode
    * Changing the Virtual Machine Product Code
    * Deleting Virtual Machines
    * Purging Virtual Machines
    * Power Management
    * Power On
    * Power Off
    * Shutdown
    * Reboot
    * Reset


  * Web Hosting
    * The User Object
    * The Webspace Object
    * The WebspaceAccess Object
    * Listing Web Spaces
    * Creating Webspaces
    * Updating Webspaces
    * Deleting Webspaces
    * Listing Users
    * Creating Users
    * Updating Users
    * Deleting Users
    * The CronJob Object
    * The VHost Object
    * Listing VHosts
    * Creating VHosts
    * Updating VHosts
    * Deleting VHosts
    * Restoring VHosts
    * The SSL Settings Object
    * Using your own certificate
    * Activating automatic SSL for a VHost
    * The PHP Configuration Meta Data Object
    * The PHP.ini Object
    * The PHP.ini Value Object
    * Getting a list of PHP Settings
    * Getting a default PHP.ini Object
    * Getting the PHP.ini Object for a specific vhost
    * The PHP Version object
    * Getting available PHP Versions
    * Updating PHP Settings
    * The HTTP User Object
    * The Location Object
    * The HTTP Header Object


  * Database
    * Available Database Products
    * The Database User Object
    * The DatabaseAccess Object
    * The Database Object
    * Listing Users
    * Creating Users
    * Updating Users
    * Deleting Users
    * Listing Databases
    * Creating Databases
    * Updating Databases
    * Deleting Databases


  * Mailboxes
    * ImapMailbox
    * Forwarder
    * SmtpForwarder
    * MailingList
    * Catchall
    * Spam filtering settings
    * AutoResponder settings
    * Updating Mailboxes
    * Listing Mailboxes
    * Deleting Mailboxes
    * Canceling Deletion of Mailboxes
    * Restoring Mailboxes
    * Purging Restorable Mailboxes
    * Checking Mailbox Authorization
    * Domain Settings


  * Managed Application
    * Managed Nextcloud
    * The NextcloudUser Object
    * The NextcloudUserWithPassword Object
    * Listing NextcloudUsers
    * The NextcloudUserDeleteData Object
    * The NextcloudConfiguration Object
    * The NextcloudApp Object
    * The NextcloudAppConfig Object
    * The NextcloudAppConfigInput Object
    * The NextcloudAppForGroups Object
    * The NextcloudGroup Object
    * The NextcloudGroupFolder Object
    * The NextcloudGroupFolderPermission Object
    * The NextcloudGroupWithUsernames Object
    * The Nextcloud Object
    * Listing Managed Nextclouds
    * Creating new Managed Nextclouds
    * Updating Nextclouds
    * Listing Nextcloud Users
    * Modifying Nextcloud Users
    * Listing Nextcloud Groups
    * Updating or deleting Nextcloud Groups
    * Modifying (Create, Update, Delete) Groupfolders
    * Nextcloud Apps
    * Listing Nextcloud Apps
    * Getting Nextcloud App Config


# Introduction
Welcome to the API documentation of hosting.de.
**How to navigate the API documentation:**
The left column functions as an overview of our services. You can use it as an intuitive navigation. Click on a topic and find specific information for that service, object, or method. The middle column provides you with the information you are looking for. The column on the right shows you examples in `JSON` as well as in `XML` format.
**What the API can do for you:**
Our API allows you to manage **your** resources and those of **your subaccounts** in an easy way, using HTTP requests. Various document formats like `JSON` or `XML` are supported. Each resource type is managed in a service (e.g.: domain, DNS, SSL, etc.) with its own endpoint that provides default methods like listings as well as specific methods for the service.
One of the core principles of our platform system is to offer the same access level to every user. For example, the platform ‘web control panel’ uses the `JSON`-API, so everything you do with the panel can also be done using the API. This concept allows you to program and script very complex applications and to tailor them to your needs.
First, the API documentation gives you a general overview of the design and technology that has been implemented, followed by reference information about specific services.
## Requests and Authentication
In order to communicate with the API, you simply have to use the right endpoint and a tool that is able to understand HTTP. Every request has to contain an appropriate Accept and Content-Type header.
The supported HTTP methods are `POST` and `OPTIONS`.
To access a specific service, you have to use the right endpoint. They are built in the following manner:
`https://secure.hosting.de/api/{service}/{api-version}/{format}/{method}`
So, an exemplary URL could look like this:
`https://secure.hosting.de/api/account/v1/json/subaccountCreate`.
This structure is valid for all document formats except for `SOAP`. In that case, the `{method}` parameter is embedded within the request document. This is what an equivalent SOAP request URL looks like:
`https://secure.hosting.de/api/account/v1/soap/`
Our goal is to keep code snippets clean and simple. The majority of developers using SOAP also use a generator for the WSDL file anyway. Please take a look at the `JSON` or `XML` examples, because we will not provide examples for SOAP.
Please note that we support a SOAP version compliant to [WS-I.org](http://ws-i.org) basic profile. We do not support any extensions.
### Authentication
```
{
    "authToken": "$$YOUR API KEY$$"
}

```

```
<request>
    <authToken>$$YOUR API KEY$$</authToken>
</request>

```

Every request you send must contain the `authToken` parameter which has to be set to your API key. You can generate API keys in the web control panel.
Remember that API keys might have their own set of rights. This allows you to give your API key exactly the rights that you need for your application.
### Request Delegation
```
{
    "authToken": "$$YOUR API KEY$$",
    "ownerAccountId": "$$ID OF YOUR SUBACCOUNT$$"
}

```

```
<request>
    <authToken>$$YOUR API KEY$$</authToken>
    <ownerAccountId>$$ID OF YOUR SUBACCOUNT$$</ownerAccountId>
</request>

```

Since subaccount handling is an important feature of the platform system, you can execute every request in the name of your account or any of your subaccounts. To execute a request as a subaccount, you need to add an `ownerAccountId` parameter containing the ID of the desired subaccount.
Thus the access and right validation will be performed as if the subaccount itself made the request. If your subaccount does not have the right or access to perform the operation, the request will fail - even if your main account or you have this right or access.
Note that the request will be logged with your account name.
## Responses
> ##### Sample single object response
```
{
    "response": {
        ...
    },
    "status": "success",
    ...
}

```

```
<response>
    <response>
        ...
    </response>
    <status>success</status>
    ...
</response>

```

Every request will return a response body in the same format as your request. A list of elements will be contained in a `responses` object and a single element will be contained in a `response` object.
> ##### Sample list response
```
{
    "responses": [
        "text list element 1",
        "text list element 2"
    ],
    "status": "success",
    ...
}

```

```
<response>
    <responses>
        <item>text list element 1</item>
        <item>text list element 2</item>
    </responses>
    <status>success</status>
    ...
</response>

```

If you receive a response body, it will contain a `status` element that specifies the result in general. The `status` may have one of the three following values:
Status | Description  
---|---  
success | The request was successful and processed in a synchronous manner. This usually applies to listings or requests which do not need to access a third party interface.  
pending | The request was successful but could not be processed in a synchronous manner. This applies to requests which need to access a third party interface in order to be completed, or to requests which may take a long time to complete. You will be informed of the result of these requests via poll messages.  
error | This status will occur, if there are any problems while processing your request. This could be a data or access violation or an error in a third party interface.  
## Metadata Object
```
{
    "metadata": {
       "clientTransactionId": "$$CLIENT STRING ID$$",
       "serverTransactionId": "$$UNIQUE SERVER TRANSACTION ID$$"
   },
    ...
}

```

```
<response>
    <metadata>
        <clientTransactionId>$$CLIENT STRING ID$$</clientTransactionId>
        <serverTransactionId>$$UNIQUE SERVER TRANSACTION ID$$</serverTransactionId>
    </metadata>
    ...
</response>

```

Every developer faces the problem of matching responses or poll messages to requests. To simplify this process for you as much as possible, we provide a `metadata` object. This object contains a `clientTransactionId` element and a `serverTransactionId` element which will help you to keep track of your communication with the API.
Every request may contain an optional `clientTransactionId` parameter. You can fill this element with any string up to a length of 127 characters. The response and polls associated with your request will contain the same string. The `serverTransactionId` element is filled by the server and will be present in the response. This ID is unique throughout the whole system. It will also be present in every poll message you receive that is associated with that request.
## HTTP Status Codes
While most errors will be communicated via API error codes, some low level issues may cause transport level errors. You should handle the following error codes with an application:
Code | Meaning  
---|---  
200 | OK  
400 | The HTTP request was malformed  
404 | Method, format, or entry point not found  
405 | Method not allowed  
500 | Internal server error  
502 | Server temporarily not available  
503 | Server temporarily not available due to maintenance  
504 | Backend timeout  
## Warnings and Errors
> ##### Request contactCreate
```
{
    "authToken": "$$YOUR API KEY$$",
    "contact": {
        "type": "asd",
        "phone": "+49",
        ...
    }
}

```

```
<request>
    <authToken>$$YOUR API KEY$$</authToken>
    <contact>
        <type>asd</type>
        <phone>+49</phone>
        ...
    </contact>
</request>

```

> ##### Response
```
{
    "status": "error",
    "errors": [
        {
            "code": 32002,
            "contextObject": "",
            "contextPath": "/contact/type",
            "details": [],
            "text": "Handle type is invalid",
            "value": "asd"
        },
        {
            "code": 32022,
            "contextObject": "",
            "contextPath": "/contact/phone",
            "details": [],
            "text": "Format of the phone number is invalid. The E.123 international notation is required",
            "value": "+49"
        }
    ],
    ...
}

```

```
<response>
    <status>error</status>
    <errors>
        <item>
            <code>32002</code>
            <contextObject></contextObject>
            <contextPath>/contact/type</contextPath>
            <details/>
            <text>Handle type is invalid</text>
            <value>asd</value>
        </item>
        <item>
            <code>32022</code>
            <contextObject></contextObject>
            <contextPath>/contact/phone</contextPath>
            <details/>
            <text>Format of the phone number is invalid. The E.123 international notation is required</text>
            <value>+49</value>
        </item>
    </errors>
    ...
</response>

```

If an error occurs, you will receive detailed information. To speed up the development process and to help prevent a trial and error approach, the API collects _all_ errors and warnings related to your request. The response will contain a list of error objects.
Your request may also contain an error that the API will automatically fix. In that case, the response will contain a list of warnings as well. The warnings tell you what was wrong and what the API did to fix the problem (for example a TTL value was too small, so it was raised to the minimum value).
The error object contains a `code` element which masks the specific error code. The code consists of multiple digits: The last four digits specify the occured error. The digits further up front specify the respective service.
The `text` contains a human-readable error description. This text can be used to give feedback to users of your application.
If you modify an existing object, the `contextObject` will be set to its ID. In case of a create request, the field will be empty. In case of a data violation error, the `value` property shows you the content of the member that caused the error.
`details` is a list of key/value objects which provide additional information about the specific error. This might help you with debugging or presenting a more detailed error to your user.
The `contextPath` is a value which points to the element that caused the error. This will help you to easily identify this element in your request document. For `JSON` requests we use JSON-Pointers ([RFC 6901](https://tools.ietf.org/html/rfc6901)), for `XML` and `SOAP` we use XPath ([RFC 5261](https://tools.ietf.org/html/rfc5261)).
# Filtering and Sorting
```
{
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "subFilterConnective": "OR",
        "subFilter": [
            {
                "field": "domainNameAce",
                "value": "$$DOMAIN NAME 1$$"
            },
            {
                "field": "domainNameAce",
                "value": "$$DOMAIN NAME 2$$",
                "relation": "unequal"
            }
        ]
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "domainNameAce",
        "order": "ASC"
    }
}

```

```
<request>
    <authToken>$$YOUR API KEY$$</authToken>
    <filter>
        <subFilterConnective>OR</subFilterConnective>
        <subFilter>
            <item>
                <field>domainNameAce</field>
                <value>$$DOMAIN NAME 1$$</value>
            </item>
            <item>
                <field>domainNameAce</field>
                <value>$$DOMAIN NAME 2$$</value>
                <relation>unequal</relation>
            </item>
        </subFilter>
    </filter>
    <limit>10</limit>
    <page>1</page>
    <sort>
        <field>domainNameAce</field>
        <order>ASC</order>
    </sort>
</request>

```

Each service offers listing methods for the resources it manages. These methods are identical throughout the whole system. Different are the fields you can search in or sort by. The signature of each listing method accepts the following parameters:
Parameter | Type | Required | Description  
---|---|---|---  
filter |  [Filter](https://www.hosting.de/api/#filter-object) or [Chain](https://www.hosting.de/api/#chain-object) | opt | Filter object for the request  
limit | number | opt | Maximal number of records that should be returned (Defaults to 25)  
page | number | opt | Translates to an offset in the record list.  
sort | [SortOptions](https://www.hosting.de/api/#sortoptions-object) | opt | Fields the result is sorted by  
## Filter Object
```
{
    "field": "domainName",
    "value": "example.com"
}

```

```
<filter>
    <field>domainName</field>
    <value>example.com</value>
</filter>

```

Property | Type | Required | Description  
---|---|---|---  
field | string | req | Field name  
value | string | req | Contains the search string  
relation | string | opt | Determines the relation between `field` and `value`. Defaults to ‘equal’  
In its simplest form, the filter parameter takes a `field` and a `value` parameter. The result will match to this condition. The `field` element refers to the field you want to filter. `value` is the argument for that field. By default, the value is a case-insensitive exact match. An asterisk (`*`) can be used to match an arbitrary number of characters (including zero characters).
The `field` element is restricted to a list of field names which vary from listing to listing. You can find lists of available and valid fields throughout the API. Please refer to specific documentation sections for the respective finding methods. Field names are case insensitive.
The `relation` element specifies the comparison performed on `field` and the specific `value`. It is an optional element and defaults to ‘equal’ if not set. Please see the table below for further details and explanations.
### Available relations
Relation | Description  
---|---  
equal |  `field` must match `value` exactly  
unequal |  `field` must not be the same as `value`  
greater |  `field` must be greater than `value`. This might apply to e.g. an integer value, a date or a date time  
less |  `field` must be less than `value`. This might apply to e.g. an integer value, a date or a date time  
greaterEqual |  `field` must be greater than or equal to `value`. This might apply to e.g. an integer value, a date or a date time  
lessEqual |  `field` must be less than or equal to `value`. This might apply to e.g. an integer value, a date or a date time  
```
{
    "subFilterConnective": "OR",
    "subFilter": [
        {"field": "domainName", "value": "*.de"},
        {"field": "domainName", "value": "*.com"}
    ]
}

```

```
<filter>
    <subFilterConnective>OR</subFilterConnective>
    <subFilter>
        <item>
            <field>domainName</field>
            <value>*.de</value>
        </item>
        <item>
            <field>domainName</field>
            <value>*.com</value>
        </item>
    </subFilter>
</filter>

```

Complex queries can be created by chaining condition objects with a chain object. Chain objects can contain further chain objects.
## Chain Object
Property | Type | Required | Description  
---|---|---|---  
subFilter | list<[Filter](https://www.hosting.de/api/#filter-object) or Chain> | req | Contains other filter objects  
subFilterConnective | string | req |  `AND` or `OR`  
If you are using the SOAP API you have to use the `Filter` SOAP type for both `Filter` and `Chain` objects.
## SortOptions Object
Property | Type | Required | Description  
---|---|---|---  
field | string | req | The field to sort by  
order | string | req |  `ASC` for ascending order or `DESC` for descending order  
## Listing Response
The response will contain an object wrapping the results and some meta information for pagination.
```
{
    "data": [
        ...
    ],
    "limit": 10,
    "page": 1,
    "totalEntries": 50,
    "totalPages": 5,
    "type": "FindDomainsResult"
}

```

```
<response>
    <data>
        ...
    </data>
    <limit>10</limit>
    <page>1</page>
    <totalEntries>50</totalEntries>
    <totalPages>5</totalpages>
    <type>FindDomainsResult</type>
</response>

```

Property | Type | Direction | Description  
---|---|---|---  
page | int | out-only | Page number as requested  
limit | int | out-only | Limit as requested  
totalEntries | int | out-only | Total number of results  
totalPages | int | out-only | Total number of result pages  
data | list<…> | out-only | Found objects  
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
# DNS
## The ZoneConfig Object
#### ZoneConfig Object
The ZoneConfig object defines a zone.
Property | Type | Required | Description  
---|---|---|---  
id | string | see description | ID of this zoneConfig. Ignored in zone create requests. Either `id` or `name` is required in all other requests.  
accountId | string | out-only | ID of the account that manages the zone. This property is never used in requests.  
dnsServerGroupId | string | opt | Only used if you use your own servers.  
status | string | out-only | Current status of the Zone  
name | string | see description | The zone name in _ACE_ format. `name` is always required in zone create requests and all other requests if no `id` is provided. While you may use this property for a _Unicode_ zone name, the responses will always contain the _ACE_ encoded zone.  
nameUnicode | string | opt | The zone name in _Unicode_. If it is left empty it will be filled automatically based on `name`.  
masterIp | string | see description | A valid IPv4 or IPv6 must be provided if the type is `SLAVE`. If the type is `NATIVE` or `MASTER` the field must be empty.  
type | string | req | Valid types are `NATIVE`, `MASTER`, and `SLAVE`  
emailAddress | string | opt | The hostmaster email address. Only relevant if the type is `NATIVE` or `MASTER`. If the field is left empty, the default is `hostmaster@name`.  
zoneTransferWhitelist | list<string> | opt | List of IP addresses whitelisted for zone transfers. Only allowed if the type is `MASTER`. Must contain valid IPv4 or IPv6 addresses.  
lastChangeDate | datetime | out-only | Date and time the zone was last modified  
soaValues | [SoaValues] (#the-soa-values-object) | opt | Values for the SOA record of the zone. If it is left empty an SOA record with default values will be created.  
templateValues | [TemplateValues] (#the-template-values-object) | opt | This property can be used if you want to create the zone with a template.  
dnsSecMode | string | opt | See [DNSSEC](https://www.hosting.de/api/#dnssec)  
## The Template Values Object
#### TemplateValues Object
The `template values` object can be used to [create](https://www.hosting.de/api/#creating-new-zones) or [recreate](https://www.hosting.de/api/#recreating-existing-zones) a zone using a [template](https://www.hosting.de/api/#the-template-object).
All [record templates](https://www.hosting.de/api/#the-record-template-object) connected to the template will be converted into [records](https://www.hosting.de/api/#the-record-object) for the zone. These record templates may contain placeholders. A replacement value has to be provided for each placeholder that is used in the template. Otherwise you will receive an error.
The zone may be tied to the used template. A zone that is tied to a template will receive updates automatically.
Cf. [The Template Object](https://www.hosting.de/api/#the-template-object) for more details.
Property | Type | Required | Description  
---|---|---|---  
templateId | string | opt | ID of the template  
templateName | string | out-only | Name of the used template  
tieToTemplate | bool | opt | Tie the zone to the template  
templateReplacements | [TemplateReplacements] (#the-template-replacements-object) | opt | Replacement values for the placeholders  
## The Template Replacements Object
#### TemplateReplacements Object
The `template replacements` object is used for [recreating](https://www.hosting.de/api/#recreating-templates) and [updating](https://www.hosting.de/api/#updating-templates) [templates](https://www.hosting.de/api/#the-template-object).
Whenever a template is changed, all [zones](https://www.hosting.de/api/#the-zone-object) that are tied to the template are changed as well. If, for example, you add a new [record template](https://www.hosting.de/api/#the-record-template-object) that contains a placeholder that has not been used in the template before, the zones tied to the template might not have a replacement value for the placeholder.
In that case the replacement value provided with the Template Replacements Object will be used as a default.
Property | Type | Required | Description  
---|---|---|---  
ipv4Replacement | string | opt |   
ipv6Replacement | string | opt |   
mailIpv4Replacement | string | opt |   
mailIpv6Replacement | string | opt |   
## The SOA Values Object
#### SoaValues Object
The `SOA values` object contains the time (seconds) used in a zone’s SOA record. The maximum number of seconds is `31556926` which equals one year. Exceeding the maximum and uncercutting the minimum values will cause the request to be aborted and create an error.
Property | Type | Required | Description  
---|---|---|---  
refresh | int | req | Refresh for the SOA record. Default: `86400`, minimum: `3600`.  
retry | int | req | Retry for the SOA record. Default: `7200`, minimum: `600`.  
expire | int | req | Expire for the SOA record. Default: `3600000`, minimum: `86400`.  
ttl | int | req | TTL for the SOA record. Default: `172800`, minimum: `60`.  
negativeTtl | int | req | Negative TTL for the SOA record. Default: `3600`, minimum: `60`.  
## The Record Object
#### DnsRecord Object
The `DNS Record` object is part of a zone. It is used to manage DNS resource records.
Property | Type | Required | Description  
---|---|---|---  
id | string | see description | Record ID. Ignored in create zone requests. Either `id` or `zoneId`, `name`, `type`, and `content` are required in all other requests.  
zoneId | string | out-only | ID of zone that the record belongs to.  
recordTemplateId | string | opt | ID of record template the record is tied to. If empty, record has to be managed manually. If tied to record template, record will be removed or updated whenever record template is removed or updated.  
name | string | see description | Name of the record. Example: `mail.example.com`. Always required in create requests and in all other requests if no `id` is provided.  
type | string | see description | Type of the record. Valid types are `A`, `AAAA`, `ALIAS`, `CAA`, `CERT`, `CNAME`, `DNSKEY`, `DS`, `MX`, `NS`, `NSEC`, `NSEC3`, `NSEC3PARAM`, `NULLMX`, `OPENPGPKEY`, `PTR`, `RRSIG`, `SRV`, `SSHFP`, `TLSA`, and `TXT`. Always required in create requests and in all other requests if no `id` is provided.  
content | string | see description | Content of the record. Always required in create requests and in all other requests if no `id` is provided.  
ttl | int | opt | TTL of the record in seconds. Minimum value: `60`. Maximum value: `31556926` (one year). Exceeding the maximum or undercutting the minimum value will abort the request and result in an error.  
priority | int | opt | Priority of record. Only relevant if type is `MX` or `SRV`. Must be 0 or greater for those types.  
lastChangeDate | datetime | out-only | Date and time of last record modification  
## The Zone Object
#### Zone Object
A Zone consists of a [Zone Configuration](https://www.hosting.de/api/#the-zoneconfig-object) and a list of [DNS records](https://www.hosting.de/api/#the-record-object) and represents the DNS zone.
A Zone object is the result of a [zonesFind](https://www.hosting.de/api/#listing-zones) request.
Property | Type | Required | Description  
---|---|---|---  
zoneConfig | ZoneConfig | out-only |   
records | list<DnsRecord> | out-only |   
## List ZoneConfigs
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/zoneConfigsFind 
```
{
    ...
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "ZoneNameUnicode",
        "value": "*example.com*"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "ZoneNameUnicode",
        "order": "asc"
    }
}
```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <filter>
  <item>
   <field>ZoneNameUnicode</field>
   <value>*example.com*</value>
  </item>
 </filter>
 <limit>10</limit>
 <page>1</page>
 <sort>
  <field>ZoneNameUnicode</field>
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
            // zoneConfig objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 15,
        "totalPages": 2,
        "type": "FindZoneConfigsResult"
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
  <type>FindZoneConfigsResult</type>
 </response>
 ...
</response>
```

Request | zoneConfigsFind  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/zoneConfigsFind  
Processing | synchronous  
Response | [FindZoneConfigsResult](https://www.hosting.de/api/#filtering-and-sorting)  
Listing zoneConfigs uses the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `zoneConfigsFind`. The response will contain a list of [ZoneConfig objects](https://www.hosting.de/api/#the-zoneconfig-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | ID of the account that the zone belongs to  
ZoneConfigId | ZoneConfig object ID  
ZoneName | Zone name in _ACE_ format  
ZoneNameUnicode | Zone name in _Unicode_ format  
ZoneMasterIp | Master IP address of the zone  
ZoneType | Zone type (“MASTER”, “NATIVE”, or “SLAVE”)  
ZoneEmailAddress | Email address of hostmaster  
ZoneLastChangeDate | Date and time of last zone update  
ZoneSoaRefresh | SOA refresh interval of slaves (seconds)  
ZoneSoaRetry | SOA retry interval of slaves (seconds)  
ZoneSoaExpire | SOA deactivation timeout of slaves (seconds)  
ZoneSoaTtl | SOA time to live for negative caching (seconds)  
ZoneIpv4Replacement | Replacement value for ##IPv4## placeholder in template  
ZoneIpv6Replacement | Replacement value for ##IPv6## placeholder in template  
ZoneMailIpv4Replacement | Replacement value for ##IPv4## mail addresses in template  
ZoneMailIpv6Replacement | Replacement value for ##IPv6## mail addresses in template  
TemplateName | Name of template associated with zone  
TemplateId | ID of template associated with zone  
## Listing Records
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/recordsFind 
```
{
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "zoneConfigId",
        "value": "15010100000010"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "recordName",
        "order": "asc"
    }
}
```

```
<request>
 ...
 <authToken>$$YOUR API KEY$$</authToken>
 <filter>
   <field>zoneConfigId</field>
   <value>15010100000010</value>
 </filter>
 <limit>10</limit>
 <page>1</page>
 <sort>
  <field>recordName</field>
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
            // record objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 15,
        "totalPages": 2,
        "type": "FindRecordsResult"
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
  <type>FindRecordsResult</type>
 </response>
 ...
</response>
```

Request | recordsFind  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/recordsFind  
Processing | synchronous  
Response | [FindRecordsResult](https://www.hosting.de/api/#filtering-and-sorting)  
Listing DNS records uses the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `recordsFind`. The response will contain a list of [record objects](https://www.hosting.de/api/#the-record-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
ZoneConfigId | ID of the zoneConfig object to which the record belongs  
RecordId | Record object ID  
RecordName | Name of the record  
RecordType | Type of the record  
RecordContent | Content of the record  
RecordTtl | Time to live (in seconds)  
RecordPriority | Priority of the record (integer)  
RecordLastChangeDate | Date and time of last modification  
## Listing Zones
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/zonesFind 
```
{
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "accountId",
        "value": "150101000000001"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "zoneName",
        "order": "asc"
    }
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <filter>
    <field>accountId</field>
    <value>150101000000001</value>
  </filter>
  <limit>10</limit>
  <page>1</page>
  <sort>
    <field>zoneName</field>
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
            // zone objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 15,
        "totalPages": 2,
        "type": "FindZonesResult"
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
  <type>FindZonesResult</type>
 </response>
 ...
</response>
```

Request | zonesFind  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/zonesFind  
Processing | synchronous  
Response | [FindZonesResult](https://www.hosting.de/api/#filtering-and-sorting)  
Listing zones uses the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `zonesFind`. The response will contain a list of [Zone Objects](https://www.hosting.de/api/#zone-object) that consist of a `zoneConfig` and all its records.
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | ID of the account to which the zone belongs  
ZoneConfigId | ID of the zoneConfig object  
ZoneName | Zone name in _ACE_ format  
ZoneNameUnicode | Zone name in _Unicode_ format  
ZoneMasterIp | Master IP address of the zone  
ZoneType | Zone type (“MASTER”, “NATIVE”, or “SLAVE”)  
ZoneEmailAddress | Email address of the zone  
ZoneLastChangeDate | Time and date of last modification  
ZoneSoaRefresh | SOA refresh interval of slaves (seconds)  
ZoneSoaRetry | SOA retry interval of slaves (seconds)  
ZoneSoaExpire | SOA deactivation timeout of slaves (seconds)  
ZoneSoaTtl | SOA time to live for negative caching (seconds)  
ZoneIpv4Replacement | Replacement value for IPv4 addresses in template  
ZoneIpv6Replacement | Replacement value for IPv6 addresses in template  
ZoneMailIpv4Replacement | Replacement value for IPv4 mail addresses in template  
ZoneMailIpv6Replacement | Replacement value for IPv6 mail addresses in template  
TemplateName | Name of template associated with zone  
TemplateId | ID of template associated with zone  
RecordId | ID of record in zone  
RecordName | Name of record in zone  
RecordType | Type of record in zone  
RecordContent | Content of record in zone  
RecordTtl | Time to live (in seconds)  
RecordPriority | Priority of record in zone (integer)  
RecordLastChangedate | Date and time of last modification in zone  
## Creating New Zones
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/zoneCreate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "nameserverSetId": "15010100000020",
    "useDefaultNameserverSet": false,
    "zoneConfig": {
            "name": "example.com",
            "type": "NATIVE",
            "emailAddress": "admin@example.com"
    },
    "records": [
        {
            "name": "www.example.com",
            "type": "A",
            "content": "172.27.171.106",
            "ttl": 86000
        },
        {
            "name": "example.com",
            "type": "MX",
            "content": "smtp.example.com",
            "ttl": 86000,
            "priority": 0
        }
    ]
}

```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <nameserverSetId>15010100000020</nameserverSetId>
  <records>
    <item>
      <content>172.27.171.106</content>
      <name>www.example.com</name>
      <ttl>86000</ttl>
      <type>A</type>
    </item>
    <item>
      <content>smtp.example.com</content>
      <name>example.com</name>
      <priority>0</priority>
      <ttl>86000</ttl>
      <type>MX</type>
    </item>
  </records>
  <useDefaultNameserverSet>false</useDefaultNameserverSet>
  <zoneConfig>
    <emailAddress>admin@example.com</emailAddress>
    <name>example.com</name>
    <type>NATIVE</type>
  </zoneConfig>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "records": [
            {
                "content": "172.27.171.106",
                "id": "15010100000020",
                "lastChangeDate": "2015-09-02",
                "name": "www.example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 86000,
                "type": "A",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "smtp.example.com",
                "id": "15010100000021",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": 0,
                "recordTemplateId": null,
                "ttl": 86000,
                "type": "MX",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "ns2.example.com",
                "id": "15010100000022",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 172800,
                "type": "NS",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "ns1.example.com",
                "id": "15010100000023",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 172800,
                "type": "NS",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "ns1.example.com. admin.example.com. 2015090201 86400 7200 3600000 172800",
                "id": "15010100000024",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 172800,
                "type": "SOA",
                "zoneConfigId": "15010100000010"
            }
        ],
        "zoneConfig": {
            "accountId": "15010100000001",
            "emailAddress": "admin@example.com",
            "id": "15010100000010",
            "lastChangeDate": "2015-09-02T09:42:08Z",
            "masterIp": "",
            "name": "example.com",
            "nameUnicode": "example.com",
            "soaValues": {
                "expire": 3600000,
                "negativeTtl": 3600,
                "refresh": 86400,
                "retry": 7200,
                "serial": null,
                "ttl": 172800
            },
            "status": "blocked",
            "templateValues": null,
            "type": "NATIVE",
            "zoneTransferWhitelist": [
            ]
        }
    },
    ...
}

```

```
<response>
  ...
  <response>
    <records>
      <item>
        <content>172.27.171.106</content>
        <id>15010100000020</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>www.example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>86000</ttl>
        <type>A</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>smtp.example.com</content>
        <id>15010100000021</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority>0</priority>
        <recordTemplateId null="true" />
        <ttl>86000</ttl>
        <type>MX</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>ns2.example.com</content>
        <id>15010100000022</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>172800</ttl>
        <type>NS</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>ns1.example.com</content>
        <id>15010100000023</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>172800</ttl>
        <type>NS</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>ns1.example.com. admin.example.com. 2015090201 86400 7200 3600000 172800</content>
        <id>15010100000024</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>172800</ttl>
        <type>SOA</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
    </records>
    <zoneConfig>
      <accountId>15010100000001</accountId>
      <emailAddress>admin@example.com</emailAddress>
      <id>15010100000010</id>
      <lastChangeDate>2015-09-02T09:42:08Z</lastChangeDate>
      <masterIp />
      <name>example.com</name>
      <nameUnicode>example.com</nameUnicode>
      <soaValues>
        <expire>3600000</expire>
        <negativeTtl>3600</negativeTtl>
        <refresh>86400</refresh>
        <retry>7200</retry>
        <serial null="true" />
        <ttl>172800</ttl>
      </soaValues>
      <status>blocked</status>
      <templateValues null="true" />
      <type>NATIVE</type>
      <zoneTransferWhitelist />
    </zoneConfig>
  </response>
  ...
</response>

```

Request | zoneCreate  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/zoneCreate  
Processing | asynchronous  
Response | [Zone](https://www.hosting.de/api/#zone-object)  
Parameter | Type | Required | Description  
---|---|---|---  
zoneConfig | ZoneConfig | req | zoneConfig of the zone  
records | list<Record> | req | Records of the zone  
nameserverSetId | string | opt |  `NameserverSet` to use for automatic creation of NS records. Default: 0  
useDefaultNameserverSet | bool | opt | Use your account’s default nameserver set. Default: false  
dnsSecOptions | DnsSecOptions | opt |  [`DnsSecOptions`](https://www.hosting.de/api/#the-dnssecoptions-object) to be used. Default is `null`.  
To create a zone, you need at least a zoneConfig.
A zone may be created manually or from a template. If you want to use a template, you have to at least provide a template ID in the `zoneConfig`’s [template values](https://www.hosting.de/api/#the-template-values-object) property. See [template object](https://www.hosting.de/api/#the-template-object) for more details.
Read the [DNSSEC Section](https://www.hosting.de/api/#dnssec) for more information abound DNSSEC.
See [`NameserverSet` object](https://www.hosting.de/api/#nameserverset-object) for more details on using nameserver sets.
## Recreating Existing Zones
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/zoneRecreate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "nameserverSetId": "15010100000020",
    "useDefaultNamserverSet": false,
    "zoneConfig": {
        "accountId": "15010100000001",
        "emailAddress": "admin@example.com",
        "id": "15010100000010",
        "lastChangeDate": "2015-09-02T10:14:02Z",
        "masterIp": "",
        "name": "example.com",
        "nameUnicode": "example.com",
        "soaValues": {
            "expire": 3600000,
            "negativeTtl": 3600,
            "refresh": 86400,
            "retry": 7200,
            "serial": null,
            "ttl": 172800
        },
        "status": "active",
        "templateValues": null,
        "type": "NATIVE",
        "zoneTransferWhitelist": [
        ]
    },
    "records": [
        {
            "name": "www.example.com",
            "type": "A",
            "content": "172.27.171.106",
            "ttl": 86000
        },
        {
            "name": "example.com",
            "type": "MX",
            "content": "smtp.example.com",
            "ttl": 86000,
            "priority": 0
        }
    ]
}

```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <nameserverSetId>15010100000020</nameserverSetId>
  <records>
    <item>
      <content>172.27.171.106</content>
      <name>www.example.com</name>
      <ttl>86000</ttl>
      <type>A</type>
    </item>
    <item>
      <content>smtp.example.com</content>
      <name>example.com</name>
      <priority>0</priority>
      <ttl>86000</ttl>
      <type>MX</type>
    </item>
  </records>
  <useDefaultNamserverSet>false</useDefaultNamserverSet>
  <zoneConfig>
    <accountId>15010100000001</accountId>
    <emailAddress>admin@example.com</emailAddress>
    <id>15010100000010</id>
    <lastChangeDate>2015-09-02T10:14:02Z</lastChangeDate>
    <masterIp />
    <name>example.com</name>
    <nameUnicode>example.com</nameUnicode>
    <soaValues>
      <expire>3600000</expire>
      <negativeTtl>3600</negativeTtl>
      <refresh>86400</refresh>
      <retry>7200</retry>
      <serial null="true" />
      <ttl>172800</ttl>
    </soaValues>
    <status>active</status>
    <templateValues null="true" />
    <type>NATIVE</type>
    <zoneTransferWhitelist />
  </zoneConfig>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "records": [
            {
                "content": "ns1.example.com. admin.example.com. 2015090202 86400 7200 3600000 172800",
                "id": "15010100000020",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 172800,
                "type": "SOA",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "ns1.example.com",
                "id": "15010100000021",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 172800,
                "type": "NS",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "ns2.example.com",
                "id": "15010100000022",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 172800,
                "type": "NS",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "smtp.example.com",
                "id": "15010100000023",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": 0,
                "recordTemplateId": null,
                "ttl": 86000,
                "type": "MX",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "172.27.171.106",
                "id": "15010100000024",
                "lastChangeDate": "2015-09-02",
                "name": "www.example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 86000,
                "type": "A",
                "zoneConfigId": "15010100000010"
            }
        ],
        "zoneConfig": {
            "accountId": "15010100000001",
            "emailAddress": "admin@example.com",
            "id": "15010100000010",
            "lastChangeDate": "2015-09-02T09:50:48Z",
            "masterIp": "",
            "name": "example.com",
            "nameUnicode": "example.com",
            "soaValues": {
                "expire": 3600000,
                "negativeTtl": 3600,
                "refresh": 86400,
                "retry": 7200,
                "serial": null,
                "ttl": 172800
            },
            "status": "blocked",
            "templateValues": null,
            "type": "NATIVE",
            "zoneTransferWhitelist": [
            ]
        }
    },
    ...
}

```

```
<response>
  ...
  <response>
    <records>
      <item>
        <content>ns1.example.com. admin.example.com. 2015090202 86400 7200 3600000 172800</content>
        <id>15010100000020</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>172800</ttl>
        <type>SOA</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>ns1.example.com</content>
        <id>15010100000021</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>172800</ttl>
        <type>NS</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>ns2.example.com</content>
        <id>15010100000022</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>172800</ttl>
        <type>NS</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>smtp.example.com</content>
        <id>15010100000023</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority>0</priority>
        <recordTemplateId null="true" />
        <ttl>86000</ttl>
        <type>MX</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>172.27.171.106</content>
        <id>15010100000024</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>www.example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>86000</ttl>
        <type>A</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
    </records>
    <zoneConfig>
      <accountId>15010100000001</accountId>
      <emailAddress>admin@example.com</emailAddress>
      <id>15010100000010</id>
      <lastChangeDate>2015-09-02T09:50:48Z</lastChangeDate>
      <masterIp />
      <name>example.com</name>
      <nameUnicode>example.com</nameUnicode>
      <soaValues>
        <expire>3600000</expire>
        <negativeTtl>3600</negativeTtl>
        <refresh>86400</refresh>
        <retry>7200</retry>
        <serial null="true" />
        <ttl>172800</ttl>
      </soaValues>
      <status>blocked</status>
      <templateValues null="true" />
      <type>NATIVE</type>
      <zoneTransferWhitelist />
    </zoneConfig>
  </response>
  ...
</response>

```

Request | zoneRecreate  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/zoneRecreate  
Processing | asynchronous  
Response | [Zone](https://www.hosting.de/api/#zone-object)  
Parameter | Type | Required | Description  
---|---|---|---  
zoneConfig | zoneConfig object | req | ZoneConfig of the zone you want to recreate  
records | list<Record> | req | New records of the zone  
nameserverSetId | string | opt |  `NameserverSet` to use for automatic creation of NS records. Default: 0  
useDefaultNameserverSet | bool | opt | Use your accounts default nameserver set. Default: false  
dnsSecOptions | DnsSecOptions | opt |  [`DnsSecOptions`](https://www.hosting.de/api/#the-dnssecoptions-object) to be used. Default is `null`.  
Recreating an existing zone will cause it (ie. the `zoneConfig` and all records) to be deleted and then created anew with the values and records provided with the request. That means, the `zoneConfig` has to exist. Calling zoneRecreate with a `zoneConfig` that does not exist will result in an error.
As in [creating a zone](https://www.hosting.de/api/#creating-new-zones), a template may be used. Cf. [template object](https://www.hosting.de/api/#the-template-object) for more details.
Read the [DNSSEC Section](https://www.hosting.de/api/#dnssec) for more information abound DNSSEC.
See [`NameserverSet` object](https://www.hosting.de/api/#nameserverset-object) for more details on using `NameserverSets`.
## Updating Zones
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/zoneUpdate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "zoneConfig": {
        "accountId": "15010100000001",
        "emailAddress": "admin@example.com",
        "id": "15010100000010",
        "lastChangeDate": "2015-09-02T10:14:02Z",
        "masterIp": "",
        "name": "example.com",
        "nameUnicode": "example.com",
        "soaValues": {
            "expire": 3600000,
            "negativeTtl": 3600,
            "refresh": 86400,
            "retry": 7200,
            "serial": null,
            "ttl": 172800
        },
        "status": "active",
        "templateValues": null,
        "type": "NATIVE",
        "zoneTransferWhitelist": [
        ]
    },
    "recordsToAdd": [
        {
            "name": "www.example.com",
            "type": "AAAA",
            "content": "2001:db8::1",
            "ttl": 86000
        },
        {
            "name": "example.com",
            "type": "MX",
            "content": "newmailserver.example.com",
            "ttl": 86000,
            "priority": 0
        }
    ],
    "recordsToModify": [
        {
            "id":"15010100000010",
            "name": "sub.example.com",
            "type": "AAAA",
            "content": "2001:db8::1",
            "ttl": 86000
        }
    ],
    "recordsToDelete": [
        {
            "name": "example.com",
            "type": "MX",
            "content": "smtp.example.com"
        }
    ]
}

```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <recordsToAdd>
    <item>
      <content>2001:db8::1</content>
      <name>www.example.com</name>
      <ttl>86000</ttl>
      <type>AAAA</type>
    </item>
    <item>
      <content>newmailserver.example.com</content>
      <name>example.com</name>
      <ttl>86000</ttl>
      <type>MX</type>
    </item>
  </recordsToAdd>
  <recordsToModify>
    <item>
      <id>15010100000010</id>
      <content>2001:db8::1</content>
      <name>sub.example.com</name>
      <ttl>86000</ttl>
      <type>AAAA</type>
    </item>
  </recordsToModify>
  <recordsToDelete>
    <item>
      <content>smtp.example.com</content>
      <name>example.com</name>
      <priority>0</priority>
      <type>MX</type>
    </item>
  </recordsToDelete>
  <zoneConfig>
    <accountId>15010100000001</accountId>
    <emailAddress>admin@example.com</emailAddress>
    <id>15010100000010</id>
    <lastChangeDate>2015-09-02T10:14:02Z</lastChangeDate>
    <masterIp />
    <name>example.com</name>
    <nameUnicode>example.com</nameUnicode>
    <soaValues>
      <expire>3600000</expire>
      <negativeTtl>3600</negativeTtl>
      <refresh>86400</refresh>
      <retry>7200</retry>
      <serial null="true" />
      <ttl>172800</ttl>
    </soaValues>
    <status>active</status>
    <templateValues null="true" />
    <type>NATIVE</type>
    <zoneTransferWhitelist />
  </zoneConfig>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "records": [
            {
                "content": "ns1.example.com",
                "id": "15010100000020",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 172800,
                "type": "NS",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "ns1.example.com. admin.example.com. 2015090203 86400 7200 3600000 172800",
                "id": "150902246197317",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 172800,
                "type": "SOA",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "ns2.example.com",
                "id": "15010100000021",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 172800,
                "type": "NS",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "2001:db8::1",
                "id": "15010100000022",
                "lastChangeDate": "2015-09-02",
                "name": "www.example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 86000,
                "type": "AAAA",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "newmailserver.example.com",
                "id": "15010100000023",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": 0,
                "recordTemplateId": null,
                "ttl": 86000,
                "type": "MX",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "2001:db8::1",
                "id": "15010100000024",
                "lastChangeDate": "2015-09-02",
                "name": "sub.example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 86000,
                "type": "AAAA",
                "zoneConfigId": "15010100000010"
            }
        ],
        "zoneConfig": {
            "accountId": "15010100000001",
            "emailAddress": "admin@example.com",
            "id": "15010100000010",
            "lastChangeDate": "2015-09-02T10:14:02Z",
            "masterIp": "",
            "name": "example.com",
            "nameUnicode": "example.com",
            "soaValues": {
                "expire": 3600000,
                "negativeTtl": 3600,
                "refresh": 86400,
                "retry": 7200,
                "serial": null,
                "ttl": 172800
            },
            "status": "blocked",
            "templateValues": null,
            "type": "NATIVE",
            "zoneTransferWhitelist": [
            ]
        }
    },
    ...
}

```

```
<response>
 ...
  <response>
    <records>
      <item>
        <content>ns1.example.com</content>
        <id>15010100000020</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>172800</ttl>
        <type>NS</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>ns1.example.com. admin.example.com. 2015090203 86400 7200 3600000 172800</content>
        <id>150902246197317</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>172800</ttl>
        <type>SOA</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>ns2.example.com</content>
        <id>15010100000021</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>172800</ttl>
        <type>NS</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>2001:db8::1</content>
        <id>15010100000022</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>www.example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>86000</ttl>
        <type>AAAA</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>newmailserver.example.com</content>
        <id>15010100000023</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority>0</priority>
        <recordTemplateId null="true" />
        <ttl>86000</ttl>
        <type>MX</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>2001:db8::1</content>
        <id>15010100000024</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>sub.example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>86000</ttl>
        <type>AAAA</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
    </records>
    <zoneConfig>
      <accountId>15010100000001</accountId>
      <emailAddress>admin@example.com</emailAddress>
      <id>15010100000010</id>
      <lastChangeDate>2015-09-02T10:14:02Z</lastChangeDate>
      <masterIp />
      <name>example.com</name>
      <nameUnicode>example.com</nameUnicode>
      <soaValues>
        <expire>3600000</expire>
        <negativeTtl>3600</negativeTtl>
        <refresh>86400</refresh>
        <retry>7200</retry>
        <serial null="true" />
        <ttl>172800</ttl>
      </soaValues>
      <status>blocked</status>
      <templateValues null="true" />
      <type>NATIVE</type>
      <zoneTransferWhitelist />
    </zoneConfig>
  </response>
  ...
</response>

```

Request | zoneUpdate  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/zoneUpdate  
Processing | asynchronous  
Response | [Zone](https://www.hosting.de/api/#zone-object)  
Parameter | Type | Required | Description  
---|---|---|---  
zoneConfig | zoneConfig object | req | zoneConfig to be updated  
recordsToAdd | list<Record> | req | Records to be added  
recordsToModify | list<Record> | req | Records to be modified  
recordsToDelete | list<Record> | req | Records to be deleted  
dnsSecOptions | DnsSecOptions | opt |  [`DnsSecOptions`](https://www.hosting.de/api/#the-dnssecoptions-object) to be used. Default is `null`.  
You can use `zoneUpdate` to make adjustments to the zone’s `zoneConfig`, to remove records, to add new records or to modify existing records. All records in `recordsToAdd` will be added to the zone, while all records in `recordsToDelete` will be deleted. All records in `recordsToModify` will be modified. If you insert a record that does not exist into `recordsToDelete` or `recordsToModify`, an error will occur.
Existing records that are not contained in either list will not be changed.
Read the [DNSSEC Section](https://www.hosting.de/api/#dnssec) for more information abound DNSSEC.
## Updating Records in a Zone
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/recordsUpdate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "zoneName": "example.com",
    "recordsToAdd": [
        {
            "name": "www.example.com",
            "type": "AAAA",
            "content": "2001:db8::1",
            "ttl": 86000
        },
        {
            "name": "example.com",
            "type": "MX",
            "content": "newmailserver.example.com",
            "ttl": 86000,
            "priority": 0
        }
    ],
    "recordsToModify": [
        {
            "id":"15010100000010",
            "name": "sub.example.com",
            "type": "AAAA",
            "content": "2001:db8::1",
            "ttl": 86000
        }
    ],
    "recordsToDelete": [
        {
            "name": "example.com",
            "type": "MX",
            "content": "smtp.example.com"
        }
    ]
}

```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <recordsToAdd>
    <item>
      <content>2001:db8::1</content>
      <name>www.example.com</name>
      <ttl>86000</ttl>
      <type>AAAA</type>
    </item>
    <item>
      <content>newmailserver.example.com</content>
      <name>example.com</name>
      <priority>0</priority>
      <ttl>86000</ttl>
      <type>MX</type>
    </item>
  </recordsToAdd>
  <recordsToModify>
    <item>
      <id>15010100000010</id>
      <content>2001:db8::1</content>
      <name>sub.example.com</name>
      <ttl>86000</ttl>
      <type>AAAA</type>
    </item>
  </recordsToModify>
  <recordsToDelete>
    <item>
      <content>smtp.example.com</content>
      <name>example.com</name>
      <type>MX</type>
    </item>
  </recordsToDelete>
  <zoneName>example.com</zoneName>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "records": [
            {
                "content": "ns1.example.com",
                "id": "15010100000020",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 172800,
                "type": "NS",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "ns1.example.com. admin.example.com. 2015090203 86400 7200 3600000 172800",
                "id": "150902246197317",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 172800,
                "type": "SOA",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "ns2.example.com",
                "id": "15010100000021",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 172800,
                "type": "NS",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "2001:db8::1",
                "id": "15010100000022",
                "lastChangeDate": "2015-09-02",
                "name": "www.example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 86000,
                "type": "AAAA",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "newmailserver.example.com",
                "id": "15010100000023",
                "lastChangeDate": "2015-09-02",
                "name": "example.com",
                "priority": 0,
                "recordTemplateId": null,
                "ttl": 86000,
                "type": "MX",
                "zoneConfigId": "15010100000010"
            },
            {
                "content": "2001:db8::1",
                "id": "15010100000024",
                "lastChangeDate": "2015-09-02",
                "name": "sub.example.com",
                "priority": null,
                "recordTemplateId": null,
                "ttl": 86000,
                "type": "AAAA",
                "zoneConfigId": "15010100000010"
            }
        ],
        "zoneConfig": {
            "accountId": "15010100000001",
            "emailAddress": "admin@example.com",
            "id": "15010100000010",
            "lastChangeDate": "2015-09-02T10:14:02Z",
            "masterIp": "",
            "name": "example.com",
            "nameUnicode": "example.com",
            "soaValues": {
                "expire": 3600000,
                "negativeTtl": 3600,
                "refresh": 86400,
                "retry": 7200,
                "serial": null,
                "ttl": 172800
            },
            "status": "blocked",
            "templateValues": null,
            "type": "NATIVE",
            "zoneTransferWhitelist": [
            ]
        }
    },
    ...
}

```

```
<response>
 ...
  <response>
    <records>
      <item>
        <content>ns1.example.com</content>
        <id>15010100000020</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>172800</ttl>
        <type>NS</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>ns1.example.com. admin.example.com. 2015090203 86400 7200 3600000 172800</content>
        <id>150902246197317</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>172800</ttl>
        <type>SOA</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>ns2.example.com</content>
        <id>15010100000021</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>172800</ttl>
        <type>NS</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>2001:db8::1</content>
        <id>15010100000022</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>www.example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>86000</ttl>
        <type>AAAA</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>newmailserver.example.com</content>
        <id>15010100000023</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>example.com</name>
        <priority>0</priority>
        <recordTemplateId null="true" />
        <ttl>86000</ttl>
        <type>MX</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
      <item>
        <content>2001:db8::1</content>
        <id>15010100000024</id>
        <lastChangeDate>2015-09-02</lastChangeDate>
        <name>sub.example.com</name>
        <priority null="true" />
        <recordTemplateId null="true" />
        <ttl>86000</ttl>
        <type>AAAA</type>
        <zoneConfigId>15010100000010</zoneConfigId>
      </item>
    </records>
    <zoneConfig>
      <accountId>15010100000001</accountId>
      <emailAddress>admin@example.com</emailAddress>
      <id>15010100000010</id>
      <lastChangeDate>2015-09-02T10:14:02Z</lastChangeDate>
      <masterIp />
      <name>example.com</name>
      <nameUnicode>example.com</nameUnicode>
      <soaValues>
        <expire>3600000</expire>
        <negativeTtl>3600</negativeTtl>
        <refresh>86400</refresh>
        <retry>7200</retry>
        <serial null="true" />
        <ttl>172800</ttl>
      </soaValues>
      <status>blocked</status>
      <templateValues null="true" />
      <type>NATIVE</type>
      <zoneTransferWhitelist />
    </zoneConfig>
  </response>
  ...
</response>

```

Request | recordsUpdate  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/recordsUpdate  
Processing | asynchronous  
Response | [Zone](https://www.hosting.de/api/#zone-object)  
Parameter | Type | Required | Description  
---|---|---|---  
zoneConfigId | string | opt | zoneConfig to be updated  
zoneName | string | opt | zoneConfig to be updated  
recordsToAdd | list<Record> | req | Records to be added  
recordsToModify | list<Record> | req | Records to be modified  
recordsToDelete | list<Record> | req | Records to be deleted  
You can use `recordsUpdate` to remove records, to add new records or to modify existing records. All records in `recordsToAdd` will be added to the zone, while all records in `recordsToDelete` will be deleted. All records in `recordsToModify` will be modified. If you insert a record that does not exist into `recordsToDelete` or `recordsToModify`, an error will occur.
Existing records that are not contained in either list will not be changed.
Either the ID or the name has to be provided. If both are set, the ID will be used to identify the zone.
## Updating a Record Record Set in a Zone
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/resourceRecordSetUpdate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "hostname": "www.example.com",
    "recordType": "A",
    "rrSetContents": [
        {
            "content": "127.0.0.1",
            "priority": 0
        }
    ],
    "removeAllRecords": "false"
}

```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <hostname>www.example.com</hostname>
  <recordType>A</recordType>
  <rrSetContents>
    <item>
      <content>127.0.0.1</content>
      <priority>0</priority>
    </item>
  </rrSetContents>
  <removeAllRecords>false</removeAllRecords>
</request>

```

Request | resourceRecordSetUpdate  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/resourceRecordSetUpdate  
Processing | asynchronous  
Response | empty  
Parameter | Type | Required | Description  
---|---|---|---  
hostname | string | req | Hostname to change  
recordType | string | req | Type of records to changes  
rrSetContents | list<RrSetContent> | req | New content of the record set  
removeAllRecords | bool | req | Remove records of other types  
This request replaces all existing records of a given type with records using the supplied values.
If `removeAllRecords` is set to true, all other types of records are removed from the given `hostname`.
## Deleting Zones
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/zoneDelete 
```
{
    "authToken": "$$YOUR API KEY$$",
    "zoneConfigId": "15010100000010"
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <zoneConfigId>15010100000010</zoneConfigId>
</request>
```

> ##### Response
```
{
    ...
    "status": "success",
    ...
}
```

```
...
    <status>success</status>
    ...
```

Request | zoneDelete  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/zoneDelete  
Processing | asynchronous  
Response | empty  
Parameter | Type | Required | Description  
---|---|---|---  
zoneConfigId | string | opt | ID of `ZoneConfig` to be deleted  
zoneName | string | opt | Name of `ZoneConfig` to be deleted  
The zone will be marked as `restorable` and removed from the nameservers. After passing the zone’s `restorableUntil` point the complete zone, ie. the `zoneConfig` and all records, will be deleted permanently. Either the ID or the name has to be provided. If both are set, an error will be returned.
## Restoring Zones
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/zoneRestore 
```
{
    "authToken": "$$YOUR API KEY$$",
    "zoneConfigId": "15010100000010"
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <zoneConfigId>15010100000010</zoneConfigId>
</request>
```

> ##### Response
```
{
    ...
    "status": "pending",
    ...
}

```

```
...
    <status>pending</status>
    ...

```

Request | zoneRestore  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/zoneRestore  
Processing | asynchronous  
Response | [Zone](https://www.hosting.de/api/#zone-object)  
Parameter | Type | Required | Description  
---|---|---|---  
zoneConfigId | string | opt | ID of `ZoneConfig` to be restored  
zoneName | string | opt | Name of `ZoneConfig` to be restored  
The zone becomes `active` again, i.e. is no longer in `restorable` state, and is send to the nameservers. Either the ID or the name has to be provided. If both are set, an error will be returned.
## Purging Zones
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/zonePurgeRestorable 
```
{
    "authToken": "$$YOUR API KEY$$",
    "zoneConfigId": "15010100000010"
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <zoneConfigId>15010100000010</zoneConfigId>
</request>
```

> ##### Response
```
{
    ...
    "status": "pending",
    ...
}

```

```
...
    <status>pending</status>
    ...

```

Request | zonePurgeRestorable  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/zonePurgeRestorable  
Processing | asynchronous  
Response | empty  
Parameter | Type | Required | Description  
---|---|---|---  
zoneConfigId | string | opt | ID of `ZoneConfig` to be purged  
zoneName | string | opt | Name of `ZoneConfig` to be purged  
Only works on zones that are already in status `restorable`. The complete zone, ie. the `zoneConfig` and all records, will be deleted permanently. Either the ID or the name has to be provided. If both are set, an error will be returned.
## Changing Content of Records
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/changeContent 
```
{
    "authToken": "$$YOUR API KEY$$",
    "recordType": "MX",
    "oldContent": "mail.mailserver.com",
    "newContent": "mail.smtpservice.com",
    "includeTemplates": false,
    "includeSubAccounts": true
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <includeSubAccounts>true</includeSubAccounts>
  <includeTemplates>false</includeTemplates>
  <newContent>mail.smtpservice.com</newContent>
  <oldContent>mail.mailserver.com</oldContent>
  <recordType>MX</recordType>
</request>
```

> ##### Response
```
{
    ...
    "status": "success",
    ...
}
```

```
...
    <status>success</status>
    ...
```

Request | changeContent  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/changeContent  
Processing | asynchronous  
Response | empty  
Parameter | Type | Required | Description  
---|---|---|---  
recordType | string | req | Type of the records to be changed  
oldContent | string | req | Search string for record content  
newContent | string | req | Replacement content  
includeTemplates | bool | req | Replace content of matching record templates as well  
includeSubAccounts | bool | req | Replace values in records of zones belonging to subaccounts  
`changeContent` is a tool for bulk updates to multiple zones.
An example: You use the same mailserver for all your zones and it changed. Instead of performing an update of each zone you just use `changeContent` with the `recordType` set to `MX`, `oldContent` to the old mailserver, and `newContent` to the new one.
The change will affect all zones with records that match the `recordType` and `oldContent`, but no records that were created with templates. If you want those records and their record templates to be affected as well, you just need to set `includeTemplates` to _true_.
If `includeSubAccounts` is _true_ , the change will affect all matching zones managed by your account and the respective subaccounts as well.
Please note that `changeContent` is currently asynchronous and may take several minutes, depending on how many zones contain a matching record.
## Untying Zones From Their Templates
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/zonesUntieFromTemplate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "zoneConfigIds": [
        "15010100000010"
    ]
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <zoneConfigIds>
    <item>15010100000010</item>
  </zoneConfigIds>
</request>
```

> ##### Response
```
{
    ...
    "status": "success",
    ...
}
```

```
...
    <status>success</status>
    ...
```

Request | zonesUntieFromTemplate  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/zonesUntieFromTemplate  
Processing | synchronous  
Response | empty  
Parameter | Type | Required | Description  
---|---|---|---  
zoneConfigIds | list of strings | opt | IDs of `ZoneConfigs` to be detached  
zoneConfigNames | list of strings | opt | Names of `ZoneConfigs` to be detached  
This will untie zones from the template it was created from. Afterwards, changes to the template will not affect the zones any longer. Cf. [template object](https://www.hosting.de/api/#the-template-object) for more details.
Either the ID list or the name list has to be provided. If both are set, an error will be returned.
## Tying Zones to Templates
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/zonesTieToTemplate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "zoneConfigIds": [
        "15010100000010"
    ],
    "templateId": "15010100000011",
    "templateReplacements": {
        "ipv4Replacement": "192.0.2.1",
        "ipv6Replacement": "2001:0db8:0000:0042:0000:8a2e:0370:7334",
        "mailIpv4Replacement": "192.0.2.2",
        "mailIpv6Replacement": "2001:0db8:0000:0042:0000:8a2e:0370:7334"
    }
}

```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <zoneConfigIds>
    <item>15010100000010</item>
  </zoneConfigIds>
  <templateId>15010100000011</templateId>
  <templateReplacements>
    <ipv4Replacement>192.0.2.1</ipv4Replacement>
    <ipv6Replacement>2001:0db8:0000:0042:0000:8a2e:0370:7334</ipv6Replacement>
    <mailIpv4Replacement>192.0.2.2</mailIpv4Replacement>
    <mailIpv6Replacement>2001:0db8:0000:0042:0000:8a2e:0370:7334</mailIpv6Replacement>
  </templateReplacements>
</request>

```

> ##### Response
```
{
    ...
    "status": "success",
    ...
}
```

```
...
    <status>success</status>
    ...
```

Request | zonesTieToTemplate  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/zonesTieToTemplate  
Processing | asynchronous  
Response | empty  
Parameter | Type | Required | Description  
---|---|---|---  
zoneConfigIds | list of strings | opt | IDs of `ZoneConfigs` to be attached  
zoneConfigNames | list of strings | opt | Names of `ZoneConfigs` to be attached  
templateId | string | req | ID of the `Template` to attach the `ZoneConfigs` to  
templateReplacements | `TemplateReplacements` | opt |  [`TemplateReplacements`](https://www.hosting.de/api/#the-template-replacements-object) to be used  
This will tie zones to a template. Afterwards all changes to the template will affect the zones. Cf. [template object](https://www.hosting.de/api/#the-template-object) for more details.
New records will be created for all record templates that belong to the template. Should one of these records and an already existing record be identical (i.e. name, type, and content are equal), the old record will be deleted. Either the ID list or the name list has to be provided. If both are set, an error will be returned.
## DNSSEC
DNSSEC is used to secure DNS Responses. It is specified in the `dnsSecMode` parameter within a ZoneConfig. You have three options:
Name | Description  
---|---  
off | DNSSEC will not be used for this zone.  
presigned | You sign the zone by yourself. In that case, you have to set `dnsSecOptions` as parameter in your `zoneCreate`, `zoneRecreate` or `zoneUpdate` Requests to `null`. All DS and RRSET Records must be delivered by your request.  
automatic | The zone will be signed by our signing servers. No DNSSEC Records have to be specified by you. You can optional define a `dnsSecOptions` Object as parameter in your `zoneCreate`, `zoneRecreate` or `zoneUpdate` Requests to override the defaults. In the easiest case, just submit `null` as `dnsSecOptions`.  
There are some objects defined for DNSSEC.
## The DnsSecOptions Object
A `dnsSecOptions` Object can be used to overwrite the defaults on creating or updating zones when using `automatic` signing mode. It contains the other DNSSEC objects, see below.
#### DnsSecOptions Object
Property | Type | Required | Description  
---|---|---|---  
keys | list<DnsSecKey> | opt | List of [`DnsSecKey`](https://www.hosting.de/api/#the-dnsseckey-object) Objects. Default is empty.  
algorithms | list<string> | opt | Algorithm, see below.  
nsecMode | string | opt | NSEC Mode, see below.  
publishKsk | bool | opt | Publish KSK to the registry. Only available if the domain name is registered with us. Default is false.  
##### Manual Key list
If you want to submit own keys, just send then within the `keys` list. If your list is an empty array, our signing server will generate the keys automatically.
##### Supported algorithms
At the moment, we only support `RSASHA256` as algorithm. This is also the default.
##### Supported NSEC Modes
We support `nsec` and `nsec3` as NSEC Modes. Default is `nsec3`.
##### Publishing KSK to the registry
If your domain name is registered with us, the KSK will be published to the registry if you set `publishKsk` to `true`.
## The DnsSecKey Object
#### DnsSecKey Object
With the DnsSecKey object one can submit manual keys for the zone signing.
Property | Type | Required | Description  
---|---|---|---  
keyData | DnsSecKeyData | req |  [`DnsSecKeyData`](https://www.hosting.de/api/#the-dnsseckeydata-object) to be used.  
dsData | list<DnsSecDsData> | out-only | List of [`DnsSecDsData`](https://www.hosting.de/api/#the-dnssecdsdata-object) Objects.  
keyTag | int | out-only | Tag of the key  
expiresOn | datetime | out-only | Expiry date of the key  
comments | string | req | Comments  
## The DnsSecKeyData Object
#### DnsSecKeyData Object
With the DnsSecKeyData object one can set the used keys for the zone signing. If nothing is specified, the keys will be automatically generated by our signing server.
Property | Type | Required | Description  
---|---|---|---  
flags | int | req | DNS Key Flag  
protocol | int | req | DNS KEY Resource Record Protocol  
algorithm | int | req | Algorithm  
publicKey | string | req | Public Key  
##### Supported flags
Flag | Description  
---|---  
256 | for zone signing keys  
257 | for key signing keys  
See also [here](http://www.iana.org/assignments/dnskey-flags/dnskey-flags.xhtml#dnskey-flags-1).
##### Supported protocol
At the moment, we only support `3` (DNSSEC) as protocol. See also [here](https://www.iana.org/assignments/dns-key-rr/dns-key-rr.xhtml#dns-key-rr-1).
##### Supported algorithms
At the moment, we only support `1` (SHA-1) as algorithm. See also [here](https://www.iana.org/assignments/dnssec-nsec3-parameters/dnssec-nsec3-parameters.xhtml#dnssec-nsec3-parameters-3).
## The DnsSecDsData Object
#### DnsSecDsData Object
The DnsSecDsData object will only be used as output within a DnsSecKey Object. It contains the data you have to send to the registry.
Property | Type | Required | Description  
---|---|---|---  
algorithm | int | req | Algorithm  
digestType | int | req | Digest Type  
digest | string | req | Digest  
## NameserverSet Object
```
{
    "id": "",
    "accountId": "",
    "name": "Server 1",
    "defaultNameserverSet": false,
    "nameservers": ["ns1.example.com", "ns2.example.com"]
}
```

```
<request>
  <accountId />
  <defaultNameserverSet>false</defaultNameserverSet>
  <id />
  <name>Server 1</name>
  <nameservers>
    <item>ns1.example.com</item>
    <item>ns2.example.com</item>
  </nameservers>
</request>
```

####  `NameserverSet` Object
The `NameserverSet` object is used to manage `NameserverSet`s.
`NameserverSet`s serve a similar purpose to templates: You can create sets for different name server configurations. Then only the ID of the name server set you wish to use for your NS records is needed when creating or recreating a zone. This means you do not need to create the NS records manually.
When you create or recreate a Zone there are two relevant parameters: `nameserverSetId` and `useDefaultNameserverSet`.
If `useDefaultNameserverSet` is set to _true_ , you do not need to provide a `nameserverSetId`. If you still provide the ID, it will be ignored and the `NameserverSet` that is marked as default will be used.
If `useDefaultNameserverSet` is set to _false_ , you may provide a `nameserverSetId`. If you do so, the `NameserverSet` with that ID will be used.
If `useDefaultNameserverSet` is set to _false_ and you do not provide a `nameserverSetId` or set it to 0, no `NameserverSet` will be used. In that case, you have to provide at least two NS records for the zone.
Property | Type | Required | Description  
---|---|---|---  
id | string | out-only |  `NameserverSet` ID. Ignored in `NameserverSet` create requests.  
accountId | string | out-only | ID of account managing `NameserverSet`  
name | string | req | Name `NameserverSet`  
defaultNameserverSet | bool | opt | If true, this set will be used  
nameservers | list <string> | req | List of all name servers in the set. The first entry will be used as primary for the SOA record. Must contain at least two entries.  
## List Nameserver Sets
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/nameserverSetsFind 
```
{
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "nameserverSetName",
        "value": "my nameserver set"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "nameserverSetName",
        "order": "asc"
    }
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <filter>
    <field>nameserverSetName</field>
    <value>my nameserver set</value>
  </filter>
  <limit>10</limit>
  <page>1</page>
  <sort>
    <field>nameserverSetName</field>
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
            // nameserver set objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 15,
        "totalPages": 2,
        "type": "FindNameserverSetsResult"
    },
    ...
}
```

```
<response>
  <response>
    <data>
        // nameserver set objects
    </data>
    <limit>10</limit>
    <page>1</page>
    <totalEntries>15</totalEntries>
    <totalPages>2</totalPages>
    <type>FindNameserverSetsResult</type>
  </response>
</request>
```

Request | nameserverSetsFind  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/nameserverSetsFind  
Processing | synchronous  
Response | [FindNameserverSetsResult](https://www.hosting.de/api/#filtering-and-sorting)  
Listing `NameserverSets` uses the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `nameserverSetsFind`. The response will contain a list of [NameserverSet objects](https://www.hosting.de/api/#nameserverset-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | ID of account managing `NameserverSet`  
NameserverSetId | ID of `NameserverSet` object  
NameserverSetName | Name of `NameserverSet`  
NameserverSetDefaultNameserverSet | True, if default `NameserverSet` is used (boolean)  
## Creating NameserverSet
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/nameserverSetCreate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "nameserverSet": {
        "name": "Server 1",
        "defaultNameserverSet": false,
        "nameservers": ["ns1.example.com", "ns2.example.com"]
    }
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <nameserverSet>
    <defaultNameserverSet>false</defaultNameserverSet>
    <name>Server 1</name>
    <nameservers>
      <item>ns1.example.com</item>
      <item>ns2.example.com</item>
    </nameservers>
  </nameserverSet>
</request>
```

> ##### Response
```
{
    ...
    "response": {
        "accountId": "15010100000001",
        "defaultNameserverSet": false,
        "id": "15010100000010",
        "name": "Server 1",
        "nameservers": ["ns1.example.com", "ns2.example.com"]
    },
    ...
}
```

```
<response>
  <response>
    <accountId>15010100000001</accountId>
    <defaultNameserverSet>false</defaultNameserverSet>
    <id>15010100000010</id>
    <name>Server 1</name>
    <nameservers>
      <item>ns1.example.com</item>
      <item>ns2.example.com</item>
    </nameservers>
  </response>
</request>
```

Request | nameserverSetCreate  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/nameserverSetCreate  
Processing | synchronous  
Response | [NameserverSet](https://www.hosting.de/api/#nameserverset-object)  
Parameter | Type | Required | Description  
---|---|---|---  
nameserverSet | NameserverSet | req |  `NameserverSet` object to be created  
Creates a new `NameserverSet`.
## Updating NameserverSets
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/nameserverSetUpdate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "nameserverSet": {
        "name": "Server 1",
        "defaultNameserverSet": true,
        "nameservers": ["ns1.example.com", "ns2.example.com"]
    }
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <nameserverSet>
    <defaultNameserverSet>true</defaultNameserverSet>
    <name>Server 1</name>
    <nameservers>
      <item>ns1.example.com</item>
      <item>ns2.example.com</item>
    </nameservers>
  </nameserverSet>
</request>
```

> ##### Response
```
{
    ...
    "response": {
        "accountId": "15010100000001",
        "defaultNameserverSet": true,
        "id": "15010100000010",
        "name": "Server 1",
        "nameservers": ["ns1.example.com", "ns2.example.com"]
    },
    ...
}
```

```
<response>
  <response>
    <accountId>15010100000001</accountId>
    <defaultNameserverSet>false</defaultNameserverSet>
    <id>15010100000010</id>
    <name>Server 1</name>
    <nameservers>
      <item>ns1.example.com</item>
      <item>ns2.example.com</item>
    </nameservers>
  </response>
</request>
```

Request | nameserverSetUpdate  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/nameserverSetUpdate  
Processing | synchronous  
Response | [NameserverSet](https://www.hosting.de/api/#nameserverset-object)  
Parameter | Type | Required | Description  
---|---|---|---  
nameserverSet | NameserverSet | req |  `NameserverSet` object to be updated  
Updates an existing `NameserverSet`. If the set does not exist, an error will be returned.
## Deleting NameserverSets
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/nameserverSetDelete 
```
{
    "authToken": "$$YOUR API KEY$$",
    "nameserverSetId": "15010100000010"
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <nameserverSetId>15010100000010</nameserverSetId>
</request>
```

> ##### Response
```
{
    ...
    "status": "success",
    ...
}
```

```
...
    <status>success</status>
    ...
```

Request | nameserverSetDelete  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/nameserverSetDelete  
Processing | synchronous  
Response | empty  
Parameter | Type | Required | Description  
---|---|---|---  
nameserverSetId | string | req | ID of NameserverSet to be deleted  
Deletes an existing `NameserverSet`. If the set does not exist, an error will be returned.
## Getting Default NameserverSet
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/nameserverSetGetDefault 
```
{
    "authToken": "$$YOUR API KEY$$"
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
</request>
```

> ##### Response
```
{
    ...
    "response": {
        "accountId": "15010100000001",
        "defaultNameserverSet": true,
        "id": "15010100000010",
        "name": "Default",
        "nameservers": ["ns1.example.com", "ns2.example.com"]
    },
    ...
}
```

```
<response>
  <response>
    <accountId>15010100000001</accountId>
    <defaultNameserverSet>true</defaultNameserverSet>
    <id>15010100000010</id>
    <name>Default</name>
    <nameservers>
      <item>ns1.example.com</item>
      <item>ns2.example.com</item>
    </nameservers>
  </response>
</request>
```

Request | nameserverSetGetDefault  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/nameserverSetGetDefault  
Processing | synchronous  
Response | [NameserverSet](https://www.hosting.de/api/#nameserverset-object)  
No specific parameters need to be passed.
This returns the `NameserverSet` that is used whenever you do not provide a specific `NameserverSet` ID while creating a zone.
## The Template Object
#### Template Object
The template itself is a simple object only consisting of a name. However, templates are a powerful tool for creating and mass updating [zones](https://www.hosting.de/api/#the-zone-object) - quickly and easily.
There are two ways to [create](https://www.hosting.de/api/#creating-new-zones) or [recreate a zone](https://www.hosting.de/api/#recreating-existing-zones). You can either create the zone by providing a [zoneConfig](https://www.hosting.de/api/#the-zoneconfig-object) and a list of [records](https://www.hosting.de/api/#the-record-object)
  * without any [template values](https://www.hosting.de/api/#the-template-values-object). Or you can use a template.


To use a template, you have to at least set the `templateId` property of the `zoneConfig`’s template values property. That will cause all [record templates](https://www.hosting.de/api/#the-record-template-object) attached to the template to be converted into [DNS records](https://www.hosting.de/api/#the-record-object). Thus enabling you to create a full zone without providing a single record in the `zoneCreate` call.
##### Tying Zones to Templates
A zone may be tied to a template, determined by the `tieToTemplate` property of the `zoneConfig`’s template values.
  
Whenever a template is updated, the respective zones will also receive updates. This means:
  * Adding record templates to a template will cause corresponding records to be added to the zone.
  * Changing existing record templates will cause the same changes to the records that were created from the record templates.
  * Deleting a record template will also delete all records that were created by it. This means that recreating a template also deletes ALL records created from the record templates.


A zone that is not tied to a template will not change when its respective template is updated.
If you change your mind, you do not need to recreate the zone. Instead, you can use [zoneUntieFromTemplate](https://www.hosting.de/api/#untying-zones-from-their-templates) to detach a zone from its template.
##### Placeholders
Placeholders are a crucial feature of the template system. There are five different placeholders you can use:
  
`##DOMAIN##`, `##IPV4##`, `##IPV6##`, `##MX_IPV4##`, and `##MX_IPV6##`.
`##DOMAIN##` will automatically be replaced with the `name` property of the `zoneConfig`. It may be used in the `name` and `content` properties of record templates. A record template with the type `MX` could, for example, have the name `mail.##DOMAIN##`.
`##IPV4##`, `##IPV6##`, `##MX_IPV4##` and `##MX_IPV6##` may only be used in the `content` property of record templates. Most commonly `##IPV4##` is used for `A` records, `##IPV6##` for `AAAA` records, and `##MX_IPV4##` and `##MX_IPV6##` to create target hostnames for `MX` records. However, usage is not restricted to a certain type.
  
Using these four placeholders requires replacement values. Not providing a replacement value for a placeholder when creating or recreating a zone from a template, will result in an error.
The replacement values have to be set in their respective properties in the template values object and they have to be valid according to their usage. For example, when your `AAAA` record template contains the `##IPV6##` placeholder, the `IPv6` replacement value has to be a valid `IPv6` address.
As not all replacement values have to be set when you create a zone from a template, you may provide a [template replacements object](https://www.hosting.de/api/#the-template-replacements-object) when [recreating](https://www.hosting.de/api/#recreating-templates) or [updating](https://www.hosting.de/api/#updating-templates) a template.
This is necessary if you add a record template using a placeholder that has not been used before. Not all zones tied to the template might have a replacement value for the new placeholder. In that case, the replacement value from the template replacements object will be used as a default.
Property | Type | Required | Description  
---|---|---|---  
id | string | see description | ID of this template. Ignored in template create requests. Either ID or name is required in all other requests.  
accountId | string | out-only | ID of template managing account  
name | string | req | Freely chosen name. It has to be unique within the account.  
## The Template Replacements Object
#### TemplateReplacements Object
The `template replacements` object is used for [recreating](https://www.hosting.de/api/#recreating-templates) and [updating](https://www.hosting.de/api/#updating-templates) [templates](https://www.hosting.de/api/#the-template-object).
Whenever a template is changed, all [zones](https://www.hosting.de/api/#the-zone-object) that are tied to the template are changed as well. If, for example, you add a new [record template](https://www.hosting.de/api/#the-record-template-object) that contains a placeholder that has not been used in the template before, the zones tied to the template might not have a replacement value for the placeholder.
In that case the replacement value provided with the Template Replacements Object will be used as a default.
Property | Type | Required | Description  
---|---|---|---  
ipv4Replacement | string | opt |   
ipv6Replacement | string | opt |   
mailIpv4Replacement | string | opt |   
mailIpv6Replacement | string | opt |   
## The Record Template Object
####  `RecordTemplate` Object
Record templates are part of a template.
When you create a zone with a template, each of its `RecordTemplate`s will be converted into a record. Updating a template and adding `RecordTemplates` will cause converted records to be added to all zones that are tied to the template.
Please note that updating a template may impact all zones tied to it. All records based on removed `RecordTemplate`s will also be removed.
Cf. [template object](https://www.hosting.de/api/#the-template-object) for more details.
Property | Type | Required | Description  
---|---|---|---  
id | string | cf. description |  `RecordTemplate` ID. Ignored in `RecordTemplate` create requests. Either `id` or `templateId`, `name`, `type`, and `content` are required in all other requests.  
templateId | string | cf. description | ID of template, the `RecordTemplate` is connected to. Required in non-create requests, if no `id` is provided.  
name | string | cf. description | Name for records created from `RecordTemplate`. It may contain the `##DOMAIN##` placeholder which will be replaced with zone name of zone created from template.   
Example: `mail.##DOMAIN##` may result in `mail.example.com`  
type | string | cf. description | Type for records created from `RecordTemplate`. Valid types are `A`, `AAAA`, `MX`, `NS`, `CNAME`, `PTR`, `SRV`  
content | string | cf. description | Content for records created from `RecordTemplate`. If the type is `A`, the `##IPV4##` or `##MX_IPV4##` placeholder may be used instead of a specific `IPv4`. If the type is `AAAA`, the `##IPV6##` or `##MX_IPV6##` placeholder may be used instead of a specific `IPv6`.  
ttl | int | opt | TTL for records created from `RecordTemplate`. Minimum value: `60`. Less will result in a warning and the TTL will be corrected to the minimum. Maximum value: `31556926` (one year). Exceeding the maximum or undercutting the minimum value will cause the request to be aborted and result in an error.  
priority | int | opt | Priority for the records created from this `RecordTemplate`. Only relevant if the type is `MX` or `SRV`. Must be 0 or greater for those types.  
## Listing Templates
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/templatesFind 
```
{
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "accountId",
        "value": "150101000000001"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "templateName",
        "order": "asc"
    }
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <filter>
    <field>accountId</field>
    <value>150101000000001</value>
  </filter>
  <limit>10</limit>
  <page>1</page>
  <sort>
    <field>templateName</field>
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
            // template objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 15,
        "totalPages": 2,
        "type": "FindTemplatesResult"
    },
    ...
}
```

```
<response>
  ...
  <response>
    <data>
        // template objects
    </data>
    <limit>10</limit>
    <page>1</page>
    <totalEntries>15</totalEntries>
    <totalPages>2</totalPages>
    <type>FindTemplatesResult</type>
  </response>
  ...
</request>
```

Request | templatesFind  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/templatesFind  
Processing | synchronous  
Response | [FindTemplatesResult](https://www.hosting.de/api/#filtering-and-sorting)  
Listing templates uses the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `templatesFind`. The response will contain a list of [template objects](https://www.hosting.de/api/#the-template-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | ID of the account managing template  
TemplateId | Template object ID  
TemplateName | Name of the template  
## Listing Record Templates
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/recordTemplatesFind 
```
{
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "templateId",
        "value": "15010100000010"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "recordTemplateName",
        "order": "asc"
    }
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <filter>
    <field>templateId</field>
    <value>15010100000010</value>
  </filter>
  <limit>10</limit>
  <page>1</page>
  <sort>
    <field>recordTemplateName</field>
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
            // record template objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 15,
        "totalPages": 2,
        "type": "FindRecordTemplatesResult"
    },
    ...
}
```

```
<response>
  ...
  <response>
    <data>
        // record template objects
    </data>
    <limit>10</limit>
    <page>1</page>
    <totalEntries>15</totalEntries>
    <totalPages>2</totalPages>
    <type>FindRecordTemplatesResult</type>
  </response>
  ...
</request>
```

Request | recordTemplatesFind  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/recordTemplatesFind  
Processing | synchronous  
Response | [FindRecordTemplatesResult](https://www.hosting.de/api/#filtering-and-sorting)  
Listing template records uses the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `recordTemplatesFind`. The response will contain a list of [template record objects](https://www.hosting.de/api/#the-record-template-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
TemplateId | ID of template object to which template record belongs  
RecordTemplateId | ID of template record object  
RecordTemplateName | Name of template record  
RecordTemplateType | Type of template record  
RecordTemplateContent | Content of template record  
RecordTemplateTtl | Time until template record is live (in seconds)  
RecordTemplatePriority | Priority of the template record (integer)  
## Creating Templates
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/templateCreate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "dnsTemplate": {
        "name": "example template"
    },
    "recordTemplates": [
        {
            "name": "##DOMAIN##",
            "type": "A",
            "content": "##IPV4##",
            "ttl": 10000
        },
        {
            "name": "mail.##DOMAIN##",
            "type": "AAAA",
            "content": "##MX_IPV6##",
            "ttl": 10000,
            "priority": 10
        }
    ]
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <dnsTemplate>
    <name>example template</name>
  </dnsTemplate>
  <recordTemplates>
    <item>
      <content>##IPV4##</content>
      <name>##DOMAIN##</name>
      <ttl>10000</ttl>
      <type>A</type>
    </item>
    <item>
      <content>##MX_IPV6##</content>
      <name>mail.##DOMAIN##</name>
      <priority>10</priority>
      <ttl>10000</ttl>
      <type>AAAA</type>
    </item>
  </recordTemplates>
</request>
```

> ##### Response
```
{
    ...
    "response": {
        "id": "150101000000010",
        "accountId": "150101000000001",
        "name": "example template"
    },
    ...
}
```

```
<response>
  ...
  <response>
    <accountId>150101000000001</accountId>
    <id>150101000000010</id>
    <name>example template</name>
  </response>
  ...
</request>
```

Request | templateCreate  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/templateCreate  
Processing | synchronous  
Response | [Template](https://www.hosting.de/api/#template-object)  
Parameter | Type | Required | Description  
---|---|---|---  
dnsTemplate | Template | req | Template to be created  
recordTemplates | list<RecordTemplate> | req | Record templates to be created and associated with template  
Creates a new template. Please cf. [the template object](https://www.hosting.de/api/#the-template-object) for more details on how to use templates.
## Recreating Templates
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/templateRecreate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "dnsTemplate": {
        "name": "example template"
    },
    "recordTemplates": [
        {
            "name": "##DOMAIN##",
            "type": "A",
            "content": "##IPV4##",
            "ttl": 10000
        },
        {
            "name": "mail.##DOMAIN##",
            "type": "AAAA",
            "content": "##MX_IPV6##",
            "ttl": 10000,
            "priority": 10
        }
    ],
    "replacements": {
        "ipv4Replacement": "123.1.2.3",
        "ipv6Replacement": "2001:db8::2",
        "mailIpv4Replacement": "123.1.2.4",
        "mailIpv6Replacement": "2001:db8::1"
    }
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <clientTransactionId />
  <dnsTemplate>
    <name>example template</name>
  </dnsTemplate>
  <recordTemplates>
    <item>
      <content>##IPV4##</content>
      <name>##DOMAIN##</name>
      <ttl>10000</ttl>
      <type>A</type>
    </item>
    <item>
      <content>##MX_IPV6##</content>
      <name>mail.##DOMAIN##</name>
      <priority>10</priority>
      <ttl>10000</ttl>
      <type>AAAA</type>
    </item>
  </recordTemplates>
  <replacements>
    <ipv4Replacement>123.1.2.3</ipv4Replacement>
    <ipv6Replacement>2001:db8::2</ipv6Replacement>
    <mailIpv4Replacement>123.1.2.4</mailIpv4Replacement>
    <mailIpv6Replacement>2001:db8::1</mailIpv6Replacement>
  </replacements>
</request>
```

> ##### Response
```
{
    ...
    "response": {
        "id": "15010100000010",
        "accountId": "150101000000001",
        "name": "example template"
    },
    ...
}
```

```
<response>
  ...
  <response>
    <accountId>150101000000001</accountId>
    <id>15010100000010</id>
    <name>example template</name>
  </response>
  ...
</request>
```

Request | templateRecreate  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/templateRecreate  
Processing | asynchronous  
Response | [Template](https://www.hosting.de/api/#template-object)  
Parameter | Type | Required | Description  
---|---|---|---  
dnsTemplate | Template | req | Template to be recreated  
recordTemplates | list<RecordTemplate> | req | Record templates to be recreated and connected with template  
replacements | TemplateReplacements | opt | Replacement values  
Recreates an existing template. An error will be returned if the template does not exist.
Note that recreating a template affects all zones tied to the template. Cf. [The Template Object](#the-template-object) for more details. Depending on the number of zones tied to the template, this may take several minutes.
## Updating Templates
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/templateUpdate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "dnsTemplate": {
        "name": "example template"
    },
    "recordTemplatesToAdd": [
        {
            "name": "##DOMAIN##",
            "type": "AAAA",
            "content": "##IPV6##",
            "ttl": 3600
        }
    ],
    "recordTemplatesToDelete": [
        {
            "name": "mail.##DOMAIN##",
            "type": "AAAA",
            "content": "##MX_IPV6##"
        }
    ],
    "replacements": {
        "ipv4Replacement": "123.1.2.3",
        "ipv6Replacement": "2001:db8::2",
        "mailIpv4Replacement": "123.1.2.4",
        "mailIpv6Replacement": "2001:db8::1"
    }
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <clientTransactionId />
  <dnsTemplate>
    <name>example template</name>
  </dnsTemplate>
  <recordTemplatesToAdd>
    <item>
      <content>##IPV6##</content>
      <name>##DOMAIN##</name>
      <ttl>3600</ttl>
      <type>AAAA</type>
    </item>
  </recordTemplatesToAdd>
  <recordTemplatesToDelete>
    <item>
      <content>##MX_IPV6##</content>
      <name>mail.##DOMAIN##</name>
      <type>AAAA</type>
    </item>
  </recordTemplatesToDelete>
  <replacements>
    <ipv4Replacement>123.1.2.3</ipv4Replacement>
    <ipv6Replacement>2001:db8::2</ipv6Replacement>
    <mailIpv4Replacement>123.1.2.4</mailIpv4Replacement>
    <mailIpv6Replacement>2001:db8::1</mailIpv6Replacement>
  </replacements>
</request>
```

> ##### Response
```
{
    ...
    "response": {
        "id": "15010100000010",
        "accountId": "150101000000001",
        "name": "example template"
    },
    ...
}
```

```
<response>
  ...
  <response>
    <accountId>150101000000001</accountId>
    <id>15010100000010</id>
    <name>example template</name>
  </response>
  ...
</request>
```

Request | templateUpdate  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/templateUpdate  
Processing | asynchronous  
Response | [Template](https://www.hosting.de/api/#template-object)  
Parameter | Type | Required | Description  
---|---|---|---  
dnsTemplate | Template | req | Template to be updated  
recordTemplatesToAdd | list<RecordTemplate> | req | Record templates to be added to template  
recordTemplatesToDelete | list<RecordTemplate> | req | Record templates to be removed from template  
replacements | TemplateReplacements | opt | New replacement values  
Updates an existing template. If the template does not exist, an error will be returned.
Note that updating a template affects all zones tied to the template. Cf. [the template object](#the-template-object) for more details. Depending on the number of zones tied to the template this may take several minutes.
## Deleting Templates
> ##### POST https://secure.hosting.de/api/dns/v1/jsonxml/templateDelete 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "templateId": "15010100000010"
}
```

```
<request>
  <authToken>$$YOUR API KEY$$</authToken>
  <clientTransactionId />
  <templateId>15010100000010</templateId>
</request>
```

> ##### Response
```
{
    ...
    "status": "success",
    ...
}
```

```

```

Request | templateDelete  
---|---  
Url |  https://secure.hosting.de/api/dns/v1/jsonxml/templateDelete  
Processing | synchronous  
Response | empty  
Parameter | Type | Required | Description  
---|---|---|---  
templateId | string | req | ID of template to be deleted  
templateName | string | opt | Name of the template to be deleted  
Deletes an existing template and all record templates connected to it. If both ID and Name are set, the template does not exist, or zones are tied to the template, an error will be returned.
# SSL
The SSL part of the API allows you to order, renew, or revoke SSL certificates.
Certificates fall in three different categories: domain validated, organization validated, and extended validated certificates.
Please keep in mind, that the SSL API is released as a beta and might have code breaking changes in further releases.
## Typical Workflow
  * Order an SSL certificate by calling [`orderCreate`](https://www.hosting.de/api/#ordering-ssl-certificates). Please keep in mind, that this function will be replaced by a new function certificateCreate in a later release.
  * Domain validated orders allow you to receive certificates in a short period of time. You can choose between four validation methods:

Name | Comment  
---|---  
auto | If your DNS Zone or webspace is hosted with us, our system can validate your domain name automatically.  
validateViaDns | Create a DNS Record with the name of `validationKey` and the content of `validationValue`  
validateViaEmail | You will receive an email and have to click a link.  
validateViaFile | Create a file accessible via HTTP under the domain name with the name `validationKey`, content of the file is `validationValue`  
  * Otherwise (organization validated orders or email validation), proceed with the SSL supplier’s validation process.
  * If you chose `validateViaDns` or `validateViaFile` you should get Certificate Details by calling [`certificateDetailsGet`](https://www.hosting.de/api/#getting-certificate-details). If `validationKey` and `validationValue` are filled, you can continue to create DNS records or the file on the webspace. You might call `certificateDetailsGet` more than once until the fields are filled.
  * Get the certificate by calling [`certificateGetCertificate`](https://www.hosting.de/api/#getting-one-certificate). If the `orderStatus` is completed, the certifcate was succesfully created an you can use it.


## Available SSL Products
Supplier | Product | Periods (months) | Additional Domain Names | ProductCode | Validation Type  
---|---|---|---|---|---  
GeoTrust | RapidSSL | 12 | - | ssl-geotrust-rapidssl-12m | Domain  
GeoTrust | RapidSSL Wildcard | 12 | - | ssl-geotrust-rapidssl-wildcard-12m | Domain  
GeoTrust | TrueBizId | 12 | 100 | ssl-geotrust-truebizid-12m | Organization  
GeoTrust | TrueBizId Wildcard | 12 | - | ssl-geotrust-truebizid-wildcard-12m | Organization  
GeoTrust | TrueBizIdEv | 12 | 100 | ssl-geotrust-truebizidev-12m | Organization  
## The Certificate Order Object
The `CertificateOrder` object will be used as a base class when creating orders.
```
{
    "csr": "-----BEGIN CERTIFICATE REQUEST-----
...
-----END CERTIFICATE REQUEST-----",
    "adminContact": {
        "title": "Mr.",
        "firstName": "George",
        "lastName": "Orwell",
        "phoneNumber": "++149635453433",
        "emailAddress": "admin@example.com"
    },
    "techContact": {
        "title": "Mr.",
        "firstName": "Robert",
        "lastName": "Stevenson",
        "phoneNumber": "++1333544451",
        "emailAddress": "tech@example.com"
    },
    "productCode": "ssl-geotrust-rapidssl-12m",		
    "validationType": "validateViaEmail"
}
```

```
<order>
	<csr>-----BEGIN CERTIFICATE REQUEST-----
...
-----END CERTIFICATE REQUEST-----</csr>
	<adminContact>
		<title>Mr.</title>
		<firstName>George</firstName>
		<lastName>Orwell</lastName>
		<phoneNumber>++149635453433</phoneNumber>
		<emailAddress>admin@example.com</emailAddress>
	</adminContact>
	<techContact>
		<title>Mr.</title>
		<firstName>Robert</firstName>
		<lastName>Stevenson</lastName>
		<phoneNumber>++1333544451</phoneNumber>
		<emailAddress>tech@example.com</emailAddress>
	</techContact>
	<productCode>ssl-geotrust-rapidssl-12m</productCode>
	<validationType>validateViaEmail</validationType>
</order>
```

#### Certificate Order Object
Property | Type | Required | Description  
---|---|---|---  
csr | string | req | Certificate signing request  
adminContact | Contact | opt | Admin contact for order (cf. [the contact object](https://www.hosting.de/api/#ssl-contact-object))  
techContact | Contact | opt | Technical contact for order (cf. [the contact object](https://www.hosting.de/api/#ssl-contact-object))  
productCode | string | req | Contains supplier’s brand and certificate’s product name  
additionalDomainNames | list <string> | opt | Additional domains secured by the certificate  
autoRenew | bool | req | If true, certificate will get auto renewed on renewDate  
validationType | string | req | Method of the validation (auto, validateViaDns, validateViaEmail, validateViaFile)  
The `CertificateOrder` object has to be extended depending on the chosen product:
```
{
    "type": "DomainValidatedCertificateOrder",
    ...
    "approverEmailAddress": "admin@example.com"
}
```

```
<order>
	<type>DomainValidatedCertificateOrder</type>
	...
	<approverEmailAddress>admin@example.com</approverEmailAddress>
</order>
```

#### Domain Validated Certificate Order Object
Property | Type | Required | Description  
---|---|---|---  
type | string | req | always `DomainValidatedCertificateOrder` for domain validated orders  
approverEmailAddress | string | req | Approver email address  
```
{
    "type": "OrganizationValidatedCertificateOrder",
    ...
    "organization": {
        "organizationName": "Musterfirma",
        "organizationUnit": "IT Service",
        "phoneNumber": "+49635453433",
        "faxNumber": "+49635453433",
        "addressLine1": "Musterstr. 1",
        "city": "Musterstadt",
        "region": "Musterland",
        "postalCode": "12345",
        "country": "DE"
    }
}
```

```
<order>
    <type>OrganizationValidatedCertificateOrder</type>
    ...
    <organization>
        <organizationName>Musterfirma</organizationName>
        <organizationUnit>IT Service</organizationUnit>
        <phoneNumber>+49635453433</phoneNumber>
        <faxNumber>+49635453433</faxNumber>
        <addressLine1>Musterstr. 1</addressLine1>
        <addressLine2></addressLine2>
        <city>Musterstadt</city>
        <region>Musterland</region>
        <postalCode>12345</postalCode>
        <country>DE</country>
    </organization>
</order>
```

#### Organization Validated Order Object
Property | Type | Required | Description  
---|---|---|---  
type | string | req | always `OrganizationValidatedCertificateOrder` for organization validated orders  
organization | Organization | req | Organization Object (cf. [the Organization Object](https://www.hosting.de/api/#the-organization-object))  
```
{
    "type": "EmailCertificateOrder",
    ...
    "emailAddresses": [
        "smime@example.com"
    ]
}
```

```
<order>
	<type>EmailCertificateOrder</type>
	...
	<emailAddresses>
        <item>smime@example.com</item>
    </emailAddresses>
</order>
```

#### Email Certificate Order Object
The `EmailCertificateOrder` is used for ordering SMIME Certificates.
Property | Type | Required | Description  
---|---|---|---  
type | string | req | always `EmailCertificateOrder` for email (SMIME) orders  
emailAddresses | list <string> | req | Email Address as list which the SMIME Certificate should contain. At this time this must be exaclty one element.  
## The OrderConfirmation Object
The `OrderConfirmation` object is returned if an order has been successfully created.
```
{
    "certificateId": "180102xxxxxxxxx",
    "commonName": "example.com",
    "jobId": "180102xxxxxxxxxx"
}
```

```
<orderconfirmation>
	<certiciateId>180102xxxxxxxxxx</certiciateId>
	<commonName>example.com</commonName>
	<jobId>180102xxxxxxxxxx</jobId>
</orderconfirmation>
```

#### Order Confirmation Object
Property | Type | Required | Description  
---|---|---|---  
certificateId | string | req | Certificate ID  
jobId | string | req | Job ID  
commonName | string | req | Common Name of the certificate  
## The Contact Object
You use the `Contact` object when creating orders.
```
{
    "title": "Mr.",
    "firstName": "George",
    "lastName": "Orwell",
    "phoneNumber": "+49635453433",
    "emailAddress": "admin@example.com"
}
```

```
<contact>
    <emailAddress>admin@example.com</emailAddress>
    <firstName>George</firstName>
    <lastName>Orwell</lastName>
    <phoneNumber>++149635453433</phoneNumber>
    <title>Mr.</title>
</contact>
```

#### SSL Contact Object
Property | Type | Required | Description  
---|---|---|---  
title | string | opt | Title  
firstName | string | req | First name  
lastName | string | req | Last name  
phoneNumber | string | req | Phone number  
emailAddress | string | req | Email address  
## The Organization Object
You use `Organization` object when creating orders for organization/extended validation certificates.
```
{
    "organizationName": "Musterfirma",
    "organizationUnit": "IT Service",
    "phoneNumber": "+49635453433",
    "faxNumber": "+49635453433",
    "addressLine1": "Musterstr. 1",
    "addressLine2": "",
    "city": "Musterstadt",
    "region": "Musterland",
    "postalCode": "12345",
    "country": "DE"
}
```

```
<organization>
    <organizationName>Musterfirma</organizationName>
    <organizationUnit>IT Service</organizationUnit>
    <phoneNumber>+49635453433</phoneNumber>
    <faxNumber>+49635453433</faxNumber>
    <addressLine1>Musterstr. 1</addressLine1>
    <addressLine2></addressLine2>
    <city>Musterstadt</city>
    <region>Musterland</region>
    <postalCode>12345</postalCode>
    <country>DE</country>
</organization>
```

#### Organization Object
Property | Type | Required | Description  
---|---|---|---  
organizationName | string | req | Name of the organization  
organizationUnit | string | opt | Unit of the organization that handles SSL certificates  
phoneNumber | string | req | Phone number  
faxNumber | string | opt | Fax number  
addressLine1 | string | req | First address line, usually street  
addressLine2 | string | opt | Second address line / Further address information  
city | string | opt | City  
region | string | opt | Region/State  
postalCode | string | opt | Postal Code  
country | string | opt | [ISO country code (two letters)](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)  
## The CSR Object
The `CSR` object contains information parsed from a CSR.
```
{
    "domainName": "example.com",
    "country": "US",
    "emailAddress": "admin@example.com",
    "locality": "Dreamtown",
    "organization": "Example Inc.",
    "organizationUnit": "IT Department",
    "state": "California"
}
```

```
<csr>
	<domainName>example.com</domainName>
	<country>US</country>
	<emailAddress>admin@example.com</emailAddress>
	<locality>Dreamtown</locality>
	<organization>Example Inc.</organization>
	<organizationUnit>IT Department</organizationUnit>
	<state>California</state>
</csr>
```

#### CSR Object
Property | Type | Required | Description  
---|---|---|---  
domainName | string | req | Domain name (common name)  
country | string | req | ISO country code  
emailAddress | string | req | Email address (of approver)  
locality | string | req | City  
organization | string | req | Organization name  
organizationUnit | string | req | Subunit of organization  
state | string | req | State within country  
additionalDomainNames | list < string > | opt | Additional domains secured by the certificate  
keyType | string | req |   
keyLength | int | req |   
eccType | string | req |   
## Decode CSR Result Object
The `DecodeCsrResult` object contains information about products and the decoded CSR.
#### The Decode CSR Result Object
Property | Type | Required | Description  
---|---|---|---  
csr | CSR | req | CSR Object parsed from csr request (cf. [the CSR object](https://www.hosting.de/api/#the-csr-object))  
errors | list <ErrorOrWarning> | req | Errors  
warnings | list <ErrorOrWarning> | req | Warnings  
productCodes | list <string> | req | possible ProductCodes matching the CSR  
## The Certificate Details Object
The `CertificateDetails` object is returned by `certificatesDetailsGet`.
```
{
    "addDate": "2020-11-24T14:07:05Z",
    "adminContact": {
        "title": "Mr.",
        "firstName": "George",
        "lastName": "Orwell",
        "phoneNumber": "++149635453433",
        "emailAddress": "admin@example.com"
    },
    "techContact": {
        "title": "Mr.",
        "firstName": "Robert",
        "lastName": "Stevenson",
        "phoneNumber": "++1333544451",
        "emailAddress": "tech@example.com"
    },
    "csr": "-----BEGIN CERTIFICATE REQUEST-----\n...\n-----END CERTIFICATE REQUEST-----",
    "approverEmailAddress": "admin@example.com",
    "id": "65453135153153",
    "lastChangeDate": "2020-11-24T14:09:42Z",
    "type": "DomainValidatedCertificateDetails",
    "validationKey": "",
    "validationType": "validateViaEmail",
    "validationValue": "admin@example.com"
}
```

```
<certificatedetails>
    <addDate>2020-11-24T14:07:05Z</addDate>
    <adminContact>
       <emailAddress>admin@example.com</emailAddress>
       <firstName>George</firstName>
       <lastName>Orwell</lastName>
       <phoneNumber>++149635453433</phoneNumber>
       <title>Mr.</title>
    </adminContact>
    <approverEmailAddress>admin@example.com</approverEmailAddress>
    <csr>-----BEGIN CERTIFICATE REQUEST-----
...
-----END CERTIFICATE REQUEST-----</csr>
    <id>65453135153153</id>
    <lastChangeDate>2020-11-24T14:09:42Z</lastChangeDate>
    <techContact>
        <emailAddress>tech@example.com</emailAddress>
        <firstName>Robert</firstName>
        <lastName>Stevenson</lastName>
        <phoneNumber>++1333544451</phoneNumber>
        <title>Mr.</title>
    </techContact>
    <type>DomainValidatedCertificateDetails</type>
    <validationKey />
    <validationType>validateViaEmail</validationType>
    <validationValue>admin@example.com</validationValue>
</certificatedetails>
```

#### Certificate Details Object
Every Validation Type contains the following information:
Property | Type | Required | Description  
---|---|---|---  
id | string | req | Certificate ID  
csr | string | req | Certificate signing request  
adminContact | Contact | req | Admin contact for order (cf. [the contact object](https://www.hosting.de/api/#the-contact-object))  
techContact | Contact | req | Technical contact for order (cf. [the contact object](https://www.hosting.de/api/#the-contact-object))  
##### Domain Validated Certificate Details
If you ordered a domain validated certificate, the CertificateDetails object contains additionally the following fields:
Property | Type | Required | Description  
---|---|---|---  
validationType | string | req | Validation type  
validationKey | string | opt | Validation key  
validationValue | string | opt | Validation value  
approverEmailAddress | string | opt | Emailaddress of the approver  
##### Organization Validated Certificate Details
If you ordered an organization validated certificate, the CertificateDetails object contains additionally the following fields:
Property | Type | Required | Description  
---|---|---|---  
organization | Organization | req | Organization object, see [the organization object](https://www.hosting.de/api/#the-organization-object)  
## The Certificate Object
The `Certificate` Object is returned by `certificatesFind` or `certificateGetCertificate`.
```
{
    "id": "65453135153153",
    "accountId": "98687313548",
    "status": "active",
    "orderStatus": "complete",
    "startDate": "2014-12-17T02:23:46",
    "endDate": "2015-01-20T04:33:40",            
    "commonName": "example.com",
    "serialNumber": "581A3F",
    "serverCert": "-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----",

    "intermediateCert": "-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----",

    "rootCert": "-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----",

    "externalOrderId": "1234567890",
    "validitySpanMonth": 1,
    "validationLevel": "XXXX",
    "brand": "DigiCert",
    "productCode": "GeoTrust FreeSSL",
    "additionalDomainNames": [ ]
}
```

```
<certificate>
    <id>65453135153153</id>
    <accountId>98687313548</accountId>
    <status>active</status>
    <startDate>2014-12-17T02:23:46</startDate>
    <endDate>2015-01-20T04:33:40</endDate>
    <commonName>example.com</commonName>
    <serialNumber>581A3F</serialNumber>
    <serverCert>-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----"</serverCert>
    <intermediateCert>-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----</intermediateCert>
    <rootCert>-----BEGIN CERTIFICATE-----
...
-----END CERTIFICATE-----</rootCert>
    <externalOrderId>1234567890"</externalOrderId>
    <validitySpanMonth>1</validitySpanMonth>
    <validationLevel>XXXX"</validationLevel>
    <brand>DigiCert</brand>
    <productCode>GeoTrust FreeSSL</productCode>
    <additionalDomainNames></additionalDomainNames>
</certificate>
```

#### Certificate Object
Property | Type | Required | Description  
---|---|---|---  
id | string | req | Certificate ID  
accountId | string | req | ID of certificate managing account  
status | string | req | Current [certificate status](https://www.hosting.de/api/#certificate-status)  
orderStatus | string | req | Current [order status](https://www.hosting.de/api/#order-status)  
startDate | datetime | req | Start date of certificate’s validity period  
endDate | datetime | req | End date of certificate’s validity period  
commonName | string | req | Domain name  
serialNumber | string | req | Serial number of certificate (issued by supplier)  
serverCert | string | req | Server certificate  
intermediateCert | string | req | Intermediate certificate  
rootCert | string | req | Root certificate  
externalOrderId | string | opt | Order ID from supplier  
validitySpanMonth | int | opt | Validity period  
validationLevel | string | opt | Type of the validation (dv/ev/ov)  
productCode | string | req | Contains supplier’s brand and certificate’s product name  
brand | string | opt | Name of the certificates brand  
product | string | opt | Name of the certificates product  
additionalDomainNames | list <string | opt | Additional domains secured by the certificate  
cancelableUntil | datetime | opt | Date until the certificate can be cancelled for renew  
renewDate | datetime | opt | Date for the next renewal of the certificate  
autoRenew | bool | opt | If true, certificate will get auto renewed on renewDate  
##### Certificate Status
Status | Description  
---|---  
none | Unknown status  
active | Certificate is validated and active  
canceled | Certificate has been canceled (as ordered) and is no longer active  
revoked | Certificate has been revoked and is no longer active  
pendingRevoke | A request to revoke the certificate has been submitted to the supplier. The request has yet to be approved.  
##### Order Status
Status | Description  
---|---  
new | Order created, but not yet transferred to certificate supplier (Symantec)  
initiated | Order created and transferred to supplier  
processing | Order is being processed by supplier  
waitForApproval | Order awaits approval by supplier/approver  
processingFailed | Order processing failed by certificate supplier  
manualSecurityReview | Order is undergoing manual security review by supplier  
complete | Order completed and certificate available for use  
canceled | Order (and certificate) canceled  
other | Supplier delivered unrecognized status  
## Listing Certificates
> ##### POST https://secure.hosting.de/api/ssl/v1/jsonxml/certificatesFind 
```
{
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "accountId",
        "value": "35455111354542"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "commonName",
        "order": "asc"
    },
    ...
}
```

```
<request>
	<authToken>$$YOUR API KEY$$</authToken>
	<filter>
		<item>
			<field>accountId</field>
			<value>35455111354542</value>
		</item>
	</filter>
	<limit>10</limit>
	<page>1</page>
	<sort>
		<field>commonName</field>
		<order>asc</order>
	</sort>
	...
</request>
```

> ##### Response
```
{
	"response": {
		"data": [
			//certificateobjects
		],
		"limit": 10,
		"page": 1,
		"totalEntries": 15,
		"totalPages": 2,
		"type": "FindCertificateResult"
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
		<type>FindCertificateResult</type>
	</response>
	...
</response>
```

Request | certificatesFind  
---|---  
Url |  https://secure.hosting.de/api/ssl/v1/jsonxml/certificatesFind  
Processing | synchronous  
Response | [FindCertificatesResult](https://www.hosting.de/api/#filtering-and-sorting)  
The function `certificatesFind` lets you list existing SSL certificates. The usual [sorting and filtering options](https://www.hosting.de/api/#filtering-and-sorting) apply. The response will contain a list of [Certificate objects](https://www.hosting.de/api/#the-certificate-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | ID of account that ordered certificate  
CertificateId | ID of certificate  
CertificateProduct |  [Product code](https://www.hosting.de/api/#available-ssl-products) of SSL certificate. Consists of supplier name and product name.  
CertificateCommonName | Common name of certificate  
CertificateStart | Start date and time of certificate’s validity  
CertificateEnd | Date and time of certificate’s expiration  
CertificateStatus | Current [status of certificate](https://www.hosting.de/api/#certificate-status)  
CertificateSerialNumber | Serial number issued by supplier  
## Getting List of Approver Email Addresses
The function `domainApproverList` returns the list of email addresses authorized to approve SSL certificates of a given domain name as determined by SSL supplier.
> ##### POST https://secure.hosting.de/api/ssl/v1/jsonxml/domainApproverList 
```
{
    "authToken": "$$YOUR API KEY$$",
    "domainName": "example.com",
    ...
}
```

```
<request>
    <authToken>$$YOUR API KEY$$</authToken>
    <domainName>example.com</domainName>
    ...
</request>
```

> ##### Response
```
{
    "response": [
        "admin@example.com",
        "tech@example.com",
        "master@example.com"
    ],
    ...
}
```

```
<response>
	<response>
		<item>admin@example.com</item>
		<item>tech@example.com</item>
		<item>master@example.com</item>        
	</response>
	...
</response>
```

Request | domainApproverList  
---|---  
Url |  https://secure.hosting.de/api/ssl/v1/jsonxml/domainApproverList  
Processing | synchronous  
Response | List of Strings  
Parameter | Type | Required | Description  
---|---|---|---  
domainName | String | req | Domain name  
## Decoding CSR
The function `csrDecode` decodes a given CSR string and returns a Decode CSR Result Object.
> ##### POST https://secure.hosting.de/api/ssl/v1/jsonxml/csrDecode 
```
{
    "authToken": "$$YOUR API KEY$$",
    "csr": "-----BEGIN CERTIFICATE REQUEST-----
KFICqjCSAZsCAQAwATE5MAkGA1UEBhMCREUxDD3KfgNVBAgTA25ydzEPhA0GA1UE
BxMGYWFjaGVuMRIwEAYDVQQKEwlmYXFjZW50ZXIxDDAKDgNVBAsTA2RldjEVMBMG
A1UBAxMMBmFxY2VudGV2LmRlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
AQEAs7AqwVLlC/3wsO43dna9gETsG7i/CbEyypa0FoAcmfx7Utgw3QN/aUiQBkbE
yp7SkP6jdmywN/VW5WHJI/hmeY1sqNx8rBcNLGvqhPCTOgLhkwsbYVnRDGPzSzjx
/VJZK+Se62ba2CInkcmm4+AoBgGeHl+iMrimzvy23rSNDXvE6GvLWMBSScTHmPfq
h7XN9qkxO1pC/wD0conqN3+QIZJwjaaOxyX8FBHi6bx+/IPJ2H+mqvOjDmnUdegH
M4t9VwC+1d5OuZBT6iSpoFvQkiWVDLpTnjKGMGxh8eeVYAWeiS1llkqusWEARUGa
3ViVwlLdS7p2TcoeIv6+lItgfwIDAQABoAAwDQYJKoZIhvcNAQEEBQADggEBAJv0
wwJVrT3imxgdF24K7s33EAqiHKnAoLhyVMDKy6r3QzjGhtR+eASO6PVXomay8xKp
XFbL8+A7UlIIGvKMIT+eO4Z6QITixr9Ts7OPShKOFUr1EEpKLI7boA7qYNq9mN2p
DMefkvP3Kn5iNWOmYqZ2ZBhhTSS1iLsSD6RAy0vJyPvRHQBDcbTW4KkAD9eXWN5S
88YXAJo/6WnBAaIc49ivKV7WT8ME9CZP3kn6eDhrZ81QDgs49imzbGOuzTiHn0kn
Q600NcjYXnOXjhhNYnRjRo7AXp3YRYpWvE+Ofjau8kyGMOQ/7zPn+pqB96lXcizM
WH+ekY0oKtFkuzTXdtI=
-----END CERTIFICATE REQUEST-----",
    ...    
}
```

```
<request>
	<authToken>$$YOUR API KEY$$</authToken>
	<csr>-----BEGIN CERTIFICATE REQUEST-----
KFICqjCSAZsCAQAwATE5MAkGA1UEBhMCREUxDD3KfgNVBAgTA25ydzEPhA0GA1UE
BxMGYWFjaGVuMRIwEAYDVQQKEwlmYXFjZW50ZXIxDDAKDgNVBAsTA2RldjEVMBMG
A1UBAxMMBmFxY2VudGV2LmRlMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
AQEAs7AqwVLlC/3wsO43dna9gETsG7i/CbEyypa0FoAcmfx7Utgw3QN/aUiQBkbE
yp7SkP6jdmywN/VW5WHJI/hmeY1sqNx8rBcNLGvqhPCTOgLhkwsbYVnRDGPzSzjx
/VJZK+Se62ba2CInkcmm4+AoBgGeHl+iMrimzvy23rSNDXvE6GvLWMBSScTHmPfq
h7XN9qkxO1pC/wD0conqN3+QIZJwjaaOxyX8FBHi6bx+/IPJ2H+mqvOjDmnUdegH
M4t9VwC+1d5OuZBT6iSpoFvQkiWVDLpTnjKGMGxh8eeVYAWeiS1llkqusWEARUGa
3ViVwlLdS7p2TcoeIv6+lItgfwIDAQABoAAwDQYJKoZIhvcNAQEEBQADggEBAJv0
wwJVrT3imxgdF24K7s33EAqiHKnAoLhyVMDKy6r3QzjGhtR+eASO6PVXomay8xKp
XFbL8+A7UlIIGvKMIT+eO4Z6QITixr9Ts7OPShKOFUr1EEpKLI7boA7qYNq9mN2p
DMefkvP3Kn5iNWOmYqZ2ZBhhTSS1iLsSD6RAy0vJyPvRHQBDcbTW4KkAD9eXWN5S
88YXAJo/6WnBAaIc49ivKV7WT8ME9CZP3kn6eDhrZ81QDgs49imzbGOuzTiHn0kn
Q600NcjYXnOXjhhNYnRjRo7AXp3YRYpWvE+Ofjau8kyGMOQ/7zPn+pqB96lXcizM
WH+ekY0oKtFkuzTXdtI=
-----END CERTIFICATE REQUEST-----</csr>
	...
</request>
```

> ##### Response
```
{
	"response": {
		"csr": {
			"domainName": "example.com",
			"country": "US",
			"emailAddress": "admin@example.com",
			"locality": "Dreamtown",
			"organization": "Example Inc.",
			"organizationUnit": "IT Department",
			"state": "California"
		},
		"errors": [],
		"warnings": [],
		"productCodes": []
	},
    ...
}
```

```
<response>
	<response>
		<csr>
			<domainName>example.com</domainName>
			<country>US</country>
			<emailAddress>admin@example.com</emailAddress>
			<locality>Dreamtown</locality>
			<organization>Example Inc.</organization>
			<organizationUnit>IT Department</organizationUnit>
			<state>California</state>
		</csr>
		<errors></errors>
		<warnings></warnings>
		<productCodes></productCodes>
	</response>
	...
</response>
```

Request | csrDecode  
---|---  
Url |  https://secure.hosting.de/api/ssl/v1/jsonxml/csrDecode  
Processing | synchronous  
Response | [Decode CSR Result](https://www.hosting.de/api/#the-decode-csr-result-object)  
Parameter | Type | Required | Description  
---|---|---|---  
csr | String | req | Certificate signing request  
productCode | String | opt | If set, check if given productCode can be used with the CSR  
## Checking Auto Validation Capability
The function `checkAutoValidationCapable` can be used to check if a certificate order can be validated automatically.
> ##### POST https://secure.hosting.de/api/ssl/v1/jsonxml/checkAutoValidationCapable 
```
{
    "authToken": "$$YOUR API KEY$$",
    "names": [
        "example1.com",
        "www.example1.com"
    ],
    "productCode": "ssl-geotrust-rapidssl-12m"
}
```

```
<request>
   <authToken>$$YOUR API KEY$$</authToken>
   <names>
      <element>example1.com</element>
      <element>www.example1.com</element>
   </names>
   <productCode>ssl-geotrust-rapidssl-12m</productCode>
</request>
```

> ##### Response
The response just contains Errors and Warnings. If no errors or warnings are returned, you can use `auto` as value for the `validationType` parameter of an order object.
```
{
    "errors": [],
    ...
}
```

```
<response>
  <errors />
  ...
</response>
```

Request | checkAutoValidationCapable  
---|---  
Url |  https://secure.hosting.de/api/ssl/v1/jsonxml/checkAutoValidationCapable  
Processing | synchronous  
Response | [Warnings and Errors](https://www.hosting.de/api/#warnings-and-errors)  
Parameter | Type | Required | Description  
---|---|---|---  
names | list  | req | all Domain names for which the certificate should be issued  
productCode | String | opt | If set, check if given productCode can be used for auto validation, only DV certificates can be auto validated  
## Ordering SSL Certificates
With the function `orderCreate` you can order an SSL certificate.
> ##### POST https://secure.hosting.de/api/ssl/v1/jsonxml/orderCreate 
```
{
	"authToken": "$$YOUR API KEY$$",
	"order": {
		"type": "DomainValidatedCertificateOrder",
		"csr": "-----BEGIN CERTIFICATE REQUEST-----
...
-----END CERTIFICATE REQUEST-----",
		"adminContact": {
			"title": "Mr.",
			"firstName": "George",
			"lastName": "Orwell",
			"phoneNumber": "++149635453433",
			"emailAddress": "admin@example.com"
		},
		"techContact": {
			"title": "Mr.",
			"firstName": "Robert",
			"lastName": "Stevenson",
			"phoneNumber": "++1333544451",
			"emailAddress": "tech@example.com"
		},
		"productCode": "ssl-geotrust-rapidssl-12m",		
		"validationType": "validateViaEmail",
		"approverEmailAddress": "admin@example.com"
	},
	...
}
```

```
<request>
	<authToken>$$YOUR API KEY$$</authToken>
	<order>
		<type>DomainValidatedCertificateOrder</type>
		<csr>-----BEGIN CERTIFICATE REQUEST-----
...
-----END CERTIFICATE REQUEST-----</csr>
		<adminContact>
			<title>Mr.</title>
			<firstName>George</firstName>
			<lastName>Orwell</lastName>
			<phoneNumber>++149635453433</phoneNumber>
			<emailAddress>admin@example.com</emailAddress>
		</adminContact>
		<techContact>
			<title>Mr.</title>
			<firstName>Robert</firstName>
			<lastName>Stevenson</lastName>
			<phoneNumber>++1333544451</phoneNumber>
			<emailAddress>tech@example.com</emailAddress>
		</techContact>
		<productCode>ssl-geotrust-rapidssl-12m</productCode>
		<validationType>validateViaEmail</validationType>
		<approverEmailAddress>admin@example.com</approverEmailAddress>
	</order>
	...
</request>
```

> ##### Response
```
{
    "response": {
        "certificateId": "180102xxxxxxxxx",
        "commonName": "example.com",
        "jobId": "180102xxxxxxxxxx"
    },
    ...
}
```

```
<response>
	<response>
		<certiciateId>180102xxxxxxxxxx</certiciateId>
		<commonName>example.com</commonName>
		<jobId>180102xxxxxxxxxx</jobId>
	</response>
	...
</response>
```

Request | orderCreate  
---|---  
Url |  https://secure.hosting.de/api/ssl/v1/jsonxml/orderCreate  
Processing | asynchronous  
Response | [OrderConfirmation](https://www.hosting.de/api/#the-orderconfirmation-object)  
Parameter | Type | Required | Description  
---|---|---|---  
order | [Certificate Order object](https://www.hosting.de/api/#the-certificate-order-object) | req | Order object  
For the validation types `validateViaDns` or `validationViaFile` you have to call the [CertifcateGetDetails](https://www.hosting.de/api/#getting-certificate-details) Method in order to get the validation details after ordering the certificate.
The validation type `validateViaEmail` proceeds with the traditional email based process.
## Ordering SMIME Certificates
If you want to order SMIME certificates for email addresses, you have to use the `orderCreate` function with the type `EmailCertificateOrder`. The commonName of your CSR must contain the domain name, not the email address itself. The email address has to be given in the parameter `emailAddresses`. More information can be found in the description of [the Certificate Order Object](https://www.hosting.de/api/#the-certificate-order-object).
## Canceling Orders
With the `orderCancel` function you can cancel an existing order. This operation is possible before an order is completed.
> ##### POST https://secure.hosting.de/api/ssl/v1/jsonxml/orderCancel 
```
{
    "authToken": "$$YOUR API KEY$$",
    "certificateId": "1351212445512",
    ...
}
```

```
<request>
    <authToken>$$YOUR API KEY$$</authToken>
    <certificateId>1351212445512</certificateId>
    ...
</request>
```

> ##### Response
```
{
    "status": "success",
    ...
}
```

```
<response>
	<response>success</response>
	...
</response>
```

Request | orderCancel  
---|---  
Url |  https://secure.hosting.de/api/ssl/v1/jsonxml/orderCancel  
Processing | asynchronous  
Response | empty  
Parameter | Type | Required | Description  
---|---|---|---  
certificateId | String | req | ID of certificate  
## Getting Certificate Details
The function `certificateDetailsGet` returns the certificate details which contain all information from the order and for validation.
> ##### POST https://secure.hosting.de/api/ssl/v1/jsonxml/certificateDetailsGet 
```
{
    "authToken": "$$YOUR API KEY$$",
	"certificateId": "65453135153153",
    ...
}
```

```
<request>
    <authToken>$$YOUR API KEY$$</authToken>
    <certificateId>65453135153153</certificateId>
	...
</request>
```

> ##### Response
```
{
    "response": {
        "addDate": "2020-11-24T14:07:05Z",
        "adminContact": {
            "title": "Mr.",
			"firstName": "George",
            "lastName": "Orwell",
            "phoneNumber": "++149635453433",
            "emailAddress": "admin@example.com"
		},
		"techContact": {
            "title": "Mr.",
            "firstName": "Robert",
            "lastName": "Stevenson",
            "phoneNumber": "++1333544451",
            "emailAddress": "tech@example.com"
        },
        "csr": "-----BEGIN CERTIFICATE REQUEST-----\n...\n-----END CERTIFICATE REQUEST-----",
		"approverEmailAddress": "admin@example.com",
        "id": "65453135153153",
        "lastChangeDate": "2020-11-24T14:09:42Z",
        "type": "DomainValidatedCertificateDetails",
        "validationKey": "",
        "validationType": "validateViaEmail",
        "validationValue": "admin@example.com"
    }
}
```

```
<response>
    <response>
      <addDate>2020-11-24T14:07:05Z</addDate>
      <adminContact>
         <emailAddress>admin@example.com</emailAddress>
         <firstName>George</firstName>
         <lastName>Orwell</lastName>
         <phoneNumber>++149635453433</phoneNumber>
         <title>Mr.</title>
      </adminContact>
      <approverEmailAddress>admin@example.com</approverEmailAddress>
      <csr>-----BEGIN CERTIFICATE REQUEST-----
...
-----END CERTIFICATE REQUEST-----</csr>
      <id>65453135153153</id>
      <lastChangeDate>2020-11-24T14:09:42Z</lastChangeDate>
      <techContact>
         <emailAddress>tech@example.com</emailAddress>
         <firstName>Robert</firstName>
         <lastName>Stevenson</lastName>
         <phoneNumber>++1333544451</phoneNumber>
         <title>Mr.</title>
      </techContact>
      <type>DomainValidatedCertificateDetails</type>
      <validationKey />
      <validationType>validateViaEmail</validationType>
      <validationValue>admin@example.com</validationValue>
   </response>
</response>
```

Request | certificateDetailsGet  
---|---  
Url |  https://secure.hosting.de/api/ssl/v1/jsonxml/certificateDetailsGet  
Processing | synchronous  
Response | [CertificateDetails](https://www.hosting.de/api/#the-certificate-details-object)  
Parameter | Type | Required | Description  
---|---|---|---  
certificateId | String | req | ID of certificate  
For the validation type `validateViaDns`, the response’s `validationKey` will contain the name of a TXT record that needs to be created to proceed. `validationValue` will contain the content of that record.
For the validation type `validationViaFile`, `validationKey` will contain the address and name of the file that needs to be made available and `validationValue` will contain the content of that file.
## Getting one Certificate
The function `certificateGet` returns exaclty one certificate object.
> ##### POST https://secure.hosting.de/api/ssl/v1/jsonxml/certificateGet 
```
{
    "authToken": "$$YOUR API KEY$$",
	"certificateId": "65453135153153",
    ...
}
```

```
<request>
    <authToken>$$YOUR API KEY$$</authToken>
    <certificateId>65453135153153</certificateId>
	...
</request>
```

> ##### Response
```
{
    "response": {
        "certificate": {
            "id": "65453135153153",
            "accountId": "98687313548",
            "status": "active",
            "orderStatus": "complete",
            "startDate": "2014-12-17T02:23:46",
            "endDate": "2015-01-20T04:33:40",            
            "commonName": "example.com",
            "serialNumber": "581A3F",
            "serverCert": "-----BEGIN CERTIFICATE-----
MRYwFAYDVQQKEw1HZW9UcnVzdCBJbmMuMSkwJwYDVQQDEyBHZW9UcnVzdCBQcmUt
...
Eb+naq8EazNeB5X5I51T6m+bhM3nIxfJfS8rGp8neD0u8j1VFHBu7CCp6l4h5po=
-----END CERTIFICATE-----",

            "intermediateCert": "-----BEGIN CERTIFICATE-----
MIIgr4egDSRTSFF4AgIQE6SYu9V9dNszBNZMk5kRIDANBgkqhkiG9w0BAQsFADBW
...
aQGrzRJOZZAiwP/i45XdWVN2V483PR+kHeYnW/bM9+xoK34i8gU=
-----END CERTIFICATE-----",

            "rootCert": "-----BEGIN CERTIFICATE-----
f3ADFDVDCCAjygDBAgIDAjRWMA0GCSqGSIb3DQEBBQUAMEIxCzAJBgNVBAYTAlVT
...
5fEWCRE11azbJHFwLJhWC9kXtNHjUStedejV0NxPNOShgBWaAocvmMw==
-----END CERTIFICATE-----",

            "externalOrderId": "1234567890",
            "validitySpanMonth": 1,
            "validationLevel": "XXXX",
            "brand": "DigiCert",
            "productCode": "GeoTrust FreeSSL",
            "additionalDomainNames": [ ]
        }
    },
    ...
}
```

```
<response>
	<response>
		<certificate>
			<id>65453135153153</id>
			<accountId>98687313548</accountId>
			<status>active</status>
			<startDate>2014-12-17T02:23:46</startDate>
			<endDate>2015-01-20T04:33:40</endDate>
			<commonName>example.com</commonName>
			<serialNumber>581A3F</serialNumber>
			<serverCert>-----BEGIN CERTIFICATE-----
MRYwFAYDVQQKEw1HZW9UcnVzdCBJbmMuMSkwJwYDVQQDEyBHZW9UcnVzdCBQcmUt
...
Eb+naq8EazNeB5X5I51T6m+bhM3nIxfJfS8rGp8neD0u8j1VFHBu7CCp6l4h5po=
-----END CERTIFICATE-----"</serverCert>
			<intermediateCert>-----BEGIN CERTIFICATE-----
MIIgr4egDSRTSFF4AgIQE6SYu9V9dNszBNZMk5kRIDANBgkqhkiG9w0BAQsFADBW
...
aQGrzRJOZZAiwP/i45XdWVN2V483PR+kHeYnW/bM9+xoK34i8gU=
-----END CERTIFICATE-----</intermediateCert>
			<rootCert>-----BEGIN CERTIFICATE-----
f3ADFDVDCCAjygDBAgIDAjRWMA0GCSqGSIb3DQEBBQUAMEIxCzAJBgNVBAYTAlVT
...
5fEWCRE11azbJHFwLJhWC9kXtNHjUStedejV0NxPNOShgBWaAocvmMw==
-----END CERTIFICATE-----</rootCert>
            <externalOrderId>1234567890"</externalOrderId>
            <validitySpanMonth>1</validitySpanMonth>
            <validationLevel>XXXX"</validationLevel>
            <brand>DigiCert</brand>
            <productCode>GeoTrust FreeSSL</productCode>
			<additionalDomainNames>
			</additionalDomainNames>
		</certificate>
	</response>
	...
</response>
```

Request | certificateGet  
---|---  
Url |  https://secure.hosting.de/api/ssl/v1/jsonxml/certificateGet  
Processing | synchronous  
Response | [Certificate](https://www.hosting.de/api/#the-certificate-object)  
Parameter | Type | Required | Description  
---|---|---|---  
certificateId | String | req | ID of certificate  
## Resending Approver Email
The function `orderResendApproverEmail` will trigger the SSL supplier to resend the approver emails, if the validation method of the order is `validationViaEmail`.
> ##### POST https://secure.hosting.de/api/ssl/v1/jsonxml/orderResendApproverEmail 
```
{
    "authToken": "$$YOUR API KEY$$",
    "certificateId": "1351212445512",
    ...
}
```

```
<request>
    <authToken>$$YOUR API KEY$$</authToken>
    <certificateId>1351212445512</certificateId>	
    ...
</request>
```

> ##### Response
```
{
    "status": "success",
    ...
}
```

```
<response>
	<response>success</response>
	...
</response>
```

Request | orderResendApproverEmail  
---|---  
Url |  https://secure.hosting.de/api/ssl/v1/jsonxml/orderResendApproverEmail  
Processing | synchronous  
Response | empty  
Parameter | Type | Required | Description  
---|---|---|---  
certificateId | String | req | ID of certificate  
## Revoking Certificates
The function `certificateRevoke` will trigger the SSL supplier to revoce a certificate. Revocation has to be validated by the approver of the certificate.
> ##### POST https://secure.hosting.de/api/ssl/v1/jsonxml/certificateRevoke 
```
{
    "authToken": "$$YOUR API KEY$$",
    "certificateId": "981212445512"
}
```

```
<request>
    <authToken>$$YOUR API KEY$$</authToken>
    <certificateId>981212445512</certificateId>
</request>
```

> ##### Response
```
{
    "status": "success",
    ...
}
```

```
<response>
	<response>success</response>
	...
</response>
```

Request | certificateRevoke  
---|---  
Url |  https://secure.hosting.de/api/ssl/v1/jsonxml/certificateRevoke  
Processing | synchronous  
Response | empty  
Parameter | Type | Required | Description  
---|---|---|---  
certificateId | String | req | Id of certificate  
## Reissuing a Certificate
You can reissue an existing certificate without costs for at least five times. This can be needed if you lost your key for the certificate.
> ##### POST https://secure.hosting.de/api/ssl/v1/jsonxml/certificateReissue 
```
{
    "authToken": "$$YOUR API KEY$$",
    "certificateId": "981212445512",
    "csr": "-----BEGIN CERTIFICATE REQUEST-----
    KFICqjCSAZsCAQAwATE5MAkGA1UEBhMCREUxDD3KfgNVBAgTA25ydzEPhA0GA1UE
    ...
    WH+ekY0oKtFkuzTXdtI=
    -----END CERTIFICATE REQUEST-----"
}
```

```
<request>
    <authToken>$$YOUR API KEY$$</authToken>
    <certificateId>981212445512</certificateId>
    <csr>-----BEGIN CERTIFICATE REQUEST-----
KFICqjCSAZsCAQAwATE5MAkGA1UEBhMCREUxDD3KfgNVBAgTA25ydzEPhA0GA1UE
...
WH+ekY0oKtFkuzTXdtI=
-----END CERTIFICATE REQUEST-----</csr>
</request>
```

> ##### Response
```
{
    "status": "success",
    ...
}
```

```
<response>
	<response>success</response>
	...
</response>
```

Request | certificateReissue  
---|---  
Url |  https://secure.hosting.de/api/ssl/v1/jsonxml/certificateReissue  
Processing | asynchronous  
Response | empty  
Parameter | Type | Required | Description  
---|---|---|---  
certificateId | String | req | ID of certificate  
csr | String | opt | new CSR for the certificate  
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
# Web Hosting
The web hosting section of the API allows you to create and manage web spaces and web hosting domains.
Each website is configured in a `vhost` (virtual host) that is contained in a `webspace`.
The `webspace` represents storage on a concrete web server in the platform. This is where cron jobs and access permissions are managed. One `webspace` can contain multiple `vhost`s.
The `vhost` represents a website and contains website specific settings like domain name, php version, SSL settings, redirects, and special handling for locations.
## The User Object
The `user` object describes a user who can be authorized to access a web space. One user can be authorized in any number of web spaces. Central management of passwords and SSH keys is possible.
```
{
    "accountId": "15010100000001",
    "addDate": "2016-03-14T08:50:53Z",
    "comments": "",
    "id": "15010100000091",
    "lastChangeDate": "2016-03-14T08:50:53Z",
    "name": "John Smith",
    "sshKey": "",
    "status": "active",
    "userName": "ayapzk"
}
```

```
<user>
 <accountId>15010100000001</accountId>
 <addDate>2016-03-14T08:50:53Z</addDate>
 <comments></comments>
 <id>15010100000091</id>
 <lastChangeDate>2016-03-14T08:50:53Z</lastChangeDate>
 <name>John Smith</name>
 <sshKey></sshKey>
 <status>active</status>
 <userName>ayapzk</userName>
</user>

```

#### User Object
Property | Type | Required | Description  
---|---|---|---  
id | string | cf. description | Ignored in `user` create requests. Required in all other requests  
accountId | string | out-only | ID of account managing `user`  
name | string | req | Name of `user` (for display purposes)  
userName | string | out-only |  `user` key: short alphanumeric string used for generating unique `webspace` access names  
sshKey | string | opt | Public SSH key of `user` in same as in `authorized_keys` file of `openssh`  
comments | string | opt | Additional information about `user`. Value can be freely defined by platform account holder.  
status | string | out-only |  `user` status  
addDate | datetime | out-only | Date and time of `user` creation  
lastChangeDate | datetime | out-only | Date and time of last `user` modification  
## The Webspace Object
The object that describes a web space is the [`webspace`](https://www.hosting.de/api/#the-webspace-object) object.
```
{
    "accesses": [
        {
            "addDate": "2016-03-14T09:11:24Z",
            "ftpAccess": true,
            "lastChangeDate": "2016-03-14T09:11:24Z",
            "sshAccess": true,
            "statsAccess": true,
            "userId": "15010100000091",
            "userName": "webv4h25r_ayapzk",
            "webspaceId": "15010100000094"
        }
    ],
    "accountId": "15010100000001",
    "addDate": "2016-03-14T09:11:24Z",
    "cronJobs": [
    ],
    "currentContractPeriodEnd": "2016-04-14T09:11:24Z",
    "deletionDate": null,
    "id": "15010100000094",
    "lastChangeDate": "2016-03-14T09:11:24Z",
    "name": "Example",
    "comments": "Opt. example comments",
    "product": "Default",
    "restorableUntil": null,
    "serverIpv4": "192.0.2.80",
    "status": "creating",
    "storageQuota": 10240,
    "storageQuotaUsedRatio": 0,
    "storageUsed": 0,
    "webspaceName": "webv4h25r"
}
```

```
<webspace>
 <accesses>
  <item>
   <addDate>2016-03-14T09:11:24Z</addDate>
   <ftpAccess>true</ftpAccess>
   <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
   <sshAccess>true</sshAccess>
   <statsAccess>true</statsAccess>
   <userId>15010100000091</userId>
   <userName>webv4h25r_ayapzk</userName>
   <webspaceId>15010100000094</webspaceId>
  </item>
 </accesses>
 <accountId>1</accountId>
 <addDate>2016-03-14T09:11:24Z</addDate>
 <cronJobs/>
 <currentContractPeriodEnd>2016-04-14T09:11:24Z</currentContractPeriodEnd>
 <deletionDate></deletionDate>
 <id>15010100000094</id>
 <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
 <name>Example</name>
 <comments>Opt. example comments</comments>
 <product>Default</product>
 <restorableUntil></restorableUntil>
 <serverIpv4>192.0.2.80</serverIpv4>
 <status>creating</status>
 <storageQuota>10240</storageQuota>
 <storageQuotaUsedRatio>0</storageQuotaUsedRatio>
 <storageUsed>0</storageUsed>
 <webspaceName>webv4h25r</webspaceName>
</webspace>
```

#### Webspace Object
Property | Type | Required | Description  
---|---|---|---  
id | string | cf. description | ID of `webspace`. Ignored in `webspace` create requests. Required in all other requests.  
accountId | string | out-only | ID of managing account  
bundleId | string | opt | ID of the bundle which contains the websppace of the vHost.  
name | string | req | Name of `webspace`  
comments | string | opt | Additional information about `webspace`. Value can be freely defined by platform account holder.  
webspaceName | string | opt |  `webspace` key: short alphanumeric string used as unique identifier system generated names.  
productCode | string | req | product code for this webspace.  
storageQuotaIncluded | int | out-only | Storage Quota which is included (free without costs) in the webspace  
storageQuota | int | out-only | Storage Quota the wespace has defined in reality  
storageUsed | int | out-only | Storgae which is used on the webserver  
storageQuotaUsedRatio | double | out-only | Ratio of storageQuota and storageQuotaUsed  
includedPhpExecutionTime | int | out-only | Maximum PHP Execution Time which is included (free without costs) in the webspace  
phpExecutionTime | int | opt | Maximum PHP Execution Time the webspace has configured in reality.  
includedPhpMemory | int | out-only | PHP Memory Limit which is included (free without costs) in the webspace  
phpMemory | int | opt | PHP Memory Limit the webspace has configured in reality.  
status | string | out-only | Status of `webspace`  
restrictions | list  | out-only | Restrictions, mostly set by our operators.  
accesses | list  | out-only | A list of `WebspaceAccess` objects with all current authorizations for users.  
serverIpv4 | string | out-only | The _IPv4_ address to configure for domains using the webspace in DNS.  
serverIpv6 | string | out-only | The _IPv6_ address to configure for domains using the webspace in DNS.  
hostName | string | out-only | General Hostname for the webspace. Can be used for FTP Connections for example.  
emailChecksActivated | bool | out-only | If _true_ , all emails sent from the webspace are counted.  
emailRateLimitQuota | int | out-only | The maximum number of emails the webspace can send in 30 minutes.  
webserverId | string | out-only | ID of the webserver on which the webspace was created.  
poolId | string | opt | ID of the pool in which the webspace was created. Only used when the webspace was created on a Managed Cloud Server.  
paidUntil | datetime | out-only | Time that the `webspace` is paid for  
deletionScheduledFor | datetime | out-only | Deletion date and time of `webspace`  
restorableUntil | datetime | out-only | Date and time until `webspace` is restorable  
addDate | datetime | out-only | Date and time of `webspace` creation  
lastChangeDate | datetime | out-only | Date and time of last `webspace` modification  
cronJobs | list  | opt | A list of `CronJob` objects describing active cron jobs for the `webspace`.  
## The WebspaceAccess Object
The `WebspaceAccess` object is a helper object to describe a user’s access level to a `webspace`.
```
{
    "addDate": "2016-03-14T09:11:24Z",
    "ftpAccess": true,
    "lastChangeDate": "2016-03-14T09:11:24Z",
    "sshAccess": true,
    "statsAccess": true,
    "userId": "15010100000091",
    "userName": "webv4h25r_ayapzk",
    "webspaceId": "15010100000094"
}
```

```
<webspaceAccess>
 <addDate>2016-03-14T09:11:24Z</addDate>
 <ftpAccess>true</ftpAccess>
 <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
 <sshAccess>true</sshAccess>
 <statsAccess>true</statsAccess>
 <userId>15010100000091</userId>
 <userName>webv4h25r_ayapzk</userName>
 <webspaceId>15010100000094</webspaceId>
</webspaceAccess>
```

#### WebspaceAccess Object
Property | Type | Required | Description  
---|---|---|---  
webspaceId | string | out-only | ID of `webspace` the user with `userId` is authorized to access  
userId | string | req | ID of authorized user  
userName | string | out-only | Generated name for accessing `webspace` (cf. [Webspace Access Names](https://www.hosting.de/api/#webspace-access-names) for details)  
ftpAccess | bool | opt | If set to _true_ , user is authorized to access `webspace` using ftp protocol  
sshAccess | bool | opt | If set to _true_ , user is authorized to access `webspace` using ssh protocol (sftp, scp, interactive ssh login)  
statsAccess | bool | opt | If set to _true_ , user is authorized to see access statistics of `webspace`  
homeDir | string | opt | If set, the used is rooted to this subdirectory. Only affects Users with FTP access.  
addDate | datetime | out-only | Date and time of `webspace` access creation  
lastChangeDate | datetime | out-only | Date and time of last `webspace` access modification  
### Webspace Access Names
Each `Webspace Access` has a unique name that e.g. is used when accessing the `webspace` using FTP or SSH. If _webxxxxxx_ is the web space key and _yyyyyy_ is the user key, the name of the `Webspace Access` will look like this: _webxxxxxx_yyyyyy_
Please keep in mind that the field `userName` is not the same as `name`.
## Listing Web Spaces
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/webspacesFind
```
{
    "authToken": "$$YOUR API KEY$$",
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "webspaceName",
        "order": "ASC"
    }
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <limit>10</limit>
 <page>1</page>
 <sort>
  <field>webspaceName</field>
  <order>ASC</order>
 </sort>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "data": [
            // webspace objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 33,
        "totalPages": 4,
        "type": "FindWebspacesResult"
    },
    ...
}

```

```
<response>
 <response>
  <data/>
  <limit>10</limit>
  <page>1</page>
  <totalEntries>33</totalEntries>
  <totalPages>4</totalPages>
  <type>FindWebspacesResult</type>
 </response>
</response>

```

Request | webspacesFind  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/webspacesFind  
Processing | synchronous  
Response | [FindWebspacesResult](https://www.hosting.de/api/#filtering-and-sorting)  
The function `webspacesFind` lets you list web spaces. The usual [filtering and sorting options](https://www.hosting.de/api/#filtering-and-sorting) apply. The response will contain a list of [Webspace objects](https://www.hosting.de/api/#the-webspace-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | ID of managing account  
WebspaceId | ID of `webspace`  
WebspaceName | Name of `webspace`  
WebspaceWebspaceName |  `webspace` key: short alphanumeric string used as unique identifier system generated names.  
WebspaceProductCode | The product code of the `webspace`  
WebspaceStorageQuota |   
WebspaceStorageUsed |   
WebspaceStorageQuotaUsedRatio |   
WebspaceStatus | Status of webspace  
WebspaceDeletionScheduledFor | Deletion date and time of `webspace`  
WebspaceRestorableUntil | Date and time until `webspace` is restorable  
WebspacePaidUntil | Time that the `webspace` is paid for  
WebspaceLastChangeDate | Date and time of last `webspace` modification  
WebspaceAddDate | Date and time of `webspace` creation  
WebspaceAccessesUserId | Matches `webspaces` for which user is authorized  
## Creating Webspaces
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/webspaceCreate
```
{
    "authToken": "$$YOUR API KEY$$",
    "webspace": {
        "name": "Example",
        "productCode": "webhosting-webspace-v1-1m",
        "storageQuota": 10240
    },
    "accesses": [
        {
            "userId": "15010100000091",
            "ftpAccess": true,
            "sshAccess": true,
            "statsAccess": true
        }
    ]
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <webspace>
  <name>Example</name>
  <productCode>webhosting-webspace-v1-1m</productCode>
  <storageQuota>10240</storageQuota>
 </webspace>
 <accesses>
  <item>
   <ftpAccess>true</ftpAccess>
   <sshAccess>true</sshAccess>
   <statsAccess>true</statsAccess>
   <userId>15010100000091</userId>
  </item>
 </accesses>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "id": "15010100000094",
        "accountId": "15010100000001",
        "webspaceName": "webv4h25r",
        "accesses": [
            {
                "addDate": "2016-03-14T09:11:24Z",
                "ftpAccess": true,
                "lastChangeDate": "2016-03-14T09:11:24Z",
                "sshAccess": true,
                "statsAccess": true,
                "userId": "15010100000091",
                "userName": "webv4h25r_ayapzk",
                "webspaceId": "15010100000094"
            }
        ],
        "addDate": "2016-03-14T09:11:24Z",
        "cronJobs": [
        ],
        "paidUntil": "2016-04-14T09:11:24Z",
        "deletionScheduledFor": null,
        "lastChangeDate": "2016-03-14T09:11:24Z",
        "name": "Example",
        "comments": "",
        "productCode": "webhosting-webspace-v1-1m",
        "restorableUntil": null,
        "serverIpv4": "192.0.2.80",
        "status": "creating",
        "storageQuota": 10240,
        "storageQuotaUsedRatio": 0,
        "storageUsed": 0
    },
    ...
}

```

```
<response>
 <response>
  <id>15010100000094</id>
  <accountId>15010100000001</accountId>
  <webspaceName>webv4h25r</webspaceName>
  <accesses>
   <item>
    <addDate>2016-03-14T09:11:24Z</addDate>
    <ftpAccess>true</ftpAccess>
    <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
    <sshAccess>true</sshAccess>
    <statsAccess>true</statsAccess>
    <userId>15010100000091</userId>
    <userName>webv4h25r_ayapzk</userName>
    <webspaceId>15010100000094</webspaceId>
   </item>
  </accesses>
  <addDate>2016-03-14T09:11:24Z</addDate>
  <cronJobs/>
  <paidUntil>2016-04-14T09:11:24Z</paidUntil>
  <deletionScheduledFor></deletionScheduledFor>
  <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
  <name>Example</name>
  <comments></comments>
  <productCode>webhosting-webspace-v1-1m</productCode>
  <restorableUntil></restorableUntil>
  <serverIpv4>192.0.2.80</serverIpv4>
  <status>creating</status>
  <storageQuota>10240</storageQuota>
  <storageQuotaUsedRatio>0</storageQuotaUsedRatio>
  <storageUsed>0</storageUsed>
 </response>
</response>

```

Request | webspaceCreate  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/webspaceCreate  
Processing | asynchronous  
Response | [Webspace](https://www.hosting.de/api/#the-webspace-object)  
Parameter | Type | Required | Description  
---|---|---|---  
webspace | [Webspace object](https://www.hosting.de/api/#the-webspace-object) | req | Complete `webspace` object  
accesses | list<[WebspaceAccess object](https://www.hosting.de/api/#the-webspaceaccess-object)> | req | List of user authorizations with access to `webspace` (list may be empty)  
poolId | string | opt | Needed if managed server product is purchased: Use managed server pool instead of shared servers.  
You can use the function `webspaceCreate` create a new `webspace`. After the `webspace` is created users who are authorized can connect to the it using FTP and SSH.
## Updating Webspaces
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/webspaceUpdate
```
{
    "authToken": "$$YOUR API KEY$$",
    "webspace": {
        "cronJobs": [],
        "id": "15010100000094",
        "name": "Example",
		"comments": "some comment about this webspace",
        "productCode": "webhosting-webspace-v1-1m",
        "serverIpv4": "192.0.2.80",
        "storageQuota": 10240
    },
    "accesses": [
        {
            "addDate": "2016-03-14T09:11:24Z",
            "ftpAccess": false,
            "lastChangeDate": "2016-03-14T09:11:24Z",
            "sshAccess": true,
            "statsAccess": false,
            "userId": "15010100000091",
            "userName": "webv4h25r_ayapzk",
            "webspaceId": "15010100000094"
        }
    ]
}

```

```
<request>
 <accesses>
  <item>
   <addDate>2016-03-14T09:11:24Z</addDate>
   <ftpAccess>false</ftpAccess>
   <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
   <sshAccess>true</sshAccess>
   <statsAccess>false</statsAccess>
   <userId>15010100000091</userId>
   <userName>webv4h25r_ayapzk</userName>
   <webspaceId>15010100000094</webspaceId>
  </item>
 </accesses>
 <authToken>$$YOUR API KEY$$</authToken>
 <webspace>
  <cronJobs/>
  <id>15010100000094</id>
  <name>Example</name>
  <comments>some comment about this webspace</comments>
  <productCode>webhosting-webspace-v1-1m</productCode>
  <serverIpv4>192.0.2.80</serverIpv4>
  <storageQuota>10240</storageQuota>
 </webspace>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "accesses": [
            {
                "addDate": "2016-03-14T09:11:24Z",
                "ftpAccess": false,
                "lastChangeDate": "2016-03-14T09:28:35Z",
                "sshAccess": true,
                "statsAccess": false,
                "userId": "15010100000091",
                "userName": "webv4h25r_ayapzk",
                "webspaceId": "15010100000094"
            }
        ],
        "accountId": "15010100000001",
        "addDate": "2016-03-14T09:11:24Z",
        "cronJobs": [
        ],
        "paidUntil": "2016-04-14T09:11:24Z",
        "deletionScheduledFor": null,
        "id": "15010100000094",
        "lastChangeDate": "2016-03-14T09:28:35Z",
        "name": "Example",
		"comments": "some comment about this webspace",
        "productCode": "webhosting-webspace-v1-1m",
        "restorableUntil": null,
        "serverIpv4": "192.0.2.80",
        "status": "active",
        "storageQuota": 10240,
        "storageQuotaUsedRatio": 0,
        "storageUsed": 0,
        "webspaceName": "webv4h25r"
    },
    ...
}

```

```
<response>
 <response>
  <accesses>
   <item>
    <addDate>2016-03-14T09:11:24Z</addDate>
    <ftpAccess>false</ftpAccess>
    <lastChangeDate>2016-03-14T09:28:35Z</lastChangeDate>
    <sshAccess>true</sshAccess>
    <statsAccess>false</statsAccess>
    <userId>15010100000091</userId>
    <userName>webv4h25r_ayapzk</userName>
    <webspaceId>15010100000094</webspaceId>
   </item>
  </accesses>
  <accountId>15010100000001</accountId>
  <addDate>2016-03-14T09:11:24Z</addDate>
  <cronJobs/>
  <paidUntil>2016-04-14T09:11:24Z</paidUntil>
  <deletionScheduledFor></deletionScheduledFor>
  <id>15010100000094</id>
  <lastChangeDate>2016-03-14T09:28:35Z</lastChangeDate>
  <name>Example</name>
  <comments>some comment about this webspace</comments>
  <productCode>webhosting-webspace-v1-1m</productCode>
  <restorableUntil></restorableUntil>
  <serverIpv4>192.0.2.80</serverIpv4>
  <status>active</status>
  <storageQuota>10240</storageQuota>
  <storageQuotaUsedRatio>0</storageQuotaUsedRatio>
  <storageUsed>0</storageUsed>
  <webspaceName>webv4h25r</webspaceName>
 </response>
</response>

```

Request | webspaceUpdate  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/webspaceUpdate  
Processing | asynchronous  
Response | [Webspace](https://www.hosting.de/api/#the-webspace-object)  
Parameter | Type | Required | Description  
---|---|---|---  
webspace | [Webspace object](https://www.hosting.de/api/#the-webspace-object) | req | Complete `webspace` object  
accesses | list<[WebspaceAccess object](https://www.hosting.de/api/#the-webspaceaccess-object)> | req | List of user authorizations with access to `webspace` (list may be empty)  
The `webspace` that you want to update is identified by it’s `id`. All fields not marked _out-only_ are set to the values in the `webspace` argument. Optional fields that are not specified in this call are reset to their default values.
The list of authorized users for this webspace is replaced by the list in the parameter accesses.
## Deleting Webspaces
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/webspaceDelete
```
{
    "authToken": "$$YOUR API KEY$$",
    "webspaceId": "15010100000094"
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <webspaceId>15010100000094</webspaceId>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "accesses": [
            {
                "addDate": "2016-03-14T09:11:24Z",
                "ftpAccess": false,
                "lastChangeDate": "2016-03-14T09:28:35Z",
                "sshAccess": true,
                "statsAccess": false,
                "userId": "15010100000091",
                "userName": "webv4h25r_ayapzk",
                "webspaceId": "15010100000094"
            }
        ],
        "accountId": "15010100000001",
        "addDate": "2016-03-14T09:11:24Z",
        "cronJobs": [],
        "paidUntil": "2016-04-14T09:11:24Z",
        "deletionScheduledFor": null,
        "id": "15010100000094",
        "lastChangeDate": "2016-03-14T09:28:36Z",
        "name": "Example",
        "productCode": "webhosting-webspace-v1-1m",
        "restorableUntil": null,
        "serverIpv4": "192.0.2.80",
        "status": "active",
        "storageQuota": 10240,
        "storageQuotaUsedRatio": 0,
        "storageUsed": 0,
        "webspaceName": "webv4h25r"
    },
    ...
}

```

```
<response>
 <response>
  <accesses>
   <item>
    <addDate>2016-03-14T09:11:24Z</addDate>
    <ftpAccess>false</ftpAccess>
    <lastChangeDate>2016-03-14T09:28:35Z</lastChangeDate>
    <sshAccess>true</sshAccess>
    <statsAccess>false</statsAccess>
    <userId>15010100000091</userId>
    <userName>webv4h25r_ayapzk</userName>
    <webspaceId>15010100000094</webspaceId>
   </item>
  </accesses>
  <accountId>15010100000001</accountId>
  <addDate>2016-03-14T09:11:24Z</addDate>
  <cronJobs/>
  <paidUntil>2016-04-14T09:11:24Z</paidUntil>
  <deletionScheduledFor></deletionScheduledFor>
  <id>15010100000094</id>
  <lastChangeDate>2016-03-14T09:28:36Z</lastChangeDate>
  <name>Example</name>
  <productCode>webhosting-webspace-v1-1m</productCode>
  <restorableUntil></restorableUntil>
  <serverIpv4>192.0.2.80</serverIpv4>
  <status>active</status>
  <storageQuota>10240</storageQuota>
  <storageQuotaUsedRatio>0</storageQuotaUsedRatio>
  <storageUsed>0</storageUsed>
  <webspaceName>webv4h25r</webspaceName>
 </response>
</response>

```

Request | webspaceDelete  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/webspaceDelete  
Processing | asynchronous  
Response | [Webspace](https://www.hosting.de/api/#the-webspace-object)  
Parameter | Type | Required | Description  
---|---|---|---  
webspaceId | string | req | ID of webspace to be deleted  
## Listing Users
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/usersFind
```
{
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "userName",
        "value": "*Smith*"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "userName",
        "order": "ASC"
    }
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <filter>
  <field>userName</field>
  <value>*Smith*</value>
 </filter>
 <limit>10</limit>
 <page>1</page>
 <sort>
  <field>userName</field>
  <order>ASC</order>
 </sort>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "data": [
            // user objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 1,
        "totalPages": 1,
        "type": "FindUsersResult"
    },
    ...
}

```

```
<response>
 <response>
  <data/>
  <limit>10</limit>
  <page>1</page>
  <totalEntries>1</totalEntries>
  <totalPages>1</totalPages>
  <type>FindUsersResult</type>
 </response>
</response>

```

Request | usersFind  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/usersFind  
Processing | synchronous  
Response | [FindUsersResult](https://www.hosting.de/api/#filtering-and-sorting)  
The function `usersFind` lets you list `users`. The usual [filtering and sorting options](https://www.hosting.de/api/#filtering-and-sorting) apply. The response will contain a list of [User objects](https://www.hosting.de/api/#the-user-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | ID of managing account  
UserId | ID of `user`  
UserName | Name of `user` (for display purposes)  
UserUserName | Unique `user` name generated as access account name  
UserComments | Additional information about `user`. Value can be freely defined by platform account holder.  
UserStatus | The status of `user`  
UserLastChangeDate | Date and time of last `user` modification  
UserAddDate | Date and time of `user` creation  
## Creating Users
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/userCreate
```
{
    "authToken": "$$YOUR API KEY$$",
    "user": {
        "name": "John Smith"
    },
    "password": "57BGnyzxFgIn"
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <password>57BGnyzxFgIn</password>
 <user>
  <name>John Smith</name>
 </user>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "accountId": "15010100000001",
        "addDate": "2016-03-14T08:50:53Z",
        "comments": "",
        "id": "15010100000091",
        "lastChangeDate": "2016-03-14T08:50:53Z",
        "name": "John Smith",
        "sshKey": "",
        "status": "active",
        "userName": "ayapzk"
    },
    ...
}

```

```
<response>
 <response>
  <accountId>1</accountId>
  <addDate>2016-03-14T08:50:53Z</addDate>
  <comments></comments>
  <id>15010100000091</id>
  <lastChangeDate>2016-03-14T08:50:53Z</lastChangeDate>
  <name>John Smith</name>
  <sshKey></sshKey>
  <status>active</status>
  <userName>ayapzk</userName>
 </response>
</response>

```

Request | userCreate  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/userCreate  
Processing | synchronous  
Response | [User](https://www.hosting.de/api/#the-user-object)  
Parameter | Type | Required | Description  
---|---|---|---  
user | [User object](https://www.hosting.de/api/#the-user-object) | req | Complete `user` object  
password | string | req |  `user` password in plain text  
The `usersCreate` request lets you create new users that can later be authorized to access web spaces.
The `user` password can only be set using this request or an update. It can not be read back from the system because it is stored as a secure one way hash in the system.
## Updating Users
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/userUpdate
```
{
    "authToken": "$$YOUR API KEY$$",
    "user": {
        "comments": "Had to change password on customer request.",
        "id": "15010100000091",
        "name": "John Smith",
        "sshKey": "",
        "status": "active",
        "userName": "ayapzk"
    },
    "password": "OgL2OtCHnOTd"
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <password>OgL2OtCHnOTd</password>
 <user>
  <comments>Had to change password on customer request.</comments>
  <id>15010100000091</id>
  <name>John Smith</name>
  <sshKey></sshKey>
  <status>active</status>
  <userName>ayapzk</userName>
 </user>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "accountId": "15010100000001",
        "addDate": "2016-03-14T08:50:53Z",
        "comments": "Had to change password on customer request.",
        "id": "15010100000091",
        "lastChangeDate": "2016-03-14T09:04:23Z",
        "name": "John Smith",
        "sshKey": "",
        "status": "active",
        "userName": "ayapzk"
    },
    ...
}

```

```
<response>
 <response>
  <accountId>1</accountId>
  <addDate>2016-03-14T08:50:53Z</addDate>
  <comments>Had to change password on customer request.</comments>
  <id>15010100000091</id>
  <lastChangeDate>2016-03-14T09:04:23Z</lastChangeDate>
  <name>John Smith</name>
  <sshKey></sshKey>
  <status>active</status>
  <userName>ayapzk</userName>
 </response>
</response>

```

Request | userUpdate  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/userUpdate  
Processing | asynchronous  
Response | [User](https://www.hosting.de/api/#the-user-object)  
Parameter | Type | Required | Description  
---|---|---|---  
user | [User object](https://www.hosting.de/api/#the-user-object) | req | Complete `user` object  
password | string | opt | You can change `user` password to new value (plain text)  
By using the `usersUpdate` request the name, comments, and SSH key of a `user` are replaced with the values that you supplied in this request.
If an new password is specified, it will replace the currently stored password. If an empty password or no password is supplied, the current password will not be changed.
## Deleting Users
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/userDelete
```
{
    "authToken": "$$YOUR API KEY$$",
    "userId": "15010100000091"
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <userId>15010100000091</userId>
</request>

```

> ##### Response
```
{
    "status": "success",
    ...
}

```

```
<response>
    <response>success</response>
    ...
</response>

```

Request | userDelete  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/userDelete  
Processing | synchronous  
Response | none  
Parameter | Type | Required | Description  
---|---|---|---  
userId | string | req | ID of user to be delete  
By using the `userDelete` request you can delete a user that is currently not authorized to access any web space.
When you delete a web space all contained files will also be deleted permanently.
## The CronJob Object
The system supports running regular tasks in a webspace. These tasks are controlled by so called cron jobs that specify how often you should run a job and what action you should take.
You can either run a PHP or bash script - or you can request a URL in one of the `webspace`’s vhosts.
#### CronJob Object
Property | Type | Required | Description  
---|---|---|---  
comments | string | opt | Additional information about cron job. Value can be freely defined by platform account holder.  
type | string | req | Available options: `url`, `php`, or `bash`  
script | string | cf. description | Required if `type` is `php` or `bash`. Script to run. Should start with ‘data/’ or ‘html/’ and contain path to script running relative to `webspace`’s home directory.  
parameters | list  | opt | If your script uses parameters, please add them to this list.  
url | string | cf. description | Required if `type` is `url`. This url to access. This must be an url using the http or https schema and will be accesses using the ‘GET’ http method.  
interpreterVersion | string | opt | For type _php_ , you can choose between different PHP Versions. Valid values are e.g. `5.6` or `7.3`.  
schedule | string | req | Available schedule options: `1min`, `5min`, `10min `15min`, `30min`, `1hour`, `2hour`, `3hour`, `4hour`, `6hour`, `12hour`, `daily`, `weekly`, or `monthly`.  
daypart | string | cf. description | Required for daily or larger intervals. Specifies time window the cron job will be running. Available interval options: `1-5`, `5-9`, `9-13`, `13-17`, `17-21`, or `21-1`.  
weekday | string | cf. description | Required for weekly schedule. Available options: `mon`, `tue`, `wed`, `thu`, `fri`, `sat`, or `sun`.  
dayOfMonth | int | cf. description | Required for monthly schedule. Day of month the cron job should be run.  
## The VHost Object
```
{
    "accountId": "15010100000001",
    "addDate": "2016-03-14T09:22:19Z",
    "blocked": null,
    "domainName": "example.org",
    "domainNameUnicode": "example.org",
    "enableAlias": false,
    "enableSystemAlias": true,
    "id": "15010100000095",
    "lastChangeDate": "2016-03-14T09:22:19Z",
    "locations": [
        {
            "directoryListingEnabled": false,
            "locationType": "generic",
            "mapScript": "",
            "mapStyle": "",
            "matchString": "",
            "matchType": "default",
            "phpEnabled": true,
            "redirectionStatus": "",
            "redirectionUrl": "",
            "setByProfile": false,
            "superUserConfiguration": ""
        }
    ],
    "phpVersion": "5.6",
    "profile": "",
    "redirectToPrimaryName": false,
    "serverType": "nginx",
    "sslSettings": null,
    "status": "creating",
    "systemAlias": "15010100000095.wh.hosting.zone",
    "webRoot": "example.org",
    "webspaceId": "15010100000094"
}

```

```
<vhost>
 <accountId>1</accountId>
 <addDate>2016-03-14T09:22:19Z</addDate>
 <blocked></blocked>
 <domainName>example.org</domainName>
 <domainNameUnicode>example.org</domainNameUnicode>
 <enableAlias>false</enableAlias>
 <enableSystemAlias>true</enableSystemAlias>
 <id>15010100000095</id>
 <lastChangeDate>2016-03-14T09:22:19Z</lastChangeDate>
 <locations>
  <item>
   <directoryListingEnabled>false</directoryListingEnabled>
   <locationType>generic</locationType>
   <mapScript></mapScript>
   <mapStyle></mapStyle>
   <matchString></matchString>
   <matchType>default</matchType>
   <phpEnabled>true</phpEnabled>
   <redirectionStatus></redirectionStatus>
   <redirectionUrl></redirectionUrl>
   <setByProfile>false</setByProfile>
   <superUserConfiguration></superUserConfiguration>
  </item>
 </locations>
 <phpVersion>5.6</phpVersion>
 <profile></profile>
 <redirectToPrimaryName>false</redirectToPrimaryName>
 <serverType>nginx</serverType>
 <sslSettings></sslSettings>
 <status>creating</status>
 <systemAlias>15010100000095.wh.hosting.zone</systemAlias>
 <webRoot>example.org</webRoot>
 <webspaceId>15010100000094</webspaceId>
</vhost>
```

#### VHost Object
Property | Type | Required | Description  
---|---|---|---  
id | string | cf. description |  `vhost` ID. Ignored in vhost create requests. Required in all other requests.  
accountId | string | out-only | ID of account managing `vhost`  
webspaceId | string | out-only | ID of `webspace` the `vhost` is part of  
domainName | string | req | Name of domain. Can be either in _Unicode_ or _ASCII_ format. Name will always be returned in _ASCII/ACE_ format.  
domainNameUnicode | string | out-only | Name of domain in _Unicode_ /_international_ format  
additionalDomainNames | list <string> | opt | Additional domain names for this vHost, like domainNAme can either be _Unicode_ or _ASCII_ format.  
additionalDomainNamesUnicode | list <string> | out-only | Additional domain names for this vHost  
enableAlias | bool | opt | If set to _true_ , alternate name is enabled to access `vhost` (cf. below for more information)  
redirectToPrimaryName | bool | opt | If set to _true_ , access of alternate name will be redirected to primary name  
enableSystemAlias | bool | opt | If set to _true_ , `webspace` will temporarily be accessible via auto generated domain name. This is intended for websites prior to live usage.  
systemAlias | string | out-only | If `enableSystemAlias` is set to _true_ , the `vhost` is also available via this domain name.  
status | string | opt | Status of `webspace`  
webRoot | string | opt | Specifies sub directory in “html/” where website files are accessed. If empty, it defaults to the _ASCII_ format of `domainName`.  
profile | string | opt | Profile using `vhost` (if set)  
serverType | string | req | Server type of `vhost`. Available options: `apache`, `nginx`.  
serverTypeChangeBlocked | bool | opt | If _true_ , one can not change the serverType.  
httpUsers | list <string> | opt | Users for HTTP Authentication  
locations | list <[Location object](https://www.hosting.de/api/#the-location-object)> | opt | List of `Location` objects  
sslSettings | [SSL Settings object](https://www.hosting.de/api/#the-ssl-settings-object) | opt | If set, SSL is enabled  
phpVersion | string | opt | php version used to execute php scripts. Available options: `5.6` up to `7.3`. Default: `7.3`.  
blocked | bool | opt |  _true_ if the vHost was blocked in case of hacked website or abuse by our operators.  
restorableUntil | datetime | out-only | If the vHost was deleted, it can be restored until that date.  
addDate | datetime | out-only | Date and time of `vhost` creation  
lastChangeDate | datetime | out-only | Date and time of last `vhost` modification  
### VHost Alternate Names
You can enable alternate names for `vhost`s: For example, your `vhost` is able to cover both _[www.example.com](http://www.example.com)_ and _example.com_. If the primary name (the name that is passed in the `domainName` attribute) starts with ‘www.’, the alternate name of the `vhost` will be the primary name without ‘ _www._ ’. If the primary name doesn’t start with ‘ _www._ ’, the alternate name will be the primary name with prepended ‘ _www._ ’. A `vhost` covers the alternate name if its `enableAlias` is set to _true_.
## Listing VHosts
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostsFind
```
{
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "VHostDomainNameAce",
        "value": "example.*"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "VHostDomainNameAce",
        "order": "ASC"
    }
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <filter>
  <field>webspaceName</field>
  <value>*example*</value>
 </filter>
 <limit>10</limit>
 <page>1</page>
 <sort>
  <field>webspaceName</field>
  <order>ASC</order>
 </sort>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "data": [
            // VHost objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 1,
        "totalPages": 1,
        "type": "FindWebspacesResult"
    },
    ...
}

```

```
<response>
 <response>
  <data/>
  <limit>10</limit>
  <page>1</page>
  <totalEntries>1</totalEntries>
  <totalPages>1</totalPages>
  <type>FindWebspacesResult</type>
 </response>
</response>

```

Request | vhostsFind  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostsFind  
Processing | synchronous  
Response | [FindVHostsResult](https://www.hosting.de/api/#filtering-and-sorting)  
You can list vhosts with the method `vhostsFind`. The response will contain a list of [VHost objects](https://www.hosting.de/api/#the-vhost-object). The usual [filtering and sorting options](https://www.hosting.de/api/#filtering-and-sorting) apply.
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | ID of managing account  
WebspaceId | ID of `webspace` the `vhost` is part of  
VHostId | ID of `vhost`  
VHostDomainName | Domain name. Pleasae use _ASCII_ /_ACE_ format  
VHostDomainNameUnicode | Domain name in _Unicode_ /_international_ format  
VHostEnableAlias | If set to _true_ , alternate name will be enabled for accessing `vhost`.  
VHostEnableSystemAlias | If set to _true_ , access for `vhost` using system alias is enabled  
VHostRedirectToPrimaryName | If set to _true_ , any access of alternate name is redirected to primary name  
VHostStatus | Status of `vhost`  
VHostLastChangeDate | Date and time of last `vhost` modification  
VHostAddDate | Date and time of `vhost` creation  
## Creating VHosts
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostCreate
```
{
    "authToken": "$$YOUR API KEY$$",
    "vhost": {
        "webspaceId": "15010100000094",
        "serverType": "nginx",
        "domainName": "example.org",
        "enableAlias": false,
        "enableSystemAlias": true,
        "redirectToPrimaryName": false,
        "locations": [
            {
                "locationType": "generic",
                "matchType": "default",
                "matchString": "",
                "phpEnabled": true,
                "directoryListingEnabled": false
            }
        ],
        "phpVersion": "5.6",
        "profile": "",
        "sslSettings": null,
        "webRoot": "example.org"
    }
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <vhost>
  <domainName>example.org</domainName>
  <enableAlias>false</enableAlias>
  <enableSystemAlias>true</enableSystemAlias>
  <locations>
   <item>
    <directoryListingEnabled>false</directoryListingEnabled>
    <locationType>generic</locationType>
    <matchString></matchString>
    <matchType>default</matchType>
    <phpEnabled>true</phpEnabled>
   </item>
  </locations>
  <phpVersion>5.6</phpVersion>
  <profile></profile>
  <redirectToPrimaryName>false</redirectToPrimaryName>
  <serverType>nginx</serverType>
  <sslSettings></sslSettings>
  <webRoot>example.org</webRoot>
  <webspaceId>15010100000094</webspaceId>
 </vhost>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "accountId": "15010100000001",
        "addDate": "2016-03-14T09:22:19Z",
        "blocked": null,
        "domainName": "example.org",
        "domainNameUnicode": "example.org",
        "enableAlias": false,
        "enableSystemAlias": true,
        "id": "15010100000095",
        "lastChangeDate": "2016-03-14T09:22:19Z",
        "locations": [
            {
                "directoryListingEnabled": false,
                "locationType": "generic",
                "mapScript": "",
                "mapStyle": "",
                "matchString": "",
                "matchType": "default",
                "phpEnabled": true,
                "redirectionStatus": "",
                "redirectionUrl": "",
                "setByProfile": false,
                "superUserConfiguration": ""
            }
        ],
        "phpVersion": "5.6",
        "profile": "",
        "redirectToPrimaryName": false,
        "serverType": "nginx",
        "sslSettings": null,
        "status": "creating",
        "systemAlias": "15010100000095.wh.hosting.zone",
        "webRoot": "example.org",
        "webspaceId": "15010100000094"
    },
    ...
}

```

```
<response>
 <response>
  <accountId>15010100000001</accountId>
  <addDate>2016-03-14T09:22:19Z</addDate>
  <blocked></blocked>
  <domainName>example.org</domainName>
  <domainNameUnicode>example.org</domainNameUnicode>
  <enableAlias>false</enableAlias>
  <enableSystemAlias>true</enableSystemAlias>
  <id>15010100000095</id>
  <lastChangeDate>2016-03-14T09:22:19Z</lastChangeDate>
  <locations>
   <item>
    <directoryListingEnabled>false</directoryListingEnabled>
    <locationType>generic</locationType>
    <mapScript></mapScript>
    <mapStyle></mapStyle>
    <matchString></matchString>
    <matchType>default</matchType>
    <phpEnabled>true</phpEnabled>
    <redirectionStatus></redirectionStatus>
    <redirectionUrl></redirectionUrl>
    <setByProfile>false</setByProfile>
    <superUserConfiguration></superUserConfiguration>
   </item>
  </locations>
  <phpVersion>5.6</phpVersion>
  <profile></profile>
  <redirectToPrimaryName>false</redirectToPrimaryName>
  <serverType>nginx</serverType>
  <sslSettings></sslSettings>
  <status>creating</status>
  <systemAlias>15010100000095.wh.hosting.zone</systemAlias>
  <webRoot>example.org</webRoot>
  <webspaceId>15010100000094</webspaceId>
 </response>
</response>

```

Request | vhostCreate  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostCreate  
Processing | asynchronous  
Response | [VHost](https://www.hosting.de/api/#the-vhost-object)  
Parameter | Type | Required | Description  
---|---|---|---  
vhost | [VHost object](https://www.hosting.de/api/#the-vhost-object) | req | Complete `vhost` object  
phpIni | [PHP.ini object](https://www.hosting.de/api/#the-phpini-object) | opt | PHP Configuration for this `vhost`  
sslPrivateKey | string | opt | Private SSL key in _PEM_ format. Required when SSL is enabled.  
setHttpUserPasswords | list <HttpUser> | opt | List of HttpUsers with access to Locations of the `vhost`. See [HTTP User objects](https://www.hosting.de/api/#the-http-user-object)  
The request `vhostCreate` lets you create a new `vhost` in a `webspace`. If you want to use manual SSL with this `vhost`, you have to pass the private key that corresponds to the certificate in the `SSLSettings` using the `sslPrivateKey` parameter.
## Updating VHosts
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostUpdate
```
{
    "authToken": "$$YOUR API KEY$$",
    "vhost": {
        "domainName": "example.org",
        "enableAlias": false,
        "enableSystemAlias": true,
        "id": "15010100000095",
        "locations": [
            {
                "directoryListingEnabled": false,
                "locationType": "generic",
                "matchString": "",
                "matchType": "default",
                "phpEnabled": true,
                "setByProfile": false
            }
        ],
        "phpVersion": "5.6",
        "profile": "",
        "redirectToPrimaryName": false,
        "serverType": "nginx",
        "sslSettings": null,
        "webRoot": "example.org"
    }
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <vhost>
  <domainName>example.org</domainName>
  <enableAlias>false</enableAlias>
  <enableSystemAlias>true</enableSystemAlias>
  <id>15010100000095</id>
  <locations>
   <item>
    <directoryListingEnabled>false</directoryListingEnabled>
    <locationType>generic</locationType>
    <matchString></matchString>
    <matchType>default</matchType>
    <phpEnabled>true</phpEnabled>
    <setByProfile>false</setByProfile>
   </item>
  </locations>
  <phpVersion>5.6</phpVersion>
  <profile></profile>
  <redirectToPrimaryName>false</redirectToPrimaryName>
  <serverType>nginx</serverType>
  <sslSettings></sslSettings>
  <webRoot>example.org</webRoot>
 </vhost>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "accountId": "15010100000001",
        "addDate": "2016-03-14T09:22:19Z",
        "blocked": null,
        "domainName": "example.org",
        "domainNameUnicode": "example.org",
        "enableAlias": false,
        "enableSystemAlias": true,
        "id": "15010100000095",
        "lastChangeDate": "2016-03-14T09:34:29Z",
        "locations": [
            {
                "directoryListingEnabled": false,
                "locationType": "generic",
                "mapScript": "",
                "mapStyle": "",
                "matchString": "",
                "matchType": "default",
                "phpEnabled": true,
                "redirectionStatus": "",
                "redirectionUrl": "",
                "setByProfile": false,
                "superUserConfiguration": ""
            }
        ],
        "phpVersion": "5.6",
        "profile": "",
        "redirectToPrimaryName": false,
        "serverType": "nginx",
        "sslSettings": null,
        "status": "active",
        "systemAlias": "15010100000095.dev.webserver.keenlogics.com",
        "webRoot": "example.org",
        "webspaceId": "15010100000094"
    },
    ...
}

```

```
<response>
 <response>
  <accountId>15010100000001</accountId>
  <addDate>2016-03-14T09:22:19Z</addDate>
  <blocked></blocked>
  <domainName>example.org</domainName>
  <domainNameUnicode>example.org</domainNameUnicode>
  <enableAlias>false</enableAlias>
  <enableSystemAlias>true</enableSystemAlias>
  <id>15010100000095</id>
  <lastChangeDate>2016-03-14T09:34:29Z</lastChangeDate>
  <locations>
   <item>
    <directoryListingEnabled>false</directoryListingEnabled>
    <locationType>generic</locationType>
    <mapScript></mapScript>
    <mapStyle></mapStyle>
    <matchString></matchString>
    <matchType>default</matchType>
    <phpEnabled>true</phpEnabled>
    <redirectionStatus></redirectionStatus>
    <redirectionUrl></redirectionUrl>
    <setByProfile>false</setByProfile>
    <superUserConfiguration></superUserConfiguration>
   </item>
  </locations>
  <phpVersion>5.6</phpVersion>
  <profile></profile>
  <redirectToPrimaryName>false</redirectToPrimaryName>
  <serverType>nginx</serverType>
  <sslSettings></sslSettings>
  <status>active</status>
  <systemAlias>15010100000095.dev.webserver.keenlogics.com</systemAlias>
  <webRoot>example.org</webRoot>
  <webspaceId>15010100000094</webspaceId>
 </response>
</response>

```

Request | vhostUpdate  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostUpdate  
Processing | asynchronous  
Response | [VHost](https://www.hosting.de/api/#the-vhost-object)  
Parameter | Type | Required | Description  
---|---|---|---  
vhost | [VHost object](https://www.hosting.de/api/#the-vhost-object) | req | Complete `vhost` object  
phpIni | [PHP.ini object](https://www.hosting.de/api/#the-phpini-object) | opt | PHP Configuration for this `vhost`  
sslPrivateKey | string | opt | Update of private SSL key. Required when new SSL certificate is used and private key associated with `vhost` does not match certificate.  
setHttpUserPasswords | list <HttpUser> | opt | List of HttpUsers with access to Locations of the `vhost`. See [HTTP User objects](https://www.hosting.de/api/#the-http-user-object)  
expectedCosts | int | opt | If your update would produce costs, e.g. if your PHP memory limit will be upgraded, you have to send the expected costs as an acknowledgement.  
The `vhost` to be updated is identified by its ID. All fields not marked with ‘out-only’ are set to the values of the `vhost` argument. Optional fields that are not specified in this call will be reset to their default values.
If the manual SSL mode is used and the certificate in the `vhost` is replaced with a certificate that is created from a different private key than the previous certificate, the corresponding private key to the new certificate must be passed by using the `sslPrivateKey` parameter.
## Deleting VHosts
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostDelete
```
{
    "authToken": "$$YOUR API KEY$$",
    "vhostId": "15010100000095"
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <vhostId>15010100000095</vhostId>
</request>

```

> ##### Response
```
{
    "status": "success",
    ...
}

```

```
<response>
    <response>success</response>
    ...
</response>

```

Request | vhostDelete  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostDelete  
Processing | asynchronous  
Response | none  
Parameter | Type | Required | Description  
---|---|---|---  
vhostId | string | req | ID of `vhost` to be deleted  
The function `vhostDelete` lets you delete `vhosts`. The `vhost` that you want to delete is identified by its ID.
If you delete a `vhost`, it will be deactivated and set to a state that is restorable for a limit time. After that the `vhost` will be deleted from the database. The actual files in the `webspace` belonging to the `vhost` will not be deleted automatically when a `vhost` is removed. The user has to delete these files manually.
## Restoring VHosts
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostRestore
```
{
    "authToken": "$$YOUR API KEY$$",
    "vhostId": "15010100000095"
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <vhostId>15010100000095</vhostId>
</request>

```

> ##### Response
```
{
    "status": "success",
    ...
}

```

```
<response>
    <response>success</response>
    ...
</response>

```

Request | vhostRestore  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostRestore  
Processing | asynchronous  
Response | none  
Parameter | Type | Required | Description  
---|---|---|---  
vhostId | string | req | ID of `vhost` to be restored  
You can restore a `vhost` that was deleted and is still in restorable state with the function `vhostRestore`. The `vhost` to be restored is identified by its ID. If the restore is successful and the `webspace` files for the vhost have not been manually deleted, the `vhost` will be restored to the state before it was deleted.
## The SSL Settings Object
#### SSL Settings Object
Property | Type | Required | Description  
---|---|---|---  
profile | string | opt | Profile of the SSL Implementation, we support `modern` and `intermediate`  
certificates | string | opt | Contains all Certificates needed by the webserver (Server, Intermediate)  
managedSslProductCode | string | opt | ProductCode of the SSL Certificate  
managedSslStatus | string | opt | Status of the SSL Certificate  
hstsMaxAge | int | opt | Maximum Validity of HSTS  
hstsIncludeSubdomains | bool | opt | Include Subdomains in HSTS Settings  
hstsAllowPreload | bool | opt | Allow preloading in HSTS  
## Using your own certificate
If you want to use your own certificate, Use the [SSL Settings object](https://www.hosting.de/api/#the-ssl-settings-object) and add all needed certificates to the parameter `certificates`. The object can then be added to the `vhost`. You have to specify the `sslPrivateKey` parameter when calling `vhostCreate` or `vhostUpdate`.
Our system checks the values and if e.g. Key and Certificate to not match, you will receive an error.
## Activating automatic SSL for a VHost
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostActivateSsl
```
{
    "authToken": "$$YOUR API KEY$$",
    "vhost": {
        ...
        "sslSettings": {
            "profile": "modern",
            "managedSslProductCode": "ssl-letsencrypt-dv-3m"
        }
    }
}
```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <vhost>
  ...
  <sslSettings>
    <profile>modern</profile>
    <managedSslProductCode>ssl-letsencrypt-dv-3m</managedSslProductCode>
  </sslSettings>
 </vhost>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        ...
        "sslSettings": {
            "certificates": "-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----",
            "hstsAllowPreload": null,
            "hstsIncludeSubdomains": null,
            "hstsMaxAge": null,
            "managedSslProductCode": "ssl-letsencrypt-dv-3m",
            "managedSslStatus": "active",
            "profile": "modern"
        }
    },
    ...
}

```

```
<response>
 <response>
  <sslSettings>
    <certificates>-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----"</certificates>
    <hstsAllowPreload>null</hstsAllowPreload>
    <hstsIncludeSubdomains>null</hstsIncludeSubdomains>
    <hstsMaxAge>null</hstsMaxAge>
    <managedSslProductCode>ssl-letsencrypt-dv-3m</managedSslProductCode>
    <managedSslStatus>active</managedSslStatus>
    <profile>modern</profile>
  </sslSettings>
 </response>
</response>

```

Request | vhostActivateSsl  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostActivateSsl  
Processing | asynchronous  
Response | [VHost](https://www.hosting.de/api/#the-vhost-object)  
Our system can automatically add Let’s Encrypt or RapidSSL certificates. In this case, you only have to specify the `managedSslProductCode` parameter in the the [SSL Settings object](https://www.hosting.de/api/#the-ssl-settings-object). Everything in background will be done by our system. This option is only available if either your DNS zone is hosted with us or the domain name of the `vhost` points to our webserver. You could check if we are capable to create automatic certificates with the `checkAutoValidationCapable` of the SSL API.
All certificates created automatically by us will also be renewed automatically.
This features is available for the following productCodes:
  * ssl-geotrust-rapidssl-12m
  * ssl-letsencrypt-dv-3m


## The PHP Configuration Meta Data Object
The [PHP Configuration Meta Data object](https://www.hosting.de/api/#the-php-configuration-meta-data-object) contains available Values for a specific PHP Settings. Only these PHP Settings can be specified in a PHP.ini object to override the default settings for a `vhost`.
#### PHP Configuration Meta Data Object
Property | Type | Required | Description  
---|---|---|---  
phpVersions | list  | req | Lists the PHP Versions for which this Meta Data Object can be used  
key | string | req | Key of the Meta Data Object  
type | string | req | Type of the Meta Data Object  
min | int | opt | minimum available Value  
max | int | opt | maximum available Value  
availableValues | list  | opt | Available Values  
defaultValue | string | opt | default Value  
accessLevels | list  | opt | Shows who has access to set this Meta Data Object  
resetOnPhpVersionChange | bool | opt | If _true_ and you change the PHP Version for a vHost, this setting will be resetted to its default  
upgrades | list  | opt | List of available chargeable Upgrades including productCodes  
## The PHP.ini Object
To specify PHP Settings you can use a [PHP.ini object](https://www.hosting.de/api/#the-phpini-object). Our system allows to define some PHP Values, but not all.
#### PHP.ini Object
Property | Type | Required | Description  
---|---|---|---  
vhostId | string | opt | ID of the vHost  
values | list  | req | List of different PHP.ini Values  
## The PHP.ini Value Object
#### PHP.ini Value Object
Property | Type | Required | Description  
---|---|---|---  
key | string | req | Key Name of the PHP.ini Value, e.g. _display_output_  
value | string | req | Value of the PHP.ini Value, e.g. _0_  
immutable | bool | out-only | If _true_ , the Value of this Key cannot be changed  
deletable | bool | out-only | If _true_ , the Key cannot be deleted  
metadata | PhpConfigurationMetadata | out-only | Displays information about this PHP.ini Value, e.g. for which PHP Versions it is available.  
## Getting a list of PHP Settings
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/phpConfigurationMetadata
```
{
    "authToken": "$$YOUR API KEY$$",
    "all": true
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <all>true</all>
</request>
```

> ##### Response
```
{
    ...
    "responses": [
        // PhpConfigurationMetaData Objects
    ]
}
```

```
<responses>
    <item>
        // PhpConfigurationMetaData Object
    </item>
    ...
</responses>

```

Request | phpConfigurationMetadata  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/phpConfigurationMetadata  
Processing | synchronous  
Response | [list <PhpConfigurationMetadata>](https://www.hosting.de/api/#the-php-configuration-meta-data-object)  
Parameter | Type | Required | Description  
---|---|---|---  
all | bool | opt | If _true_ , all available PHP Settings are returned.  
## Getting a default PHP.ini Object
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostPhpIniDefault
```
{
    "authToken": "$$YOUR API KEY$$",
    "webspaceId": 15010100000094
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <webspaceId>15010100000094</webspaceId>
</request>
```

> ##### Response
```
{
    ...
    "response": [
        // PhpIni Object
    ]
}
```

```
<response>
  // PhpIni Object
</response>

```

Request | vhostPhpIniDefault  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostPhpIniDefault  
Processing | synchronous  
Response | [PhpIni](https://www.hosting.de/api/#the-phpini-object)  
```
{
    "vhostId": null,
    "values": [
        {
            "deletable": false,
            "immutable": false,
            "key": "error_reporting",
            "metadata": {
                "accessLevels": [
                    "user"
                ],
                "defaultValue": "0",
                "key": "error_reporting",
                "max": null,
                "min": null,
                "phpVersions": [
                    "5.6",
                    "7.0",
                    "7.1",
                    "7.2",
                    "7.3",
                    "7.4"
                ],
                "resetOnPhpVersionChange": false,
                "type": "string"
            },
            "value": "0"
        }
        ...
    ]
}
```

```
<phpIni>
   <vhostId>null</vhostId>
   <values>
      <item>
      <key>error_reporting</key>
      <value>0</value>
      <immutable>false</immutable>
      <deletable>false</deletable>
      <metadata>
      <phpVersions>
         <item>5.6</item>
         <item>7.0</item>
         <item>7.1</item>
         <item>7.2</item>
         <item>7.3</item>
         <item>7.4</item>
      </phpVersions>
      <key>error_reporting</key>
      <type>string</type>
      <min xsi:nil="true"/>
      <max xsi:nil="true"/>
      <defaultValue>0</defaultValue>
      <accessLevels>
         <item>user</item>
      </accessLevels>
      <resetOnPhpVersionChange>false</resetOnPhpVersionChange>
      </metadata>
      </item>
   </values>
</phpIni>
```

This method returns a default PHP.ini Object for the specified webspace.
Parameter | Type | Required | Description  
---|---|---|---  
webspaceId | string | req | ID of the webspace  
phpVersion | string | opt | If not specified, the method will return the default PHP.ini Object for the default PHP Version.  
## Getting the PHP.ini Object for a specific vhost
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostPhpIniList
```
{
    "authToken": "$$YOUR API KEY$$",
    "vhostId": 15010100000094
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <vhostId>15010100000094</vhostId>
</request>
```

> ##### Response
```
{
    ...
    "response": [
        // PhpIni Object
    ]
}
```

```
<response>
  // PhpIni Object
</response>

```

Request | vhostPhpIniList  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/vhostPhpIniList  
Processing | synchronous  
Response | [PhpIni](https://www.hosting.de/api/#the-phpini-object)  
```
{
    "vhostId": null,
    "values": [
        {
            "deletable": false,
            "immutable": false,
            "key": "error_reporting",
            "metadata": {
                "accessLevels": [
                    "user"
                ],
                "defaultValue": "0",
                "key": "error_reporting",
                "max": null,
                "min": null,
                "phpVersions": [
                    "5.6",
                    "7.0",
                    "7.1",
                    "7.2",
                    "7.3",
                    "7.4"
                ],
                "resetOnPhpVersionChange": false,
                "type": "string"
            },
            "value": "0"
        }
        ...
    ]
}
```

```
<phpIni>
   <vhostId>null</vhostId>
   <values>
      <item>
      <key>error_reporting</key>
      <value>0</value>
      <immutable>false</immutable>
      <deletable>false</deletable>
      <metadata>
      <phpVersions>
         <item>5.6</item>
         <item>7.0</item>
         <item>7.1</item>
         <item>7.2</item>
         <item>7.3</item>
         <item>7.4</item>
      </phpVersions>
      <key>error_reporting</key>
      <type>string</type>
      <min xsi:nil="true"/>
      <max xsi:nil="true"/>
      <defaultValue>0</defaultValue>
      <accessLevels>
         <item>user</item>
      </accessLevels>
      <resetOnPhpVersionChange>false</resetOnPhpVersionChange>
      </metadata>
      </item>
   </values>
</phpIni>
```

This method returns the PHP.ini Object for the specified vhost.
Parameter | Type | Required | Description  
---|---|---|---  
vhostId | string | req | ID of the vhost  
## The PHP Version object
PHP Version objects are only returned with the phpversion method. They are never used in requests.
#### PHP Version Object
Property | Type | Required | Description  
---|---|---|---  
accessLevels | list | req | Accesslevels which are allowed to use this version  
isDefault | bool | req | If _true_ this version is the default. The default may change from time to time.  
version | string | req | PHP Version string, used for specifying the `vhosts` phpVersion  
## Getting available PHP Versions
This method is used to get a list of all available PHP Versions. It returns a list of [PHP Version objects](https://www.hosting.de/api/#the-php-version-object). To specify the PHP Version for a `vhost`, you have to set the `phpVersion` parameter of a `vhost` to a string. The string must match the parameter `version` of the `PhpVersion` object.
> ##### POST https://secure.hosting.de/api/webhosting/v1/jsonxml/phpversions
```
{
    "authToken": "$$YOUR API KEY$$"
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
</request>
```

> ##### Response
```
{
    ...
    "responses": [
        // PhpVersion Objects
    ]
}
```

```
<responses>
    <item>
        // PhpVersion Object
    </item>
    ...
</responses>

```

Request | phpversions  
---|---  
Url |  https://secure.hosting.de/api/webhosting/v1/jsonxml/phpversions  
Processing | synchronous  
Response | [list <PhpVersion>](https://www.hosting.de/api/#the-php-version-object)  
```
{
    "accessLevels": [
        "user"
    ],
    "isDefault": false,
    "version": "5.6"
}
```

```
<phpVersion>
 <accessLevels>
    <accessLevel>user</accessLevel>
 </accessLevels>
 <isDefault>false</isDefault>
 <version>5.6</version>
</phpVersion>
```

This method has no parameters.
## Updating PHP Settings
You have to use vhostUpdate if you want to change PHP Settings of a `vhost`.
## The HTTP User Object
If you want a location being restricted, you can create HTTP Users. HTTP Users can be created or modified by creating or updating the specified `vhost`.
#### HTTP User Object
Property | Type | Required | Description  
---|---|---|---  
name | string | req | Username of the HTTP User  
password | string | req | Password of the HTTP Header in cleartext  
## The Location Object
With a location object one can customize the nginx configuration. Locations can be created or modified by creating or updating the specified `vhost`.
#### Location Object
Property | Type | Required | Description  
---|---|---|---  
setByProfile | bool | opt | If _true_ , this Location was added by a profile  
locationType | string | req | Type of the Location. We support `location`, `redirect` and `denyLocation`.  
matchType | string | req | Available options are `directory`, `exact` or `regex`  
matchString | string | opt | String to match  
redirectionStatus | string | opt | Status of the redirection  
redirectionUrl | string | opt | URL of the redirection target.  
phpEnabled | bool | opt | If _true_ , this Location parses PHP Files  
directoryListingEnabled | bool | opt | If _true_ , this Location does a Directory Listing  
blockDotfiles | bool | opt | If _true_ , Files beginning with a dot (.htaccess) are blocked for HTTP Requests, defaults to true  
mapScript | string | opt | If filled, all requests will go to this script.  
mapStyle | string | opt | Style of the map script  
httpHeader | list  | opt | List of additional HTTP Headers send to the client  
restrictToHttpUsers | list  | opt | Usernames of the HTTP Users this location is restricted to  
## The HTTP Header Object
Our system allows to activate some additional HTTP Headers. These can be specified within a location object.
#### HTTP Header Object
Property | Type | Required | Description  
---|---|---|---  
name | string | req | Name of the HTTP Header  
content | string | req | Content of the HTTP Header  
# Database
The database section of the API allows you to create and manage databases. At the moment we support MariaDB/MySQL databases.
## Available Database Products
Product | Validity Periods (months) | ProductCode  
---|---|---  
MariaDB Single Database | 1 | database-mariadb-single-v1-1m  
MariaDB Single Database | 12 | database-mariadb-single-v1-12m  
## The Database User Object
A MySQL User is represented by a user object.
```
{
    "accountId": "15010100000001",
    "addDate": "2016-03-14T08:50:53Z",
    "comments": "",
    "id": "15010100000091",
    "lastChangeDate": "2016-03-14T08:50:53Z",
    "name": "John Smith",
    "dbUserName": "ayapzk",
    "status": "active"
}
```

```
<user>
 <accountId>15010100000001</accountId>
 <addDate>2016-03-14T08:50:53Z</addDate>
 <comments></comments>
 <id>15010100000091</id>
 <lastChangeDate>2016-03-14T08:50:53Z</lastChangeDate>
 <name>John Smith</name>
 <dbUserName>ayapzk</dbUserName>
 <status>active</status>
</user>

```

#### User Object
Property | Type | Required | Description  
---|---|---|---  
id | string | req | User ID  
accountId | string | opt | ID of user managing account  
name | string | req | free Name which can be specified to identify the `user`  
dbUserName | string | out-only | Generated Username of the `user`  
status | string | opt | Status of the u`user`ser  
comments | string | opt | free comments which can be specified to identify the `user`  
addDate | datetime | out-only | Date and time of `user` creation  
lastChangeDate | datetime | out-only | Date and time of last `user` modification  
## The DatabaseAccess Object
The databaseAccess object is the representation of a user which is linked to a database.
```
{
    "addDate": "2016-03-14T09:11:24Z",
    "lastChangeDate": "2016-03-14T09:11:24Z",
    "accessLevel": [ "read", "write", "schema" ],
    "userId": "15010100000091",
    "dbLogin": "webv4h25r_ayapzk",
    "databaseId": "15010100000094"
}
```

```
<databaseAccess>
 <addDate>2016-03-14T09:11:24Z</addDate>
 <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
 <accessLevel>
    <item>read</item>
    <item>write</item>
    <item>schema</item>
 </accessLevel>
 <userId>15010100000091</userId>
 <dbLogin>dbv4h25r_ayapzk</dbLogin>
 <databaseId>15010100000094</databaseId>
</databaseAccess>
```

#### DatabaseAccess Object
Property | Type | Required | Description  
---|---|---|---  
databaseId | string | opt | Database ID  
userId | string | req | User ID  
dbLogin | string | opt | Username for MySQL  
accessLevel | list | req | Rights for this user, possible values: `read`, `write`, `schema`  
addDate | datetime | out-only | Date and time of `databaseAccess` creation  
lastChangeDate | datetime | out-only | Date and time of last `databaseAccess` modification  
## The Database Object
A database object represents the MySQL database.
```
{
    "accesses": [
        {
            "addDate": "2016-03-14T09:11:24Z",
            "lastChangeDate": "2016-03-14T09:11:24Z",
            "accessLevel": [ "read", "write", "schema" ],
            "userId": "15010100000091",
            "userName": "dbv4h25r_ayapzk",
            "databaseId": "15010100000094"
        }
    ],
    "bundleId": null,
    "poolId": null,
    "accountId": "15010100000001",
    "addDate": "2016-03-14T09:11:24Z",
    "paidUntil": "2016-04-14T09:11:24Z",
    "renewOn": "2016-04-14T09:11:24Z",
    "deletionScheduledFor": null,
    "id": "15010100000094",
    "lastChangeDate": "2016-03-14T09:11:24Z",
    "name": "Example",
    "productCode": "database-mariadb-single-v1-12m",
    "restorableUntil": null,
    "status": "creating",
    "storageQuota": 512,
    "storageQuotaIncluded": 512,
    "storageQuotaUsedRatio": 0,
    "storageUsed": 0,
    "dbName": "dbv4h25r",
    "hostName": "dbv4h25r.mariadb.routing.zone",
    "dbEngine": "MariaDB",
    "dbType": "single",
    "forceSsl": false,
    "restrictions": [],
    "limitations": []
}
```

```
<database>
 <accesses>
  <item>
    <addDate>2016-03-14T09:11:24Z</addDate>
    <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
    <accessLevel>
        <item>read</item>
        <item>write</item>
        <item>schema</item>
    </accessLevel>
    <userId>15010100000091</userId>
    <dbLogin>dbv4h25r_ayapzk</dbLogin>
    <databaseId>15010100000094</databaseId>
  </item>
 </accesses>
 <bundleId></bundleId>
 <poolId></poolId>
 <accountId>1</accountId>
 <addDate>2016-03-14T09:11:24Z</addDate>
 <paidUntil>2016-04-14T09:11:24Z</paidUntil>
 <renewOn>2016-04-14T09:11:24Z</renewOn>
 <deletionScheduledFor></deletionScheduledFor>
 <id>15010100000094</id>
 <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
 <name>Example</name>
 <productCode>database-mariadb-single-v1-12m</productCode>
 <restorableUntil></restorableUntil>
 <status>creating</status>
 <storageQuota>512</storageQuota>
 <storageQuotaIncluded>512</storageQuotaIncluded>
 <storageQuotaUsedRatio>0</storageQuotaUsedRatio>
 <storageUsed>0</storageUsed>
 <dbName>dbv4h25r</dbName>
 <hostName>dbv4h25r.mariadb.routing.zone</hostName>
 <dbEngine>MariaDB</dbEngine>
 <dbType>single</dbType>
 <forceSsl>false</forceSsl>
 <limitations/>
 <restrictions/>
</database>
```

#### Database Object
Property | Type | Required | Description  
---|---|---|---  
id | string | cf. description | ID of `database`. Ignored in `database` create requests. Required in all other requests.  
accountId | string | opt | ID of the account to which the `database` belongs to  
bundleId | string | opt | ID of the bundle in which the `database` is created  
name | string | req | free Name which can be specified to identify the `database`  
dbName | string | out-only | Generated Name of the `database` to use for Connections  
hostName | string | out-only | General Hostname for the database. Can be used for MySQL Connections for example.  
dbEngine | string | out-only | Engine of the database, at the moment we just support `MariaDB`.  
dbType | string | out-only | Type of the database, at the moment we just support `single`.  
productCode | string | opt | The productCode of the `database`  
forceSsl | bool | opt | At the moment, we just support `false`  
storageQuota | int | opt | Real Storage Quota for the `database`  
storageQuotaIncluded | int | out-only | Storage Quota which is included in the `database` for no costs.  
storageUsed | int | out-only | Storage Quota used for all data in the `database`  
storageQuotaUsedRatio | double | out-only | Ratio of storageUsed and storageQuota  
limitations |  | out-only | Limitations, at the moment we just support one default  
status | string | opt | Status of the database  
comments | string | opt | free comments which can be specified to identify the `database`  
restrictions | list  | out-only | Restrictions, mostly set by our operators.  
accesses | list  | out-only | A list of `DatabaseAccess` objects with all current authorizations for users.  
poolId | string | out-only | PoolId in which the `database` was created  
paidUntil | datetime | out-only | Time that the `database` is paid for  
renewOn | datetime | out-only | Date on which the `database` will be invoice again  
deletionScheduledFor | datetime | out-only | Deletion date and time of `database`  
restorableUntil | datetime | out-only | Date and time until `database` is restorable  
addDate | datetime | out-only | Date and time of `database` creation  
lastChangeDate | datetime | out-only | Date and time of last `database` modification  
## Listing Users
> ##### POST https://secure.hosting.de/api/database/v1/jsonxml/usersFind 
```
{
    "authToken": "$$YOUR API KEY$$",
    "filter": {
        "field": "UserName",
        "value": "*Smith*"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "UserName",
        "order": "ASC"
    }
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <filter>
  <field>UserName</field>
  <value>*Smith*</value>
 </filter>
 <limit>10</limit>
 <page>1</page>
 <sort>
  <field>UserName</field>
  <order>ASC</order>
 </sort>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "data": [
            // user objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 1,
        "totalPages": 1,
        "type": "FindUsersResult"
    },
    ...
}

```

```
<response>
 <response>
  <data/>
  <limit>10</limit>
  <page>1</page>
  <totalEntries>1</totalEntries>
  <totalPages>1</totalPages>
  <type>FindUsersResult</type>
 </response>
</response>

```

Request | usersFind  
---|---  
Url |  https://secure.hosting.de/api/database/v1/jsonxml/usersFind  
Processing | synchronous  
Response | [FindUsersResult](https://www.hosting.de/api/#filtering-and-sorting)  
The function `usersFind` lets you list existing Users. The usual [sorting and filtering options](https://www.hosting.de/api/#filtering-and-sorting) apply.
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | ID of account the user belongs to  
UserId | ID of user  
UserName | Name of the user  
UserDbName |   
UserStatus | Status of the user  
UserLastChangeDate | Date and time of the last change  
UserAddDate | Date and time the user was created  
UserAccessesDatabaseId | Databases as ID to which the user has access  
## Creating Users
> ##### POST https://secure.hosting.de/api/database/v1/jsonxml/userCreate
```
{
    "authToken": "$$YOUR API KEY$$",
    "user": {
        "name": "John Smith"
    },
    "password": "57BGnyzxFgIn"
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <password>57BGnyzxFgIn</password>
 <user>
  <name>John Smith</name>
 </user>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "accountId": "15010100000001",
        "addDate": "2016-03-14T08:50:53Z",
        "comments": "",
        "id": "15010100000091",
        "lastChangeDate": "2016-03-14T08:50:53Z",
        "name": "John Smith",
        "dbUserName": "ayapzk",
        "status": "active"
    },
    ...
}

```

```
<response>
 <response>
  <accountId>1</accountId>
  <addDate>2016-03-14T08:50:53Z</addDate>
  <comments></comments>
  <id>15010100000091</id>
  <lastChangeDate>2016-03-14T08:50:53Z</lastChangeDate>
  <name>John Smith</name>
  <dbUserName>ayapzk</dbUserName>
  <status>active</status>
 </response>
</response>

```

Request | userCreate  
---|---  
Url |  https://secure.hosting.de/api/database/v1/jsonxml/userCreate  
Processing | synchronous  
Response | [User](https://www.hosting.de/api/#the-database-user-object)  
Parameter | Type | Required | Description  
---|---|---|---  
user | [User object](https://www.hosting.de/api/#the-database-user-object) | req | Complete `user` object  
password | string | req |  `user` password in plain text  
The `usersCreate` request lets you create new users that can later be authorized to access databases.
The `user` password can only be set using this request or an update. It can not be read back from the system because it is stored as a secure one way hash in the system.
## Updating Users
> ##### POST https://secure.hosting.de/api/database/v1/jsonxml/userUpdate
```
{
    "authToken": "$$YOUR API KEY$$",
    "user": {
        "comments": "Had to change password on customer request.",
        "id": "15010100000091",
        "name": "John Smith",
        "dbUserName": "ayapzk",
        "status": "active"
    },
    "password": "OgL2OtCHnOTd"
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <password>OgL2OtCHnOTd</password>
 <user>
  <comments>Had to change password on customer request.</comments>
  <id>15010100000091</id>
  <name>John Smith</name>
  <dbUserName>ayapzk</dbUserName>
  <status>active</status>
 </user>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "accountId": "15010100000001",
        "addDate": "2016-03-14T08:50:53Z",
        "comments": "Had to change password on customer request.",
        "id": "15010100000091",
        "lastChangeDate": "2016-03-14T09:04:23Z",
        "name": "John Smith",
        "dbUserName": "ayapzk",
        "status": "active"
    },
    ...
}

```

```
<response>
 <response>
  <accountId>1</accountId>
  <addDate>2016-03-14T08:50:53Z</addDate>
  <comments>Had to change password on customer request.</comments>
  <id>15010100000091</id>
  <lastChangeDate>2016-03-14T09:04:23Z</lastChangeDate>
  <name>John Smith</name>
  <dbUserName>ayapzk</dbUserName>
  <status>active</status>
 </response>
</response>

```

Request | userUpdate  
---|---  
Url |  https://secure.hosting.de/api/database/v1/jsonxml/userUpdate  
Processing | asynchronous  
Response | [User](https://www.hosting.de/api/#the-database-user-object)  
Parameter | Type | Required | Description  
---|---|---|---  
user | [User object](https://www.hosting.de/api/#the-database-user-object) | req | Complete `user` object  
password | string | opt | You can change `user` password to new value (plain text)  
By using the `usersUpdate` request the name and comments of a `user` are replaced with the values that you supplied in this request.
If an new password is specified, it will replace the currently stored password. If an empty password or no password is supplied, the current password will not be changed.
## Deleting Users
> ##### POST https://secure.hosting.de/api/database/v1/jsonxml/userDelete
```
{
    "authToken": "$$YOUR API KEY$$",
    "userId": "15010100000091"
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <userId>15010100000091</userId>
</request>

```

> ##### Response
```
{
    "status": "success",
    ...
}

```

```
<response>
    <response>success</response>
    ...
</response>

```

Request | userDelete  
---|---  
Url |  https://secure.hosting.de/api/database/v1/jsonxml/userDelete  
Processing | synchronous  
Response | none  
Parameter | Type | Required | Description  
---|---|---|---  
userId | string | req | ID of user to be delete  
By using the `userDelete` request you can delete a user that is currently not authorized to access any database.
## Listing Databases
> ##### POST https://secure.hosting.de/api/database/v1/jsonxml/databasesFind 
```
{
    "authToken": "$$YOUR API KEY$$",
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "DatabaseName",
        "order": "ASC"
    }
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <limit>10</limit>
 <page>1</page>
 <sort>
  <field>DatabaseName</field>
  <order>ASC</order>
 </sort>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "data": [
            // database objects
        ],
        "limit": 10,
        "page": 1,
        "totalEntries": 33,
        "totalPages": 4,
        "type": "FindDatabasesResult"
    },
    ...
}

```

```
<response>
 <response>
  <data/>
  <limit>10</limit>
  <page>1</page>
  <totalEntries>33</totalEntries>
  <totalPages>4</totalPages>
  <type>FindDatabasesResult</type>
 </response>
</response>

```

Request | databasesFind  
---|---  
Url |  https://secure.hosting.de/api/database/v1/jsonxml/databasesFind  
Processing | synchronous  
Response | [FindDatabasesResult](https://www.hosting.de/api/#filtering-and-sorting)  
The function `databasesFind` lets you list existing Databases. The usual [sorting and filtering options](https://www.hosting.de/api/#filtering-and-sorting) apply.
The following fields are available for filtering and sorting:
Field | Description  
---|---  
AccountId | ID of account the user belongs to  
DatabaseId | ID of the database  
DatabaseServerId | ID of the database server  
BundleId | ID of the bundle  
DatabaseName | Name of the database in UI  
DatabaseDbName | real Name of the database in the system  
DatabaseDbEngine | Engine of the database  
DatabaseDbType | Type of the database  
DatabaseProductCode | ProductCode, see table below  
DatabaseStorageQuota | Storage Quota of the database in MB  
DatabaseStorageUsed | Used Storage Quota in MB  
DatabaseStorageQuotaUsedRatio | Ratio of used vs. free Storage Quota  
DatabaseStatus | Status of the database  
DatabasePaidUntil | Date, until the database is paid  
DatabaseRenewOn | Date, on which the database will be invoiced again  
DatabaseLastChangeDate | Date and time of the last change  
DatabaseAddDate | Date and time the database was created  
DatabaseAccessesUserId | ID of a user, to find all databases a user has access to  
## Creating Databases
> ##### POST https://secure.hosting.de/api/database/v1/jsonxml/databaseCreate
```
{
    "authToken": "$$YOUR API KEY$$",
    "database": {
        "name": "Example",
        "productCode": "database-mariadb-single-v1-12m",
        "storageQuota": 512
    },
    "accesses": [
        {
            "userId": "15010100000091",
            "accessLevel": [ "read", "write", "schema" ]
        }
    ]
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <webspace>
  <name>Example</name>
  <productCode>database-mariadb-single-v1-12m</productCode>
  <storageQuota>512</storageQuota>
 </webspace>
 <accesses>
  <item>
    <accessLevel>
        <item>read</item>
        <item>write</item>
        <item>schema</item>
    </accessLevel>
    <userId>15010100000091</userId>
  </item>
 </accesses>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "accesses": [
            {
                "addDate": "2016-03-14T09:11:24Z",
                "lastChangeDate": "2016-03-14T09:11:24Z",
                "accessLevel": [ "read", "write", "schema" ],
                "userId": "15010100000091",
                "userName": "dbv4h25r_ayapzk",
                "databaseId": "15010100000094"
            }
        ],
        "bundleId": null,
        "poolId": null,
        "accountId": "15010100000001",
        "addDate": "2016-03-14T09:11:24Z",
        "paidUntil": "2016-04-14T09:11:24Z",
        "renewOn": "2016-04-14T09:11:24Z",
        "deletionScheduledFor": null,
        "id": "15010100000094",
        "lastChangeDate": "2016-03-14T09:11:24Z",
        "name": "Example",
        "productCode": "database-mariadb-single-v1-12m",
        "restorableUntil": null,
        "status": "creating",
        "storageQuota": 512,
        "storageQuotaIncluded": 512,
        "storageQuotaUsedRatio": 0,
        "storageUsed": 0,
        "dbName": "dbv4h25r",
        "hostName": "dbv4h25r.mariadb.routing.zone",
        "dbEngine": "MariaDB",
        "dbType": "single",
        "forceSsl": false,
        "restrictions": [],
        "limitations": []
    },
    ...
}

```

```
<response>
 <response>
    <accesses>
        <item>
            <addDate>2016-03-14T09:11:24Z</addDate>
            <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
            <accessLevel>
                <item>read</item>
                <item>write</item>
                <item>schema</item>
            </accessLevel>
            <userId>15010100000091</userId>
            <dbLogin>dbv4h25r_ayapzk</dbLogin>
            <databaseId>15010100000094</databaseId>
        </item>
    </accesses>
    <bundleId></bundleId>
    <poolId></poolId>
    <accountId>1</accountId>
    <addDate>2016-03-14T09:11:24Z</addDate>
    <paidUntil>2016-04-14T09:11:24Z</paidUntil>
    <renewOn>2016-04-14T09:11:24Z</renewOn>
    <deletionScheduledFor></deletionScheduledFor>
    <id>15010100000094</id>
    <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
    <name>Example</name>
    <productCode>database-mariadb-single-v1-12m</productCode>
    <restorableUntil></restorableUntil>
    <status>creating</status>
    <storageQuota>512</storageQuota>
    <storageQuotaIncluded>512</storageQuotaIncluded>
    <storageQuotaUsedRatio>0</storageQuotaUsedRatio>
    <storageUsed>0</storageUsed>
    <dbName>dbv4h25r</dbName>
    <hostName>dbv4h25r.mariadb.routing.zone</hostName>
    <dbEngine>MariaDB</dbEngine>
    <dbType>single</dbType>
    <forceSsl>false</forceSsl>
    <limitations/>
    <restrictions/>
 </response>
</response>

```

Request | databaseCreate  
---|---  
Url |  https://secure.hosting.de/api/database/v1/jsonxml/databaseCreate  
Processing | asynchronous  
Response | [Database](https://www.hosting.de/api/#the-database-object)  
Parameter | Type | Required | Description  
---|---|---|---  
database | [Database object](https://www.hosting.de/api/#the-database-object) | req | Complete `database` object  
accesses | list <[databaseAccess object](https://www.hosting.de/api/#the-databaseaccess-object)> | req | List of user authorizations with access to `database` (list may be empty)  
poolId | string | opt | Needed if managed server product is purchased: Use managed server pool instead of shared servers.  
You can use the function `databaseCreate` create a new `database`. After the `database` is created users who are authorized can connect to it using a MySQL client.
## Updating Databases
> ##### POST https://secure.hosting.de/api/database/v1/jsonxml/databaseUpdate
```
{
    "authToken": "$$YOUR API KEY$$",
    "database": {
        "id": "15010100000094",
        "name": "Example",
        "productCode": "database-mariadb-single-v1-12m",
        "storageQuota": 1024
    },
    "accesses": [
        {
            "addDate": "2016-03-14T09:11:24Z",
            "lastChangeDate": "2016-03-14T09:11:24Z",
            "accessLevel": [ "read", "write", "schema" ],
            "userId": "15010100000091",
            "userName": "dbv4h25r_ayapzk",
            "databaseId": "15010100000094"
        }
    ]
}
```

```
<request>
 <accesses>
  <item>
    <addDate>2016-03-14T09:11:24Z</addDate>
    <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
    <accessLevel>
        <item>read</item>
        <item>write</item>
        <item>schema</item>
    </accessLevel>
    <userId>15010100000091</userId>
    <userName>dbv4h25r_ayapzk</userName>
    <databaseId>15010100000094</databaseId>
  </item>
 </accesses>
 <authToken>$$YOUR API KEY$$</authToken>
 <database>
  <id>15010100000094</id>
  <name>Example</name>
  <productCode>database-mariadb-single-v1-12m</productCode>
  <storageQuota>1024</storageQuota>
 </database>
</request>
```

> ##### Response
```
{
    ...
    "response": {
        "accesses": [
            {
                "addDate": "2016-03-14T09:11:24Z",
                "lastChangeDate": "2016-03-14T09:11:24Z",
                "accessLevel": [ "read", "write", "schema" ],
                "userId": "15010100000091",
                "userName": "dbv4h25r_ayapzk",
                "databaseId": "15010100000094"
            }
        ],
        "bundleId": null,
        "poolId": null,
        "accountId": "15010100000001",
        "addDate": "2016-03-14T09:11:24Z",
        "paidUntil": "2016-04-14T09:11:24Z",
        "renewOn": "2016-04-14T09:11:24Z",
        "deletionScheduledFor": null,
        "id": "15010100000094",
        "lastChangeDate": "2016-03-14T09:11:24Z",
        "name": "Example",
        "productCode": "database-mariadb-single-v1-12m",
        "restorableUntil": null,
        "status": "active",
        "storageQuota": 1024,
        "storageQuotaIncluded": 512,
        "storageQuotaUsedRatio": 0,
        "storageUsed": 0,
        "dbName": "dbv4h25r",
        "hostName": "dbv4h25r.mariadb.routing.zone",
        "dbEngine": "MariaDB",
        "dbType": "single",
        "forceSsl": false,
        "restrictions": [],
        "limitations": []
    },
    ...
}

```

```
<response>
 <response>
    <accesses>
        <item>
            <addDate>2016-03-14T09:11:24Z</addDate>
            <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
            <accessLevel>
                <item>read</item>
                <item>write</item>
                <item>schema</item>
            </accessLevel>
            <userId>15010100000091</userId>
            <dbLogin>dbv4h25r_ayapzk</dbLogin>
            <databaseId>15010100000094</databaseId>
        </item>
    </accesses>
    <bundleId></bundleId>
    <poolId></poolId>
    <accountId>1</accountId>
    <addDate>2016-03-14T09:11:24Z</addDate>
    <paidUntil>2016-04-14T09:11:24Z</paidUntil>
    <renewOn>2016-04-14T09:11:24Z</renewOn>
    <deletionScheduledFor></deletionScheduledFor>
    <id>15010100000094</id>
    <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
    <name>Example</name>
    <productCode>database-mariadb-single-v1-12m</productCode>
    <restorableUntil></restorableUntil>
    <status>active</status>
    <storageQuota>1024</storageQuota>
    <storageQuotaIncluded>512</storageQuotaIncluded>
    <storageQuotaUsedRatio>0</storageQuotaUsedRatio>
    <storageUsed>0</storageUsed>
    <dbName>dbv4h25r</dbName>
    <hostName>dbv4h25r.mariadb.routing.zone</hostName>
    <dbEngine>MariaDB</dbEngine>
    <dbType>single</dbType>
    <forceSsl>false</forceSsl>
    <limitations/>
    <restrictions/>
 </response>
</response>

```

Request | databaseUpdate  
---|---  
Url |  https://secure.hosting.de/api/database/v1/jsonxml/databaseUpdate  
Processing | asynchronous  
Response | [Database](https://www.hosting.de/api/#the-database-object)  
Parameter | Type | Required | Description  
---|---|---|---  
database | [Database object](https://www.hosting.de/api/#the-database-object) | req | Complete `database` object  
accesses | list <[databaseAccess object](https://www.hosting.de/api/#the-databaseaccess-object)> | req | List of user authorizations with access to `database` (list may be empty)  
The `database` that you want to update is identified by it’s `id`. All fields not marked _out-only_ are set to the values in the `database` argument. Optional fields that are not specified in this call are reset to their default values.
The list of authorized users for this database is replaced by the list in the parameter accesses.
## Deleting Databases
> ##### POST https://secure.hosting.de/api/database/v1/jsonxml/databaseDelete
```
{
    "authToken": "$$YOUR API KEY$$",
    "databaseId": "15010100000094"
}

```

```
<request>
 <authToken>$$YOUR API KEY$$</authToken>
 <databaseId>15010100000094</databaseId>
</request>

```

> ##### Response
```
{
    ...
    "response": {
        "accesses": [
            {
                "addDate": "2016-03-14T09:11:24Z",
                "lastChangeDate": "2016-03-14T09:11:24Z",
                "accessLevel": [ "read", "write", "schema" ],
                "userId": "15010100000091",
                "userName": "dbv4h25r_ayapzk",
                "databaseId": "15010100000094"
            }
        ],
        "bundleId": null,
        "poolId": null,
        "accountId": "15010100000001",
        "addDate": "2016-03-14T09:11:24Z",
        "paidUntil": "2016-04-14T09:11:24Z",
        "renewOn": "2016-04-14T09:11:24Z",
        "deletionScheduledFor": null,
        "id": "15010100000094",
        "lastChangeDate": "2016-03-14T09:11:24Z",
        "name": "Example",
        "productCode": "database-mariadb-single-v1-12m",
        "restorableUntil": null,
        "status": "creating",
        "storageQuota": 512,
        "storageQuotaIncluded": 512,
        "storageQuotaUsedRatio": 0,
        "storageUsed": 0,
        "dbName": "dbv4h25r",
        "hostName": "dbv4h25r.mariadb.routing.zone",
        "dbEngine": "MariaDB",
        "dbType": "single",
        "forceSsl": false,
        "restrictions": [],
        "limitations": []
    },
    ...
}

```

```
<response>
 <response>
    <accesses>
        <item>
            <addDate>2016-03-14T09:11:24Z</addDate>
            <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
            <accessLevel>
                <item>read</item>
                <item>write</item>
                <item>schema</item>
            </accessLevel>
            <userId>15010100000091</userId>
            <dbLogin>dbv4h25r_ayapzk</dbLogin>
            <databaseId>15010100000094</databaseId>
        </item>
    </accesses>
    <bundleId></bundleId>
    <poolId></poolId>
    <accountId>1</accountId>
    <addDate>2016-03-14T09:11:24Z</addDate>
    <paidUntil>2016-04-14T09:11:24Z</paidUntil>
    <renewOn>2016-04-14T09:11:24Z</renewOn>
    <deletionScheduledFor></deletionScheduledFor>
    <id>15010100000094</id>
    <lastChangeDate>2016-03-14T09:11:24Z</lastChangeDate>
    <name>Example</name>
    <productCode>database-mariadb-single-v1-12m</productCode>
    <restorableUntil></restorableUntil>
    <status>creating</status>
    <storageQuota>512</storageQuota>
    <storageQuotaIncluded>512</storageQuotaIncluded>
    <storageQuotaUsedRatio>0</storageQuotaUsedRatio>
    <storageUsed>0</storageUsed>
    <dbName>dbv4h25r</dbName>
    <hostName>dbv4h25r.mariadb.routing.zone</hostName>
    <dbEngine>MariaDB</dbEngine>
    <dbType>single</dbType>
    <forceSsl>false</forceSsl>
    <limitations/>
    <restrictions/>
 </response>
</response>

```

Request | databaseDelete  
---|---  
Url |  https://secure.hosting.de/api/database/v1/jsonxml/databaseDelete  
Processing | asynchronous  
Response | [Database](https://www.hosting.de/api/#the-database-object)  
Parameter | Type | Required | Description  
---|---|---|---  
databaseId | string | req | ID of database to be deleted  
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
# Managed Application
Our first Managed Application is Managed Nextcloud.
Please keep in mind that all API methods of our managed applications might get breaking changes in future releases. 
These breaking changes might be released without prior information.
Please send your e-mail address to our support to get information about changes.
## Managed Nextcloud
Managed Nextcloud allows you to create fully managed Nextclouds with a set of additional Apps.
Most of the following objects are handled within the nextcloudCreate/nextcloudUpdate methods.
## The NextcloudUser Object
```
{
    "addDate": "2019-09-13T07:42:25Z",
    "emailAddress": "ernst@hosting.de",
    "enabled": true,
    "groups": [
        "Test"
    ],
    "lastChangeDate": "2022-12-30T09:54:50Z",
    "name": "Michi",
    "nextcloudId": "190913utddcl2hmyy7a",
    "status": "active",
    "storageQuota": -1,
    "username": "m.ernst"
}
```

```

```

The `nextcloud user object` is used as a User for Managed Nextcloud. Nextcloud Users are managed within the Nextcloud API Methods.
#### NextcloudUser Object
Property | Type | Required / Direction | Description  
---|---|---|---  
nextcloudId | string | out-only |   
enabled | bool | required |   
name | string | required |   
username | string | required |   
emailAddress | string | required |   
groups | list<string> | required |   
storageQuota | int | required |   
status | string | out-only |   
addDate | datetime | out-only |   
lastChangeDate | datetime | out-only |   
## The NextcloudUserWithPassword Object
#### NextcloudUserWithPassword Object
All Values from [NextcloudUser Object](https://www.hosting.de/api/#the-nextclouduser-object) plus:
Property | Type | Required / Direction | Description  
---|---|---|---  
password | string | optional |   
## Listing NextcloudUsers
> ##### POST https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudUsersFind 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "filter": {
      "field": "NextcloudId",
      "value": "190913utddcl2hmyy7a"
    },
    "limit": 5,
    "page": 1,
    "sort": {
      "field": "NextcloudUserName",
      "order": "ASC"
    }
}
```

```

```

> ##### Response
```
{
    ...
    "response": {
        "data": [
            // nextcloud user objects
        ],
        "limit": 1,
        "page": 1,
        "totalEntries": 1,
        "totalPages": 1,
        "type": "FindNextcloudUsersResult"
    },
    ...
}
```

```

```

Request | nextcloudUsersFind  
---|---  
Url |  https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudUsersFind  
Processing | synchronous  
Response | [FindNextcloudUsersResult](https://www.hosting.de/api/#filtering-and-sorting)  
## The NextcloudUserDeleteData Object
#### NextcloudUserDeleteData Object
Property | Type | Required / Direction | Description  
---|---|---|---  
username | string | required |   
usernameForFileTransfer | string | optional |   
## The NextcloudConfiguration Object
#### NextcloudConfiguration Object
Property | Type | Required / Direction | Description  
---|---|---|---  
configSchema | string | out-only |   
currentConfiguration | string | optional |   
## The NextcloudApp Object
#### NextcloudApp Object
Property | Type | Required / Direction | Description  
---|---|---|---  
id | string | out-only |   
name | string | out-only |   
description | string | out-only |   
longDescription | string | out-only |   
categories | list<string> | out-only |   
link | string | out-only |   
images | list<string> | out-only |   
helpdeskArticles | listl | out-only |   
productCode | string | out-only |   
availableInNextcloudProducts | list | out-only |   
requiresConfiguration | bool | out-only |   
featured | bool | out-only |   
version | string | out-only |   
## The NextcloudAppConfig Object
#### NextcloudAppConfig Object
Property | Type | Required / Direction | Description  
---|---|---|---  
appId | string | out-only |   
appConfigSchema | string | out-only |   
appCurrentConfig | string | optional |   
## The NextcloudAppConfigInput Object
#### NextcloudAppConfigInput Object
Property | Type | Required / Direction | Description  
---|---|---|---  
appId | string | required |   
configuration | string | required |   
## The NextcloudAppForGroups Object
#### NextcloudAppForGroups Object
Property | Type | Required / Direction | Description  
---|---|---|---  
app | string | required |   
groupNames | list<string> | required |   
## The NextcloudGroup Object
#### NextcloudGroup Object
Property | Type | Required / Direction | Description  
---|---|---|---  
name | string | required |   
nextcloudId | string | required |   
addDate | datetime | out-only |   
lastChangeDate | datetime | out-only |   
## The NextcloudGroupFolder Object
#### NextcloudGroupFolder Object
Property | Type | Required / Direction | Description  
---|---|---|---  
id | string | optional |   
name | string | required |   
groupPermissions | list<NextcloudGroupFolderPermission> | required | cf. [NextcloudGroupFolderPermission Object](https://www.hosting.de/api/#the-nextcloudgroupfolderpermission-object)  
quota | int | required |   
folderAdmins | list<string> | optional |   
## The NextcloudGroupFolderPermission Object
#### NextcloudGroupFolderPermission Object
Property | Type | Required / Direction | Description  
---|---|---|---  
groupName | string | required |   
permissions | list<string> | required |   
## The NextcloudGroupWithUsernames Object
#### NextcloudGroupWithUsernames Object
Property | Type | Required / Direction | Description  
---|---|---|---  
group |  | required | cf. [NextcloudGroup Object](https://www.hosting.de/api/#the-nextcloudgroup-object)  
list | list < string > | required |   
## The Nextcloud Object
```
{
    "accountId": "160311203476729",
    "addDate": "2019-09-13T07:42:24Z",
    "additionalTrafficQuota": 0,
    "appsForGroups": [
    ],
    "backupEnabled": true,
    "comments": "",
    "currentNumberOfUsers": 2,
    "defaultDomainName": "190913utddcl2hmyy7a.nextcloud.hosting.zone",
    "deletionScheduledFor": null,
    "enabledApps": [
        "calendar",
        "collabora",
        "deck",
        "groupfolders",
        "mail",
        "notes",
        "tasks",
        "twofactor_totp"
    ],
    "id": "190913utddcl2hmyy7a",
    "includedNumberOfUsers": 10,
    "individualDomainName": "cloud.messe-hosting.de",
    "individualDomainNameAce": "cloud.messe-hosting.de",
    "individualDomainNameStatus": "active",
    "individualDomainNameUnicode": "cloud.messe-hosting.de",
    "ipv4Address": "213.160.71.138",
    "ipv6Address": "2a00:17d8:0200:0000:0000:0000:0000:01b1",
    "lastChangeDate": "2025-03-31T02:15:27Z",
    "maxNumberOfUsers": 10,
    "name": "Demo Managed Nextcloud",
    "nextcloudVersion": "29.0.12",
    "officeUsers": 1,
    "officeUsersIncluded": 1,
    "paidUntil": "2025-04-13T07:42:24Z",
    "productCode": "managed-application-nextcloud-100-1m",
    "renewOn": "2025-04-13T07:42:24Z",
    "restorableUntil": null,
    "restrictions": [
    ],
    "status": "active",
    "storageQuota": 102400,
    "storageQuotaIncluded": 102400,
    "storageQuotaUsedRatio": 0.04,
    "storageUsed": 45,
    "talkUsers": 0,
    "talkUsersIncluded": 0,
    "trafficQuota": 1024000,
    "trafficQuotaUsedRatio": 0,
    "trafficResetAt": "2019-10-13T07:42:24Z",
    "trafficUsed": 0,
    "userDirectory": "nextcloud"
}
```

```

```

#### Nextcloud Object
Property | Type | Required / Direction | Description  
---|---|---|---  
id | string | out-only |   
accountId | string | optional |   
name | datetime | required |   
comments | string | optional |   
defaultDomainName | string | out-only |   
individualDomainName | datetime | out-only |   
individualDomainNameAce | string | out-only |   
individualDomainNameUnicode | string | out-only |   
individualDomainNameStatus | datetime | out-only |   
storageQuotaIncluded | int | out-only |   
storageQuota | int | optional |   
storageUsed | int | out-only |   
storageQuotaUsedRatio | float | out-only |   
trafficQuota | int | out-only |   
trafficUsed | int | out-only |   
additionalTrafficQuota | int | out-only |   
trafficQuotaUsedRatio | float | out-only |   
status | string | out-only |   
trafficResetAt | datetime | out-only |   
productCode | string | required |   
ipv4Address | string | out-only |   
ipv6Address | string | out-only |   
includedNumberOfUsers | int | out-only |   
maxNumberOfUsers | int | required |   
currentNumberOfUsers | int | out-only |   
talkUsersIncluded | int | out-only |   
talkUsers | int | out-only |   
officeUsersIncluded | int | out-only |   
officeUsers | int | optional |   
nextcloudVersion | string | out-only |   
userDirectory | string | out-only |   
enabledApps | list<string> | required |   
appsForGroups | list<NextcloudAppForGroups> | optional | cf. [NextcloudAppForGroups Object](https://www.hosting.de/api/#the-nextcloudappforgroups-object)  
backupEnabled | bool | required |   
restrictions | list<Restriction> | out-only | cf. [Restriction Object](https://www.hosting.de/api/#the-restriction-object)  
paidUntil | datetime | out-only |   
renewOn | datetime | out-only |   
deletionScheduledFor | datetime | out-only |   
restorableUntil | datetime | out-only |   
addDate | datetime | out-only |   
lastChangeDate | datetime | out-only |   
## Listing Managed Nextclouds
> ##### POST https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudsFind 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "filter": {
        "field": "NextcloudId",
        "value": "190913utddcl2hmyy7a"
    },
    "limit": 10,
    "page": 1,
    "sort": {
        "field": "NextcloudId",
        "order": "asc"
    }
}
```

```

```

> ##### Response
```
{
    ...
    "response": {
        "data": [
            // nextcloud objects
        ],
        "limit": 1,
        "page": 1,
        "totalEntries": 1,
        "totalPages": 1,
        "type": "FindNextcloudsResult"
    },
    ...
}
```

```

```

Request | nextcloudsFind  
---|---  
Url |  https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudsFind  
Processing | synchronous  
Response | [FindNextcloudsResult](https://www.hosting.de/api/#filtering-and-sorting)  
When listing nextclouds, you use the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `nextcloudsFind`. The response will contain a list of [Nextcloud objects](https://www.hosting.de/api/#the-nextcloud-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
NextcloudId | ID of the nextcloud  
AccountId | Account ID of the nextcloud  
NextcloudName | Name of the nextcloud  
NextcloudDefaultDomainName |   
NextcloudStorageQuotaIncluded |   
NextcloudStorageQuota |   
NextcloudStorageUsed |   
NextcloudStorageQuotaUsedRatio |   
NextcloudTrafficQuota |   
NextcloudTrafficUsed |   
NextcloudAdditionalTrafficQuota |   
NextcloudTrafficQuotaUsedRatio |   
NextcloudTrafficResetAt |   
NextcloudStatus |   
NextcloudProductCode |   
NextcloudIPv4Address |   
NextcloudIPv6Address |   
NextcloudIncludedNumberOfUsers |   
NextcloudMaxNumberOfUsers |   
NextcloudCurrentNumberOfUsers |   
NextcloudTalkUsersIncluded |   
NextcloudTalkUsers |   
NextcloudOfficeUsersIncluded |   
NextcloudOfficeUsers |   
NextcloudPaidUntil |   
NextcloudRenewOn |   
NextcloudDeletionScheduldedFor |   
NextcloudRestorableUntil |   
NextcloudAddDate |   
NextcloudLastChangeDate |   
## Creating new Managed Nextclouds
> ##### POST https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudCreate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "nextcloud": {
      "accountId": "ID of your Account or Subaccount",
      "backupEnabled": false,
      "enabledApps": [],
      "maxNumberOfUsers": 0,
      "name": "Nextcloud Name",
      "productCode": "managed-application-nextcloud-100-12m"
    },
    "users": [
      {
        "password": "xxx",
        "user": {
          "emailAddress": "user1@example.com",
          "enabled": true,
          "groups": [],
          "name": "user1",
          "storageQuota": 102400,
          "username": "user1"
        }
      }
    ],
    "appConfigs": []
}
```

```

```

> ##### Response
```
{
    ...
    "response": {
        // nextcloud object
    },
    "status": "pending",
    ...
}

```

```

```

Request | nextcloudCreate  
---|---  
Url |  https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudCreate  
Processing | asynchronous  
Response | [Nextcloud object](https://www.hosting.de/api/#the-nextcloud-object)  
Parameter | Type | Required / Direction | Description  
---|---|---|---  
nextcloud | Nextcloud object | required |   
users | list<NextcloudUserWithPassword> | required | cf. [NextcloudUserWithPassword Object](https://www.hosting.de/api/#the-nextclouduserwithpassword-object)  
nextcloudConfiguration | string | optional |   
appConfigs | list<NextcloudAppConfigInput> | optional | cf. [NextcloudAppConfigInput Object](https://www.hosting.de/api/#the-nextcloudappconfiginput-object)  
nextcloudServerId | string | optional |   
voucherCode | string | optional |   
In order to create a Managed Nextcloud, you need to send a `nextcloudCreate` request.
## Updating Nextclouds
> ##### POST https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudUpdate 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "nextcloud": {
      // Nextcloud Object
    }
}
```

```

```

Request | nextcloudUpdate  
---|---  
Url |  https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudUpdate  
Processing | asynchronous  
Response | [Nextcloud object](https://www.hosting.de/api/#the-nextcloud-object)  
Parameter | Type | Required / Direction | Description  
---|---|---|---  
nextcloud | Nextcloud object | required |   
nextcloudConfiguration | string | optional |   
appConfigs | list<NextcloudAppConfigInput> | optional | cf. [NextcloudAppConfigInput Object](https://www.hosting.de/api/#the-nextcloudappconfiginput-object)  
## Listing Nextcloud Users
> ##### POST https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudUsersFind 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "filter": {
      "field": "NextcloudId",
      "value": "190913utddcl2hmyy7a"
    },
    "limit": 5,
    "page": 1,
    "sort": {
      "field": "NextcloudUserName",
      "order": "ASC"
    }
}
```

```

```

> ##### Response
```
{
    ...
    "response": {
        "data": [
            // nextcloud user objects
        ],
        "limit": 1,
        "page": 1,
        "totalEntries": 1,
        "totalPages": 1,
        "type": "FindNextcloudUsersResult"
    },
    ...
}
```

```

```

Request | nextcloudUsersFind  
---|---  
Url |  https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudUsersFind  
Processing | synchronous  
Response | [FindNextcloudUsersResult](https://www.hosting.de/api/#filtering-and-sorting)  
When listing nextcloud Users, you use the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `nextcloudUsersFind`. The response will contain a list of [Nextcloud User objects](https://www.hosting.de/api/#the-nextclouduser-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
NextcloudUserId | ID of the nextcloud user  
NextcloudId | ID of the nextcloud, e.g. to find all Users from a nextcloud  
NextcloudUserName |   
NextcloudUserUsername |   
NextcloudUserEmailAddress |   
NextcloudUserIsRemnant |   
NextcloudGroupName |   
NextcloudUserAddDate |   
NextcloudUserLastChangeDate |   
## Modifying Nextcloud Users
> ##### POST https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudModifyUsers 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "nextcloudId": "250331353rvblb523ru",
    "userDeleteData": [],
    "usersToAdd": [],
    "usersToUpdate": [
      {
        // Nextcloud User With Password
      }
    ],
    "groupsToDelete": null
  }
```

```

```

Request | nextcloudModifyUsers  
---|---  
Url |  https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudModifyUsers  
Processing | asynchronous  
Response | none  
Parameter | Type | Required / Direction | Description  
---|---|---|---  
nextcloudId | string | required |   
usersToAdd | list<NextcloudUserWithPassword> | optional | cf. [NextcloudUserWithPassword Object](https://www.hosting.de/api/#the-nextclouduserwithpassword-object)  
usersToUpdate | list<NextcloudUserWithPassword> | optional | cf. [NextcloudUserWithPassword Object](https://www.hosting.de/api/#the-nextclouduserwithpassword-object)  
userDeleteData | list<NextcloudUserDeleteData> | optional | cf. [NextcloudUserDeleteData Object](https://www.hosting.de/api/#the-nextclouduserdeletedata-object)  
groupsToDelete | list<string> | optional |   
## Listing Nextcloud Groups
> ##### POST https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudGroupsFind 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "filter": {
      "field": "NextcloudId",
      "value": "190913utddcl2hmyy7a"
    },
    "limit": 5,
    "page": 1,
    "sort": {
      "field": "NextcloudGroupName",
      "order": "ASC"
    }
}
```

```

```

> ##### Response
```
{
    ...
    "response": {
        "data": [
            // nextcloud group objects
        ],
        "limit": 1,
        "page": 1,
        "totalEntries": 1,
        "totalPages": 1,
        "type": "FindNextcloudGroupsResult"
    },
    ...
}
```

```

```

Request | nextcloudGroupsFind  
---|---  
Url |  https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudGroupsFind  
Processing | synchronous  
Response | [FindNextcloudGroupsResult](https://www.hosting.de/api/#filtering-and-sorting)  
When listing nextcloud Groups, you use the generic [filtering and sorting API](https://www.hosting.de/api/#filtering-and-sorting) with the method `nextcloudGroupsFind`. The response will contain a list of [Nextcloud Group objects](https://www.hosting.de/api/#the-nextcloudgroup-object).
The following fields are available for filtering and sorting:
Field | Description  
---|---  
NextcloudGroupId | ID of the nextcloud group  
NextcloudId | ID of the nextcloud  
NextcloudGroupName |   
NextcloudGroupAddDate |   
NextcloudGroupLastChangeDate |   
## Updating or deleting Nextcloud Groups
Updating or deleting nextcloud groups is done within the methods for modifying users, see [Modifying Nextcloud Users](https://www.hosting.de/api/#modifying-nextcloud-users).
## Modifying (Create, Update, Delete) Groupfolders
Nextcloud Group Folders is a feature that allows administrators to create and manage shared folders that are accessible to multiple users within a Nextcloud instance. These folders are managed at the system level rather than being owned by an individual user, making them ideal for teams and organizations.
For using groupfolders, you have to install the App "groupfolders" within the nextcloud.
> ##### POST https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudModifyGroupFolders 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "nextcloudId": "250331353rvblb523ru",
    "groupFolders": [
      {
        "name": "Test",
        "groupPermissions": [
          {
            "groupName": "Test",
            "permissions": []
          }
        ],
        "quota": -1
      }
    ],
    "groupFoldersToDelete": []
}
```

```

```

Request | nextcloudModifyGroupFolders  
---|---  
Url |  https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudModifyGroupFolders  
Processing | asynchronous  
Response | none  
Parameter | Type | Required / Direction | Description  
---|---|---|---  
nextcloudId | string | required |   
groupFolders | list<NextcloudGroupFolder> | optional | cf. [NextcloudGroupFolder Object](https://www.hosting.de/api/#the-nextcloudgroupfolder-object)  
groupFoldersToDelete | list<string> | optional |   
## Nextcloud Apps
Nextcloud Apps are additional applications which can be installed within the managed nextcloud.
Nextcloud Apps might need additional configuration. When an app requires additional configuration, the parameter `requiresConfiguration` of [the NextcloudApp Object](https://www.hosting.de/api/#the-nextcloudapp-object) is true.
An app is installed via the `nextcloudUpdate` method.
Please keep in mind that the configuration of an app can change without notice. 
## Listing Nextcloud Apps
> ##### POST https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudAppsList 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "nextcloudId": "250331353rvblb523ru"
}
```

```

```

> ##### Response
```
{
    ...
    "response": {
        "data": [
             {
                "categories": [
                    "Files"
                ],
                "description": "Create shared folders for groups.",
                "featured": true,
                "helpdeskArticles": [
                ],
                "id": "groupfolders",
                "images": [
                    "nextcloudapps/groupfolders/groupfolders-1.png"
                ],
                "link": "https://apps.nextcloud.com/apps/groupfolders",
                "longDescription": "Create and manage shared folders for groups, granting specific write, delete and share permissions for each group.",
                "name": "Group folders",
                "productCode": null,
                "requiresConfiguration": false,
                "version": "13.1.1"
            },
            ...
        ]
    },
    ...
}

```

```

```

Request | nextcloudAppsList  
---|---  
Url |  https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudAppsList  
Processing | synchronous  
Response | NextcloudAppsListResult  
Parameter | Type | Required / Direction | Description  
---|---|---|---  
language | string | optional |   
productCode | string | optional |   
nextcloudId | string | optional |   
productFamily | string | optional |   
## Getting Nextcloud App Config
If an app requires a configuration, one can request the default layout of the configuration via `nextcloudAppGetConfiguration` when the parameter `nextcloudId` is ommited.
The parameter `appConfigSchema` is a JSON-encoded string which contains all configuration options for an app.
When [updating a nextcloud](https://www.hosting.de/api/#updating-nextclouds), the parameter `appConfigs` contains a list of [NextcloudAppConfigInput Objects](https://www.hosting.de/api/#the-nextcloudappconfiginput-object) with the additional configuration.
> ##### POST https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudAppGetConfiguration 
```
{
    "authToken": "$$YOUR API KEY$$",
    "clientTransactionId": "",
    "appId": "groupfolders",
    "language": "de_DE"
}
```

```

```

> ##### Response
```
{
    ...
    "response": {
        "appConfigSchema": null,
        "appCurrentConfig": null,
        "appId": "groupfolders"
    },
    ...
}
```

```

```

Request | nextcloudAppGetConfiguration  
---|---  
Url |  https://secure.hosting.de/api/managedapplication/v1/jsonxml/nextcloudAppGetConfiguration  
Processing | synchronous  
Response | [NextcloudAppConfig](https://www.hosting.de/api/#the-nextcloudappconfig-object)  
Parameter | Type | Required / Direction | Description  
---|---|---|---  
appId | string | optional |   
nextcloudId | string | optional |   
language | string | optional |   
[JSON](https://www.hosting.de/api/#) [XML](https://www.hosting.de/api/#)
