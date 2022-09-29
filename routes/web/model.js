const modelPath = require('../../dbConnection/index');
module.exports = {
    profile : modelPath.ngo_profile,
    user : modelPath.user,
    otp : modelPath.otp,
    loginHistory : modelPath.loginHistory,
    inviteUser : modelPath.invite_user,
    pageLanguageMapper : modelPath.page_language_mapper,
    page : modelPath.page,
    language : modelPath.language,
    masters : require('./masters/model')
}