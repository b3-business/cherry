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
