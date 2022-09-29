/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-02
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-02
 * Creating a table named bu with the following fields: id, name, createdAt, updatedAt, isActive
 */

module.exports = (sequelize, type) => {
    const Bu = sequelize.define('bu', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'BU name'
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
    return Bu;
};
