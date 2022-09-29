## APIs:
### GET
* State (list)
    ```
        StateId
        StateName
        StateCode
    ```

* District (list -> filter by multiple States [Ids])
    ```
        DistrictId
        DistrictName
        DistrictCode
        StateId
        StateName
    ```

* Block   (list -> filter by district and states [ids])
    ```
        BlockId
        BlockName
        BlockCode
        DistrictId
        DistrictName
        StateId
        StateName
    ```

* Gram Panchayat   (list -> filter by blocks,districts and states [ids])
     ```
        BlockId
        BlockName
        BlockCode
        DistrictId
        DistrictName
        StateId
        StateName
    ```

* Village   (list -> filter by pachayats,blocks,districts and states [ids])
    ```
        VillageId
        VillageName
        VillageCode
        BlockId
        BlockName
        BlockCode
        DistrictId
        DistrictName
        StateId
        StateName
    ```

* Habitation   (list -> filter by villages[ids])
    ```
        HabitationId
        HabitationName
        VillageId
        VillageName
        VillageCode
        BlockId
        BlockName
        BlockCode
        DistrictId
        DistrictName
        StateId
        StateName
        households
        FHTC
        Contamination
    ```
* Schemes   (list -> filter by villages[ids])
    ```
        SchemeId
        SchemeName
        VillageId
    ```
* SchemeSources (list -> filter by villages[ids])
    ```
        SchemeSourceId
        Schemes (comma seaprated scheme id)
        ,[HabitationId]
        ,[VillageId]
        ,[Location]
        ,[DateOfCommissioning]
        ,[SchemesSanctionYear]
        ,[SchemeSanctionYear]
        ,[Latitude]
        ,[Longitude]
    ```
* ContactDetail (list -> filter by villages[ids])
    ```
        Name,
        Designation,
        Mobile,
        [Level],
        VillageId
    ```
### POST
If we have to push data into NIC database then we require APIs for below table
* SchemeSources
* ContactDetail
