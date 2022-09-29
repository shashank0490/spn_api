const designation = require('../model').designation;

module.exports = async (req, res) => {
    try {
        let obj = req.body;
        designation.create(obj).then(function(data){
            return res.Ok(data,"CREATED SUCCESSFULLY.");
        }).catch(function(err){
            return res.BadRequest(err,"Error while saving the form.");
        });
    } catch (err){
        return res.BadRequest(err,"Error while saving the form.");
    }
}