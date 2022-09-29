const State = require('../model').state;

module.exports = async (req, res) => {
    try {
        let where = req.query ? req.query : {};
        let data = await State.findAll({where,raw : true});
        return res.Ok(data,"FETCHED DATA.");
    } catch (caughtErr) {
        return res.BadRequest(caughtErr,"CAUGHT EXCEPTION.")
    }
}