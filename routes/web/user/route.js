const express = require('express');
const apiRoutes = express.Router();

const user = require('./index');
const verifyOtp = require('./verify-otp');
const auth = require('../authentication/index');

apiRoutes.get("/user",require('../../../beforeRoute/verify_token'),user.get);

apiRoutes.post("/send-otp", user.get.checkEmailandContact,user.emailVerification.createOTP);
apiRoutes.post("/user", verifyOtp.bindFilterAndBody,verifyOtp,user.post,auth.login.getUserInfo,auth.login.createToken);

module.exports = apiRoutes;