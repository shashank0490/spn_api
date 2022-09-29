const config = require("../../../config");
const { runTest } = require("../../../testConfig");
const common = require("../../../common-function");
const headers = common.headers;
const request = require("supertest")(config.host[process.env.ENV || "development"]);
const itif = (itCond) => (runTest.all ? it : itCond ? it : it.skip);
const test = runTest.profile;
let { profileCreate, userCreate } = require("./config");
common.beforeAllandEach();

describe("units api test", () => {
    itif(test)("should get all ngo profile", async () => {
        await request
            .get(config.api.ngoProfile.get)
            .set(headers)
            .expect(200)
            .expect((res) => expect(res.body).toMatchObject({ message: "FETCHED DATA." }))
            .expect((res) => expect(res.body.data.length).toBeGreaterThanOrEqual(0));
    });

    itif(test)("should create new user with send otp and creating or updating ngo profile", async () => {
        let prms1 = new Promise(async (resolve,reject) => {
            await request
            .post(config.api.ngoProfile.post)
            .send(profileCreate)
            .set(headers)
            .expect(200)
            .expect(async (res) => {
                if(res.body.message == 'CREATED SUCCESSFULLY.' && res.body.data && res.body.data.id){
                    userCreate.ngoProfileId = res.body.data.id;
                    resolve(userCreate);
                }else{
                    reject(res.body);
                }
            });
        });

        prms1.then(data => {
            const newPrms = new Promise(async(res,rej) => {
                await request
                .post(config.api.ngoProfile.sendOtp)
                .send(data)
                .set(headers)
                .expect(200)
                .expect(sendOtpRes => {
                    if(sendOtpRes.body.message == 'OTP SENT SUCCESSFULLY.'){
                        userCreate.otp = sendOtpRes.body.data.otp;
                        userCreate.otpTxnId = sendOtpRes.body.data.otpTxnId;
                        res(userCreate);
                    }else{
                        rej(sendOtpRes);
                    }

                });
            })
            return newPrms.then(async (newData) => {
                await request
                .post(config.api.user.post)
                .send(newData)
                .set(headers)
                .expect(200)
                .expect(async (createUser) => {
                    expect(createUser.body).toMatchObject({ message: "Logged in successfully..." })
                });
            })
        });
    });
});
