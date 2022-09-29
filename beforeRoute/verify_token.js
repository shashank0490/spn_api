var jwt = require('jsonwebtoken');
var moment = require('moment');
const Models = require('../dbConnection/index');
var CONFIG = require('config');

module.exports = function (req, res, next) {
  var token = req.body.token || req.query.token || req.params.token || req.headers['x-access-token'];
  const timestampHeader = req.headers['timestamp'] != undefined ? req.headers['timestamp'] : "";
  if (token) {
    jwt.verify(token, CONFIG.superSecret, async (err, decoded) => {
      if (err || !decoded.id || moment().valueOf() > parseInt(decoded.exp)) {
        return res.status(401).send({ success: false, message: "Your token has been expired.", err: {}, logout: true });
      } else {
        try {
          let response = await Models.user.findAll({ where: { "isActive": '1', "id": decoded.id }, raw: true });
          if (response) {
            let data = await Models.loginHistory.findAll({ where: { "user_id": decoded.id, "id": decoded.loginId }, raw: true });
            if (data.length) {
              if (data[0]['type'] == "web" && (moment().unix() > data[0]['logged_out_date'])) {
                return res.status(401).send({ success: false, message: "Your token has been expired.", err: {}, logout: true });
              }
              if (data[0]['logged_out_at'] == null || data[0]['logged_out_at'] == "") {
                let logoutUser = await Models.loginHistory.update({ logged_out_date: moment().add(30, 'minutes').unix() }, { where: { "user_id": decoded.id, "id": decoded.loginId } });
                req.user = decoded;
                req.user['timestamp'] = timestampHeader;
                next();
              } else {
                return res.BadRequest({}, "User UnAuthorized Token",401)
              }
            } else {
              return res.BadRequest({}, "User UnAuthorized Token",401)
            }
          } else {
            return res.BadRequest({}, "User UnAuthorized",401)
          }
        } catch (error) {
          console.log(error);
          return res.status(400).send({ success: false, message: 'Something went wrong with token.' });
        }
      }
    });
  } else {
    return res.status(403).send({ success: false, message: 'No token provided.' });
  }
};

