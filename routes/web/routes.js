

require('rootpath')();
const express = require('express');
const apiRoutes = express.Router();
const rateLimit = require("express-rate-limit");
const multer = require('multer');
const auth = require('./authentication');
/*
 *
 *
 * MULTER
 *
 */
const { APP_DIR_PATH } = process.env;
const baseDir = (APP_DIR_PATH ? APP_DIR_PATH : "") + "uploads/";
var storage1 = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, baseDir + 'logs')

   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname)
   }
});


const multerUpload = multer({ storage: storage1 });

const apiLimiter = rateLimit({
   windowMs: 1 * 60 * 1000, // 1 minutes
   max: 15
});


/****** Forms ******/
// const forms = require('./form-builder');
// apiRoutes.use(forms);

/****** Upload & Download CSV ******/
const uploadDownloadCsv = require('./upload/route');
apiRoutes.use(uploadDownloadCsv);

/****** Master ******/
const masters = require('./masters/route');
apiRoutes.use(masters);

/****** NGO ******/
const ngo = require('./ngo/route');
apiRoutes.use(ngo);

/****** USER ******/
const user = require('./user/route');
apiRoutes.use(user);

/****** LOGIN ******/
apiRoutes.post("/auth/login", auth.login.getUserInfo, auth.login.createToken);

/****** FORGOT PASSWORD ******/
const forgotPassword = require('./forgot-password/route');
apiRoutes.use(forgotPassword);

/// Check Token
const verifyToken = require('beforeRoute/verify_token');
apiRoutes.use(verifyToken);

/****** REST PASSWORD ******/
const resetPassword = require('./reset-password/route');
apiRoutes.use(resetPassword);

/****** S3 Upload ******/
 const getS3Url = require("./s3/getS3Url");
 apiRoutes.post("/getS3Url", getS3Url);

 /****** Update User ******/
 const userForm = require('./user');
 apiRoutes.post("/user/update", userForm.verifyOtp.bindFilterAndBody,userForm.verifyOtp,userForm.post.update);
 apiRoutes.post("/user/update/send-otp",userForm.get.checkEmailandContact,userForm.emailVerification.createOTP);


  /****** Invite User ******/
  const inviteUser = require('./user/invite-user/route');
  apiRoutes.use(inviteUser);

/****** LOGOUT ******/
apiRoutes.post("/auth/logout", auth.logout);

module.exports = apiRoutes;
