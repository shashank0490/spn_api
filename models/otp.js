/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-07
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-07
 * Creating a table named user (level_0) with the following fields:
 */

module.exports = (sequelize, type) => {
    const Otp = sequelize.define('otp', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        txnId: {
            type: type.UUID,
            defaultValue: type.UUIDV4,
            unique: true,
            allowNull: false
        },
        otp: {
            type: type.STRING(200),
            unique: true,
            allowNull: false
        },
        emailId: {
            type: type.STRING(200),
            allowNull: false,
            comment: 'Email id',
            validate: { isEmail: true }
        },
        contactNo: {
            type: type.STRING(20),
            allowNull: false,
            comment: 'Contact No.',
            // validate: {
            //     validator: function(v) {
            //         if(!(/^([6-9]{1}[0-9]{9})$/.test(v))) {
            //             throw new Error('Invalid contact number.');
            //         }
            //     }
            // }
        },
        countryCode: {
            type: type.STRING(20),
            // allowNull: false,
            comment: 'Country Code'
        },
        createdAt: {
            type: type.DATE,
            defaultValue: type.NOW,
            comment: 'Otp created at'
        },
        expireAt: {
            type: type.DATE,
            comment: 'Otp Expiry Date'
        },
        isExpired: {
            type: type.ENUM('0', '1'),
            defaultValue: '0',
            comment: `1: Expired 0 : Not Expired`
        },
        isVerified: {
            type: type.ENUM('0', '1'),
            defaultValue: '0',
            comment: `1: Verified 0 : Not Verified`
        },
        isPasswordUpdated: {
            type: type.ENUM('0', '1'),
            defaultValue: '0',
            comment: `1: Updated 0 : Not Updated`
        },
        entryType: {
            type: type.ENUM('1', '2'),
            defaultValue: '1',
            comment: `1: Registration 2 : Forgot`
        }
    },{ freezeTableName: true, timestamps: false});
    return Otp;
};