const { userResetRequest } = require('../forgot-password/reset');
const { passwordUpdate } = require('../forgot-password/change-psw');
const User = require('../model').user;
const crypto = require('crypto');
const CryptoJS = require("crypto-js");

module.exports = (async (req, res) => {
    const token = crypto.randomBytes(20).toString('hex');
    if (req.body.emailId) {
        const where = { emailId:{[Sequelize.Op.iLike]: req.body.emailId}, isActive: '1' };
        User.findOne({ where })
            .then(async user => {
                if (!user) {
                    return res.BadRequest({}, "Email not exits!");
                } else {
                    await userResetRequest(token,where,res);
                    res.Ok({reset_password_token: token},"Reset password Request Created.")
                }
            })
    } else {
        return res.BadRequest({}, "Email required");
    }
});

/* A middleware function. */
module.exports.verifyOldPassword = (async(req, res, next) => {
    try {
        if(!(req.body.oldPassword.toString() == CryptoJS.HmacSHA256(req.body.password, req.body.random).toString()))
        throw new Error('Incorrect old password.');

        if((req.body.oldPassword.toString() == CryptoJS.HmacSHA256(req.body.newPassword, req.body.random).toString()) || (req.body.oldPassword.toString() == req.body.newPassword.toString()))
        throw new Error('old password and new password must be not same.');

        next();
    } catch (error) {
        return res.BadRequest(error,"Error while verify password");
    }
});

module.exports.finalUpdatePsw = (async(req,res) => {
    let obj = {password: req.body.newPassword, confirmPassword: req.body.confirmPassword};
    let where = { emailId: {[Sequelize.Op.iLike]: req.body.emailId}, isActive: '1' };
    passwordUpdate(req,res,obj,where);
})