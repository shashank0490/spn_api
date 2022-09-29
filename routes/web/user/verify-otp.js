const OtpModel = require('../model').otp;

/* This is a middleware function which is used to verify the OTP. 
*   Update the Otp record
*/
module.exports = async (req, res, next) => {
    try {
        const transaction = await sequelize.transaction();
        let where = req.body.filter;
        let bodyData = req.body.data;
        OtpModel.findOne({ where }).then(function (findOtpData) {
            if (findOtpData) {
                if(findOtpData.otp == req.body.otp){
                    findOtpData.update(bodyData,{transaction}).then((updateRecord) => {
                        delete req.body['otp'];
                        req.body.transaction = transaction;
                        if(req.body.contactNo){
                            delete req.body['otpTxnId'];
                            req.body.countryCode = req.body.contactNo.countryCode;
                            let contactNo = req.body.contactNo.number;
                            delete req.body['contactNo'];
                            req.body.contactNo = contactNo;
                        }
                        next();
                    }).catch((err) => {
                        return res.BadRequest(err,"Error while updated otp.");
                    })
                }else{
                    return res.BadRequest({},"Invalid OTP!");
                }
            }else{
                return res.BadRequest({},"Invalid OTP txnId found!");
            }
        }).catch(err => {
            return res.BadRequest(err,"Error while find otp.");
        })
    } catch (err){
        return res.BadRequest(err,"Error while saving the form.");
    }
}

/* This is a middleware function which is used to bind the filter and body data. */
module.exports.bindFilterAndBody = async(req, res, next) => {
    try {
        const constVar = global._const;
        if(!req.body.otpTxnId)  throw new Error('Otp txnId not found.');
        let apiURL = req.originalUrl.replace(`${req.baseUrl}/`, "");
        let bodyData = {
            isVerified : constVar.OTP.isVerified.true
        };
        let filterData = {
            txnId : req.body.otpTxnId,
            isExpired: constVar.OTP.isExpired.false
        };
        if (apiURL.includes("update-password")) {
            bodyData['isPasswordUpdated'] = constVar.isPasswordUpdated.true;
            bodyData['isExpired'] = constVar.OTP.isExpired.true;
            bodyData['expireAt'] = Date();
            
            filterData['isVerified'] = constVar.OTP.isVerified.true;
            filterData['entryType'] = '2'; // forgot
            filterData['emailId'] = req.body.emailId;
        }

        if (apiURL.includes("user")) {
            bodyData['isExpired'] = constVar.OTP.isExpired.true;
            bodyData['expireAt'] = Date();

            filterData['isVerified'] = constVar.OTP.isVerified.false;
            filterData['emailId'] = req.body.emailId;
        }

        if (apiURL.includes("verify-otp")) {
            filterData['isVerified'] = constVar.OTP.isVerified.false;
            filterData['isPasswordUpdated'] = constVar.isPasswordUpdated.false;
            filterData['entryType'] = '2'; // forgot
        }
        req.body.data = bodyData;
        req.body.filter = filterData;
        next();
    } catch (err){
        return res.BadRequest(err,"Error");
    }
}