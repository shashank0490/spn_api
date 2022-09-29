const User = require('../model').user;
const crypto = require('crypto');
const common = require('../../utils/common-function');
const OTP = require('../model').otp;

/* This is a function that is used to check user for forgot the password. 
* Update the user with reset token and update OTP data based on filter
*/
module.exports.verify = function (req, res, next) {
    let constVar = global._const;
    const token = crypto.randomBytes(20).toString('hex');
    if (req.body.emailId) {
        const where = { emailId:{[Sequelize.Op.iLike]: req.body.emailId}, isActive: '1' };
        User.findOne({ where })
            .then(async user => {
                if (!user) {
                    return res.BadRequest({}, "Email not exits!");
                } else {
                    await userResetRequest(token,where,res);
                    req.body.contactNo = {
                        countryCode: user.countryCode,
                        number: user.contactNo
                    };
                    req.body['type'] = constVar.templateType.forgot;
                    req.body['reset_password_token'] = token;
                    let newWhere = { emailId: {[Sequelize.Op.iLike]: req.body.emailId}, entryType: '2' };
                    let updateObj = {isExpired : constVar.OTP.isExpired.true, expireAt : new Date()};
                    // Just here for expire previous request
                    await common.findAndUpdate(OTP,newWhere,updateObj,((status,reportData) => {
                        next();
                    }));
                }
            })
    } else {
        return res.BadRequest({}, "Email required");
    }
};

/* This is a function that is used to check user for reset the password. */
module.exports.findResetToken = function (req, res, next) {
    if (req.body.reset_password_token) {
        let where = {
            reset_password_token: req.body.reset_password_token,
            emailId: {[Sequelize.Op.iLike]: req.body.emailId},
            // reset_password_expires: { $gt: Date.now() },
            isActive: '1'
        };
        User.findOne({where}).then(user => {
            if (user == null) {
                return res.BadRequest({}, "Password reset token is invalid or has expired");
            } else {
                req.body.password = user.password;
                next();
            }
        }).catch(err =>{
            return res.BadRequest(err, "ERROR");
        })
    }else{
        return res.BadRequest({}, "reset_password_token not found");
    }
}

async function userResetRequest(token,where,res){
    try {
        await User.update({ reset_password_token: token, reset_password_expires: Date.now() + 3600000 }, {where}).then(data =>{
            return data;
        }).catch(err => {
            return res.BadRequest(err, "Exceptional Error!");
        });
    } catch (error) {
        return res.BadRequest(error, "Exceptional Error!");
    }
}

module.exports.userResetRequest = userResetRequest;