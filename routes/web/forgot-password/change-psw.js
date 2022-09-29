const OTP = require('../model').otp;
const User = require('../model').user;

/**
 * It updates the password of a user in the database with verify otp from otp data.
 * @param req - request object
 * @param res - response object
 */
module.exports = function (req, res) {
    try{
        /* Checking if the request body has the required parameters. If not, it throws an error. */
        if(!req.body.emailId) throw new Error('Email Id not found.');
        if(!req.body.newPassword) throw new Error('New Password not found.');
        if(!req.body.confirmPassword) throw new Error('Confirm Password not found.');
        if(!req.body.otpTxnId) throw new Error('Otp txnId not found.');

        /* Updating the password of the user. */
        const constOtp = global._const.OTP;
        let obj = {password: req.body.newPassword, confirmPassword: req.body.confirmPassword};
        let where = {emailId: {[Sequelize.Op.iLike]: req.body.emailId},txnId : req.body.otpTxnId,isVerified : constOtp.isVerified.true};
        OTP.findOne({where}).then(data => {
            if(!data){
                return res.BadRequest({},"Invalid forgot password request");
            }else{
                passwordUpdate(req,res,obj,{ emailId: {[Sequelize.Op.iLike]: req.body.emailId}, isActive: '1' })
            }
        }).catch(err => {
            return res.BadRequest(err,"Something went wrong");
        });
    } catch(err){
        return res.BadRequest(err,"Something went wrong");
    }
}

/**
 * It updates the password of a user in the database.
 * @param req - request object
 * @param res - response object
 * @param obj - {password: hash}
 * @param where - {
 * Important Note - This function is use from multiple routes, please insure before any changes in this function
 */
function passwordUpdate(req,res,obj,where){
    User.update(obj, {
        where
    }).then(user => {
        if (user == null) {
            return res.BadRequest({},"Password reset link is invalid or has expired");
        } else {
            if(req.body.transaction){
                let transaction = req.body.transaction;
                transaction.commit();
            }
            return res.Ok({},"Password reset successfully");
        }
    })
}

module.exports.passwordUpdate = passwordUpdate;