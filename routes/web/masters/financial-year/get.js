const FY = require('../model').financialYear;

module.exports = async (req, res) => {
    try {
        let where = req.query ? req.query : {};
        let data = await FY.findAll({where,raw : true});
        return res.Ok(data,"FETCHED DATA.");
    } catch (caughtErr) {
        return res.BadRequest(caughtErr,"CAUGHT EXCEPTION.")
    }
}