const express = require('express');
const apiRoutes = express.Router();

const profile = require('./profile');
const recaptcha = require('../authentication/recaptcha');

apiRoutes.get("/ngo/profile", profile.get);

apiRoutes.post("/ngo/profile", recaptcha,profile.post);

module.exports = apiRoutes;