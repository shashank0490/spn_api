const config = require("../../../config");
const { runTest } = require("../../../testConfig");
const common = require("../../../common-function");
const headers = common.headers;
const request = require("supertest")("http://127.0.0.1:5051");
const itif = (itCond) => (runTest.all ? it : itCond ? it : it.skip);
const test = runTest.masters ? runTest.masters : runTest.ngoSourceType;
// let { demo } = require("./config");
common.beforeAllandEach();

describe("units api test", () => {
    itif(test)("should get all ngoSourceType", async () => {
        await request
            .get(config.api.master.ngoSourceType.get)
            .set(headers)
            .expect(200)
            .expect((res) => expect(res.body).toMatchObject({ message: "FETCHED DATA." }))
            .expect((res) => expect(res.body.data.length).toBeGreaterThanOrEqual(0));
    });
});
