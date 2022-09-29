const config = require("../../../config");
const { runTest } = require("../../../testConfig");
const common = require("../../../common-function");
const headers = common.headers;
const request = require("supertest")("http://127.0.0.1:5051");
const itif = (itCond) => (runTest.all ? it : itCond ? it : it.skip);
const test = runTest.masters ? runTest.masters : runTest.designation;
let { bodyData } = require("./config");
common.beforeAllandEach();

describe("units api test", () => {
    itif(test)("should get all designation", async () => {
        await request
            .get(config.api.master.designation.get)
            .set(headers)
            .expect(200)
            .expect((res) => expect(res.body).toMatchObject({ message: "FETCHED DATA." }))
            .expect((res) => expect(res.body.data.length).toBeGreaterThanOrEqual(0));
    });

    itif(test)("should get create designation data", async () => {
        await request
            .post(config.api.master.designation.post)
            .send(bodyData)
            .set(headers)
            .expect(200)
            .expect((res) => expect(res.body).toMatchObject({ message: "CREATED SUCCESSFULLY." }));
    });
});
