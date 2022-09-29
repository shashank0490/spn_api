/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-05
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-05
 * Creating a table named ngo_profile (level_0) with the following fields: id, txnId, name, panNumber, website, aboutInn, createdAt, updatedAt, isActive, entryFrom
 */
module.exports = (sequelize, type) => {
    const NgoProfile = sequelize.define('ngo_profile', {
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
        name: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'NGO profile Name'
        },
        pancard: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'Pancard number',
            validate: {
                validatePancard(val) {
                    if(!(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/.test(val))) {
                        throw new Error('Invalid input Pancard number.');
                    }
                },
                len: [10, 10]
            }
        },
        website: {
            type: type.TEXT,
            // unique: true,
            comment: 'Website Url',
            validate: {
                isUrl: true
            }
        },
        aboutInn: {
            type: type.STRING(200),
            comment: 'Deatils about INN'
        },
        createdAt: {
            type: type.DATE,
            defaultValue: type.NOW
        },
        updatedAt: {
            type: type.DATE,
            defaultValue: type.NOW
        },
        isActive: {
            type: type.ENUM('0', '1'),
            defaultValue: '1',
            comment: `1: Active 0 : Deactive`
        },
        entryFrom: {
            type: type.ENUM('1', '2'),
            defaultValue: '1',
            comment: `1: Register 2 : Import`
        }
    }, 
    { 
        freezeTableName: true, 
        timestamps: false,
        validate: {
            stringValidation() {
                if (this.name == '') {
                    throw new Error("Name can't be blank!" );
                }
                if (this.name && _const.specials.some((s) => this.name.includes(s))) {
                    throw new Error("Special characters are not allowed in this : " + this.firstName);
                }
            }
        }
    }
    );
    return NgoProfile;
};
