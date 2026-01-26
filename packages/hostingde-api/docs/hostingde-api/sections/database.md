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
