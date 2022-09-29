
var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
var string = '';
let mobileNo = '9'+(Math.floor(Math.random() * 900000000) + 100000000);
for(var ii=0; ii<15; ii++){
    string += chars[Math.floor(Math.random() * chars.length)];
}
console.log("Mobile No ======>",mobileNo)
console.log("Email Id ======>",string + '@gmail.com')
let profileCreate = {
    name: "Unit Test NGO",
    pancard: "GCBYT7655O",
    website: "www.google.com",
    aboutInn: "Word of Mouth"
};

let userCreate = {
    "firstName": "unit test",
    "contactNo": {
        "countryCode": "+91",
        "number": mobileNo
    },
    "emailId": string + '@gmail.com',
    "designationId": 1,
    "password": "62953f2a0057d53bd755eb850b252c5af63c4c0398ecf77b0b804f9fa6d1102f",
    "confirmPassword": "62953f2a0057d53bd755eb850b252c5af63c4c0398ecf77b0b804f9fa6d1102f"
}

// module.exports.randomId = randomId;
module.exports = {
    profileCreate,
    userCreate
};