# Dashboard APIs
## 1. Total number of Households
`Request`
```sh
Url: {baseurl}/total-number-of-households
Query: {                            // Filter
    stateId:{state_id},             // String - Optional
    districtId:{district_id},       // String - Optional
    blockId:{block_id},             // String - Optional
    gramPanchayatId:{gp_id},        // String - Optional
    villageId:{village_id},         // String - Optional
    fromDate:{YYYY-MM-DD},          // String - Optional
    toDate:{YYYY-MM-DD}             // String
}
Method: GET
```
`Response`
```sh
{
    success: true,              // Boolean
    message:"",                 // String
    count:100                   // Number
}
```
## 2. Number of households with tap water connection
`Request`
```sh
Url: {baseurl}/number-of-households-with-connection
Query: {                            // Filter
    stateId:{state_id},             // String - Optional
    districtId:{district_id},       // String - Optional
    blockId:{block_id},             // String - Optional
    gramPanchayatId:{gp_id},        // String - Optional
    villageId:{village_id},         // String - Optional
    fromDate:{YYYY-MM-DD},          // String - Optional
    toDate:{YYYY-MM-DD}             // String
}
Method: GET
```
`Response`
```sh
{
    success: true,              // Boolean
    message:"",                 // String
    count:100                   // Number
}
```
## 3. Har Ghar Jal [100 % HHs with tap water connections]
* 100 % FHTC Districts
* 100 % FHTC Blocks
* 100 % FHTC Panchayats
* 100 % FHTC Villages

`Request`
```sh
Url: {baseurl}/100percent-hh-with-tap-water-connections
Query: {                            // Filter
    stateId:{state_id},             // String - Optional
    districtId:{district_id},       // String - Optional
    blockId:{block_id},             // String - Optional
    gramPanchayatId:{gp_id},        // String - Optional
    villageId:{village_id},         // String - Optional
    fromDate:{YYYY-MM-DD},          // String - Optional
    toDate:{YYYY-MM-DD}             // String
}
Method: GET
```
`Response`
```sh
{
    success: true,              // Boolean
    message:"",                 // String
    districtCount:100           // Number
    blockCount:100              // Number
    gpCount:100                 // Number
    villageCount:100            // Number
}
```