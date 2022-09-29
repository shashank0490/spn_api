const Designation = require('../model').designation;

module.exports = async (req, res) => {
    try {
        if(!req.query) throw new Error('Request parameter must be not empty.');
        let where = req.query;
        let data = await Designation.destroy({where});
        return res.Ok(data,"DELETE SUCCESSFULLY.");
    } catch (caughtErr) {
        return res.BadRequest(caughtErr,"CAUGHT EXCEPTION.");
    }
}