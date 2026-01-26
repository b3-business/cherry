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
