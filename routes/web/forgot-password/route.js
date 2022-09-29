const express = require('express');
const apiRoutes = express.Router();

const forgotPassword = require('./index');
const emailVerification = require('../user/email-verification');
const verifyOtp = require('../user/verify-otp');


apiRoutes.post("/forgot-password", forgotPassword.resetRequest.verify,emailVerification.createOTP);
apiRoutes.post("/verify-otp", verifyOtp.bindFilterAndBody,verifyOtp,(req,res)=>{
    if(req.body.transaction){
        let transaction = req.body.transaction;
        transaction.commit();
        res.Ok({},"Otp Verified");
    }else{
        res.BadRequest({},"Something went wrong while otp verify");
    }
});
apiRoutes.post("/update-password", verifyOtp.bindFilterAndBody,verifyOtp,forgotPassword.resetRequest.findResetToken,forgotPassword.changePassword);

module.exports = apiRoutes;