const user = require('../model').user;
const { ValidateEmail,validatePhoneNumber } = require('../../utils/common-function'); 
const common = require('../../utils/common-function');
const OTP = require('../model').otp;

module.exports = async (req, res) => {
    try {
        if(!req.hasOwnProperty('user') && !req.query.hasOwnProperty('id')) throw new Error('User id not found.');

        let where = req.query ? req.query : {};
        if(req.user && req.user.id){
            where['id'] = req.user.id;
        }
        let data = await user.findAll({where,raw : true});
        return res.Ok(data,"FETCHED DATA.")
    } catch (error) {
        res.BadRequest(error,"CAUGHT EXCEPTION.")
    }
}

/* 
* Checking if the email and contact number is valid or not.
* Checking if the email or contact number is already registered or not.
*/
module.exports.checkEmailandContact = async (req, res, next) => {
    try {
        let constVar = global._const;
        if(!ValidateEmail(req.body.emailId)) throw new Error('Invalid email id given!');
        if(!validatePhoneNumber(req.body.contactNo)) throw new Error('Invalid phone number given!');

        let where = {
            $or : [{emailId: {[Sequelize.Op.iLike] :req.body.emailId}},{contactNo: (req.body.contactNo.number).toString()}],
            isActive: constVar.isActive.true
        };
        
        let userData = await user.findOne({ where }).then().catch(e => {
            return res.BadRequest(e,"Error");
        });
        let apiURL = req.originalUrl.replace(`${req.baseUrl}/`, "");

        if(apiURL.includes("send-otp") && !apiURL.includes("user/update/send-otp")){
            if(userData) throw new Error("Email id or phone number already exists");
        }

        if(apiURL.includes("user/update/send-otp")){
            req.body['type'] = constVar.templateType.update;
        }
        delete where['isActive'];
        let updateObj = {isExpired : constVar.OTP.isExpired.true, expireAt : new Date()};
        // Just here for expire previous request
        await common.findAndUpdate(OTP,where,updateObj,((status,reportData) => {
            next();
        }));
    } catch (err) {
        return res.BadRequest(err,"Error");
    }
}