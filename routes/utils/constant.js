module.exports = {
    ROLE: {},
    _schema: {
    },
    specials: ["`", ";", "*", "%", "&", "|", "*", "~", "<", ">", "^", "(", ")", "[", "]", "{", "}", "$", ";"],
    OTP: {
        OTP_LENGTH: 6,
        OTP_CONFIG: {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
            digits: true
        },
        isExpired: {
            true: '1',
            false: '0'
        },
        isVerified: {
            true: '1',
            false: '0'
        }
    },
    isActive: {
        true: '1',
        false: '0'
    },
    templateType: {
        register: '1',
        forgot: '2',
        update: '3',
        invite: '4'
    },
    isPasswordUpdated: {
        true: '1',
        false: '0',
    }
}