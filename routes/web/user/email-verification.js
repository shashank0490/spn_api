const OTP = require("../model").otp;
const { generateOTP } = require('../../utils/otp-generator'); 
const sendOTP = require('../../../services/send-email'); 

/* The above code is generating a random OTP and sending it to the user's email address. */
module.exports.createOTP = async (req, res) => {
    try {
        sequelize.transaction().then(async (t) => {
            req.body['type'] = req.body.type ? req.body.type : global._const.templateType.register;
            const createOtp = await createNewOtp(req.body.emailId,req.body.contactNo.countryCode,req.body.contactNo.number,req.body.type,{ transaction: t });
            if (!createOtp) {
                throw new Error('Unable to generate OTP!');
            }else{
                let otpObj = {to : createOtp.emailId,otp: createOtp.otp,type: req.body.type};
                const sendotp = await sendOTP(otpObj);
                if(sendotp.status){
                    t.commit();
                    let resData = { otpTxnId : createOtp.txnId,otp: createOtp.otp };
                    if(req.body.reset_password_token){
                        resData['reset_password_token'] = req.body.reset_password_token
                    }
                    return res.Ok(resData,"OTP SENT SUCCESSFULLY.");
                }else{
                    t.rollback();
                    return res.BadRequest(sendotp.error,"ERROR WHILE SENDING EMAIL.");
                }
            } 
        })
    } catch (error) {
        return res.BadRequest(error,"ERROR WHILE SENDING EMAIL.");
    }
}

/**
 * It creates an OTP record in the database
 * @param emailId - email address of the user
 * @param countryCode - +91
 * @param number - The phone number to send the message to.
 * @param transaction - This is the transaction object that is passed to the function.
 * @returns The return value of the function is the return value of the await expression.
 */
const createNewOtp = async (emailId,countryCode,contactNo,entryType,transaction) => {
    try {
        const otp = generateOTP();
        entryType = entryType == global._const.templateType.update ? global._const.templateType.register : entryType;
        return await OTP.create({emailId,countryCode,contactNo,otp,entryType},transaction);
    } catch (error) {
        return error;
    }
};

module.exports.createNewOtp = createNewOtp;