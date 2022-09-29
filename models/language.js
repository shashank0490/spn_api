/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-26
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-26
 * Creating a table named language
 */

module.exports = (sequelize, type) => {
    const Language = sequelize.define('language', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'Language code'
        },
        language: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'Language name'
        },
        isActive: {
            type: type.ENUM('0', '1'),
            defaultValue: '1',
            comment: `1: Active 0 : Deactive`
        }
    }, { freezeTableName: true, timestamps: false });
    return Language;
};
