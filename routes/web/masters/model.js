const modelPath = require('../../../dbConnection/index');
module.exports = {
    country : modelPath.country,
    state : modelPath.state,
    district : modelPath.district,
    city : modelPath.city,
    resourceType : modelPath.resource_type,
    sourceType : modelPath.source_type,
    ngoSourceType : modelPath.ngo_source_type,
    bu : modelPath.bu,
    designation : modelPath.designation,
    donor : modelPath.donor,
    entityType : modelPath.entity_type,
    eventType : modelPath.event_type,
    financialYear : modelPath.financial_year,
    organizationType : modelPath.organization_type,
    sector : modelPath.sector,
    subSector : modelPath.sub_sector,
}