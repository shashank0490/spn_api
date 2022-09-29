const profile = require('../../model').profile;
const common = require('../../../utils/common-function');

/* This is a function which is used to save the profile form data in the database. */
module.exports = async (req, res) => {
    try {
        let obj = req.body;
        if(!obj.hasOwnProperty('pancard') || obj.pancard == '') throw new Error('Pancard not exist.');
        
        const filter = {pancard : obj.pancard};
        common.updateOrCreate(profile,filter,obj).then((data) => {
            if(data.errors){
                return res.BadRequest(data.errors,data.message);
            }else{
                return res.Ok(data,"CREATED SUCCESSFULLY.");
            }
        });
    } catch (err){
        return res.BadRequest(err,"ERROR WHILE SAVING THE FORM");
    }
}