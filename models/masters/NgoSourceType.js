/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-01
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-01
 * Creating a table named ngo_source_type with the following fields: id, name, createdAt, updatedAt, isActive
 */

module.exports = (sequelize, type) => {
    const NgoSourceType = sequelize.define('ngo_source_type', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'Ngo source type name'
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
    return NgoSourceType;
};
