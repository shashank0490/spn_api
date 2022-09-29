const Donor = require('../model').donor;

module.exports = async (req, res) => {
    try {
        let where = req.query ? req.query : {};
        let data = await Donor.findAll({where,raw : true});
        return res.Ok(data,"FETCHED DATA.");
    } catch (caughtErr) {
        return res.BadRequest(caughtErr,"CAUGHT EXCEPTION.");
    }
}