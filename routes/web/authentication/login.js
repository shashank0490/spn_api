const CONFIG = require('config');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const LoginHistory = require('../model').loginHistory;
const CryptoJS = require("crypto-js");

/* Checking if the password is correct or not. */
module.exports.getUserInfo = async function (req, res, next) {
    let randomSalt = "";
    if (!req.body.random) {
        let random = Math.random().toString();
        let passwordHAsh = CryptoJS.HmacSHA256(req.body.password, process.env.SALT).toString();
        let passwordH = CryptoJS.HmacSHA256(
            passwordHAsh,
            random,
        ).toString();
        req.body.password = passwordH;
        randomSalt = random;
    } else {
        randomSalt = req.body.random.toString()
    }
    let query = `
        SELECT u.id, u."firstName",u."emailId", u."contactNo", u.password,u."isActive", u.file
        FROM public.user as u 
        WHERE u."emailId" ILIKE '${req.body.emailId}'`;
    try {
        let data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT })
        if (!data.length) {
            return res.BadRequest({},"Incorrect email or password.");
        } else {
            data = data[0];
            req["data"] = data;
            if (data && data.isActive == '0') {
                return res.BadRequest({},"This user is inactive. Please contact to admin");
            }
            if (req.body.password.toString() == CryptoJS.HmacSHA256(data.password, randomSalt).toString()) {
                next();
            } else {
                return res.BadRequest({},"Incorrect email or password.");
            }
        }
    } catch (err) {
        return res.BadRequest({},err);
    };
}

/* Creating a token and sending it back to the client. */
module.exports.createToken = async function (req, res) {
    let rowData = req.data;
    let exp = moment().valueOf() + (365 * 24 * 60 * 60 * 1000);
    let loginHistory = {
        user_agent: req.body.user_agent,
        user_id: rowData.id,
        lat: req.body.lat,
        lng: req.body.lng,
        logged_in_at: new Date(),
        ip_address: req.body.ip_address,
        type: "web"
    };
    
    LoginHistory.create(loginHistory).then(async (data) => {
        let tData = {
            id: rowData.id,
            loginId: data.id,
            iat: moment().valueOf(),
            exp: exp
        };
        let token = jwt.sign(tData, CONFIG.superSecret, {});
        let {id,emailId,firstName,contactNo,file} = rowData;
        return res.status(200).send({
            timestamp: moment().unix(), success: true,
            message: "Logged in successfully...",
            token: token,
            data: {id,emailId,firstName,contactNo,file}
        });
    }).catch(err => {
        return res.BadRequest(err,"emailId/Username or Password not matching !");
    });
}