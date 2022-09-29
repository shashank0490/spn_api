const Designation = require('../model').designation;

module.exports = async (req, res) => {
    try {
        let where = req.query ? req.query : {};
        let data = await Designation.findAll({where,raw : true});
        return res.Ok(data,"FETCHED DATA.")
    } catch (caughtErr) {
        return res.BadRequest(caughtErr,"CAUGHT EXCEPTION.")
    }
}