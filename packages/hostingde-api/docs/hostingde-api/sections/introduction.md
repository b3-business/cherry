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
