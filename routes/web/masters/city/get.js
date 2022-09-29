const City = require('../model').city;

module.exports = async (req, res) => {
    try {
        let where = req.query ? req.query : {};
        let data = await City.findAll({where,raw : true});
        res.Ok(data,"FETCHED DATA.")
    } catch (caughtErr) {
        return res.BadRequest(caughtErr,"CAUGHT EXCEPTION.")
    }
}