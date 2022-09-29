const config = require("../../../config");
const { runTest } = require("../../testConfig");
const common = require("../../common-function");
const headers = common.headers;
const request = require("supertest")(config.host[process.env.ENV || "staging"]);
const itif = (itCond) => (runTest.all ? it : itCond ? it : it.skip);
const test = runTest.resetPassword;
let { requestRest, resetPassword } = require("./config");
common.beforeAllandEach();

describe("units api test", () => {
    itif(test)("should create new user with send otp and creating or updating ngo profile", async () => {
        let prms1 = new Promise(async (resolve,reject) => {
            await request
                .get(config.api.resetPassword.resetRequest)
                .send(requestRest)
                .set(headers)
                .expect(200)
                .expect((res) => {
                    if(res.body.message == 'FETCHED DATA.' && res.body.data && res.body.data.reset_password_token){
                        resetPassword.reset_password_token = res.body.data.reset_password_token;
                        resolve(userCreate);
                    }else{
                        reject(res.body);
                    }
                });
        });

        prms1.then(async (data) => {
            return await request
                .post(config.api.resetPassword.pswReset)
                .send(data)
                .set(headers)
                .expect(200)
                .expect(async (res) => {
                    expect(createUser.body).toMatchObject({ message: "REATED SUCCESSFULLY." });
                });
        });
    });
});
