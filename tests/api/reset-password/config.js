
let requestRest = {
    "emailId" : "org1@gmail.com"
};

let resetPassword = {
    "emailId": "org1@gmail.com",
    "oldPassword": "889489d4e25311636ebe01c3ddd001987cc2dd910e415a324bc3b13347888bcd",
    "newPassword": "202269f473b1867301912dfa2b4d108c07a080a51bdf4c4feaf9b2be16fc0ea9",
    "confirmPassword": "202269f473b1867301912dfa2b4d108c07a080a51bdf4c4feaf9b2be16fc0ea9",
    "random": "0.8515124883889522"
}

// module.exports.randomId = randomId;
module.exports = {
    requestRest,
    resetPassword
};