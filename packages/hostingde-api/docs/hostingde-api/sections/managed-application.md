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
