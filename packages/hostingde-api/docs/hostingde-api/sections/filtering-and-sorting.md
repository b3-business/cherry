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
