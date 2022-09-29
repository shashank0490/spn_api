const User = require('../model').user;
const {findAndUpdate} = require('../../utils/common-function');
const { createNewOtp } = require('./email-verification');
const sendOTP = require('../../../services/send-email');
const CryptoJS = require("crypto-js");

/* Creating a new user. */
module.exports = async (req, res, next) => {
    try {
        let obj = Object.assign({},req.body);
        let transaction = req.body.transaction;
        delete obj.transaction;
        User.create(obj).then(function(data){
            transaction.commit();
            let random = Math.random().toString();
            req.body.emailId = data.emailId;
            req.body.password = CryptoJS.HmacSHA256(data.password, random).toString();
            req.body.random = random;
            next();
        }).catch(function(err){
            transaction.rollback();
            return res.BadRequest(err,"Error while saving the form.");
        });
    } catch (err){
        transaction.rollback();
        return res.BadRequest(err,"Error while saving the form.")
    }
}

module.exports.update = (async (req, res) => {
    let t = req.body.transaction;
    try {
        if (req.body.emailId) {
            const where = { emailId:{[Sequelize.Op.iLike]: req.body.emailId}, isActive: '1' };
            let obj = req.body;
            if(obj.emailId) delete obj['emailId'];
            User.findOne({ where })
                .then(async result => {
                    if (!result) {
                        return res.BadRequest({}, "Email not exits!");
                    } else {
                        obj['updatedAt'] = Date.now();
                        for(var k in obj) result[k] = obj[k];
                        await findAndUpdate(User,where,obj,((status,reportData) => {
                            if(status){
                                t.commit();
                                return res.Ok(result,"Update Successfully");
                            }else{
                                t.rollback();
                                return res.BadRequest(reportData,"Error while Update");
                            }
                        }));
                    }
                })
        } else {
            t.rollback();
            return res.BadRequest({}, "Email required");
        }
    } catch (error) {
        t.rollback();
        return res.BadRequest(error, "Error while update");
    }
});

/* The above code is generating a random OTP and sending it to the user's email address. */
module.exports.sendOtp = async (req, res) => {
    try {
        sequelize.transaction().then(async (t) => {
            req.body['type'] = global._const.templateType.update;
            const createOtp = await createNewOtp(req.body.emailId,req.body.contactNo.countryCode,req.body.contactNo.number,req.body.type,{ transaction: t });
            if (!createOtp) {
                throw new Error('Unable to generate OTP!');
            }else{
                let otpObj = {to : createOtp.emailId,otp: createOtp.otp,type: req.body.type};
                const sendotp = await sendOTP(otpObj);
                if(sendotp.status){
                    t.commit();
                    let resData = { otpTxnId : createOtp.txnId,otp: createOtp.otp };
                    return res.Ok(resData,"OTP SENT SUCCESSFULLY.");
                }else{
                    t.rollback();
                    return res.BadRequest(sendotp.error,"ERROR WHILE SENDING EMAIL.");
                }
            }
        });
    } catch (error) {
        return res.BadRequest(error,"ERROR WHILE SENDING EMAIL.");
    }
}