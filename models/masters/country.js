/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-01
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-01
 * Creating a table named country with the following fields: id, code, name, createdAt, updatedAt, isActive
 */

module.exports = (sequelize, type) => {
    const Country = sequelize.define('country', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'Country code'
        },
        name: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'Country name'
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
        }
    }, { freezeTableName: true, timestamps: false });
    return Country;
};
