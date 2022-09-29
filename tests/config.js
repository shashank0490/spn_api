const baseUrl = "http://127.0.0.1:5051";
const adminAPI = "/web/api";
module.exports = {
    email: "anup@test.com",
    password: "Anup@123",
    host: { development: baseUrl },
    adminAPI,
    api: {
        auth: { 
            login: adminAPI + "/auth/login" 
        },
        user: { 
            post: adminAPI + "/user" 
        },
        master: {
            country: {get: adminAPI + "/master/country"},
            state: {get: adminAPI + "/master/state"},
            district: {get: adminAPI + "/master/district"},
            city: {get: adminAPI + "/master/city"},
            designation: {
                get: adminAPI + "/master/designation",
                post: adminAPI + "/master/designation"
            },
            bu: {get: adminAPI + "/master/bu"},
            donor: {get: adminAPI + "/master/donor"},
            entityType: {get: adminAPI + "/master/entity-type"},
            eventType: {get: adminAPI + "/master/event-type"},
            financialYear: {get: adminAPI + "/master/financial-year"},
            ngoSourceType: {get: adminAPI + "/master/ngo-source-type"},
            orgType: {get: adminAPI + "/master/organization-type"},
            resourceType: {get: adminAPI + "/master/resource-type"},
            sector: {get: adminAPI + "/master/sector"},
            sourceType: {get: adminAPI + "/master/source-type"},
            subSector: {get: adminAPI + "/master/sub-sector"}
        },
        ngoProfile: {
            get: adminAPI + "/ngo/profile",
            post: adminAPI + "/ngo/profile",
            sendOtp: adminAPI + '/send-otp'
        },
        user: {
            get: adminAPI + "/user",
            post: adminAPI + "/user"
        },
        resetPassword: {
            resetRequest: adminAPI + "/reset-password",
            pswReset: adminAPI + "/reset/update-password"
        }
    }
};
