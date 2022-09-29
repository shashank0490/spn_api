const config = require("./config");
const request = require("supertest")(config.host[process.env.ENV || "development"]);
const Crypto = require("crypto-js");
let headers = {
    "content-type": "application/json",
};

async function login(email, pass, headers) {
    const random = "123";
    const firstPass = Crypto.HmacSHA256(pass, "TRIBAL-MOTA!@$1234").toString();
    const password = Crypto.HmacSHA256(firstPass, random).toString();
    await request
        .post(config.api.auth.login)
        .send({ emailId: email, password: password, random: random })
        .set("Accept", "application/json")
        .expect((res) => {
            res.body.token && (headers["x-access-token"] = res.body.token);
        });
}

function setOrganisation(organisation, headers) {
    // headers["organisation"] = organisation;
}

function setProject(project, headers) {
    // headers["project"] = project;
}

function beforeAllandEach() {
    beforeAll(async () => {
        try {
            !headers.hasOwnProperty("x-access-token") && (await login(config.email, config.password, headers));
            // if (preTest.deleteContent) {
            //     let isDeleted = await request.delete(config.api.contentNavigation.hardDelete).set(headers);
            //     if (!isDeleted.body.success) {
            //         throw isDeleted.body;
            //     }
            // }
        } catch (err) {
            console.log("Error in beforeAll", err.message, err);
        }
    });

    beforeEach(() => {
        // setOrganisation(config.organisation, headers);
        // setProject(config.project, headers);
    });
}

function beforeAllandEach2() {
    let headersArr = config.emailArr.map((cred) => {
        let headerCopy = Object.assign({}, headers);
        beforeAll(async () => {
            try {
                !headerCopy.hasOwnProperty("x-access-token") && (await login(cred.email, cred.password, headerCopy));
            } catch (err) {
                console.log("Error in beforeAll", err.message, err);
            }
        });

        beforeEach(() => {
            // setOrganisation(config.organisation, headerCopy);
            // setProject(config.project, headerCopy);
        });

        return headerCopy;
    });
    return headersArr;
}

function makeQueryFilterString(url, obj) {
    let result = url + "?";
    Object.keys(obj).map((key, index) => {
        let val = "";
        if (Array.isArray(obj[key])) {
            val = obj[key].join();
        } else val = obj[key];

        if (index == Object.keys(obj).length - 1) {
            result += key + "=" + val;
        } else {
            result += key + "=" + val + "&";
        }
    });
    return result;
}

module.exports = {
    login: login,
    // setOrganisation: setOrganisation,
    // setProject: setProject,
    headers: headers,
    beforeAllandEach: beforeAllandEach,
    beforeAllandEach2: beforeAllandEach2,
    makeQueryFilterString: makeQueryFilterString,
};
