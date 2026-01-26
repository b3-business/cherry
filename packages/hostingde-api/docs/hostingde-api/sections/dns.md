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
