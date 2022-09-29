const express = require('express');
const apiRoutes = express.Router();
const resetPasswordRequest = require('./reset');
const password = require('../forgot-password');

apiRoutes.post("/reset-password",resetPasswordRequest);
apiRoutes.post("/reset/update-password",password.resetRequest.findResetToken,resetPasswordRequest.verifyOldPassword,resetPasswordRequest.finalUpdatePsw);

module.exports = apiRoutes;