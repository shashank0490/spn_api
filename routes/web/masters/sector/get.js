const Sector = require('../model').sector;

module.exports = async (req, res) => {
    try {
        let where = req.query ? req.query : {};
        let data = await Sector.findAll({where,raw : true});
        return res.Ok(data,"FETCHED DATA.");
    } catch (caughtErr) {
        return res.BadRequest(caughtErr,"CAUGHT EXCEPTION.");
    }
}