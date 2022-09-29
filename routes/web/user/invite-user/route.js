const express = require('express');
const apiRoutes = express.Router();

const inviteUser = require('./index');

apiRoutes.get("/invite-user", inviteUser.get);
apiRoutes.post("/invite-user", inviteUser.post);

module.exports = apiRoutes;