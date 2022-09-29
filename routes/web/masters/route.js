const express = require('express');
const apiRoutes = express.Router();
const master = require('./');
const { filterBind } = require('../../utils/common-function');


apiRoutes.get("/master/country",filterBind, master.country.get);
apiRoutes.get("/master/state",filterBind, master.state.get);
apiRoutes.get("/master/district",filterBind, master.district.get);
apiRoutes.get("/master/city",filterBind, master.city.get);
apiRoutes.get("/master/resource-type",filterBind, master.resourceType.get);
apiRoutes.get("/master/source-type",filterBind, master.sourceType.get);
apiRoutes.get("/master/ngo-source-type",filterBind, master.ngoSourceType.get);
apiRoutes.get("/master/designation",filterBind, master.designation.get);
apiRoutes.get("/master/bu",filterBind, master.bu.get);
apiRoutes.get("/master/donor",filterBind, master.donor.get);
apiRoutes.get("/master/entity-type",filterBind, master.entityType.get);
apiRoutes.get("/master/event-type",filterBind, master.eventType.get);
apiRoutes.get("/master/financial-year",filterBind, master.financialYear.get);
apiRoutes.get("/master/organization-type",filterBind, master.orgnazitaionType.get);
apiRoutes.get("/master/sector",filterBind, master.sector.get);
apiRoutes.get("/master/sub-sector",filterBind, master.subSector.get);


apiRoutes.post("/master/designation",filterBind, master.designation.post);

apiRoutes.get("/master/designation/delete",filterBind, master.designation.delete);

module.exports = apiRoutes;