/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-01
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-01
 * Creating a table named city with the following fields: id, districtId, code, name, createdAt, updatedAt, isActive
 */

module.exports = (sequelize, type) => {
    const City = sequelize.define('city', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        districtId: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'Primary id of District'
        },
        code: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'City code'
        },
        name: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'City name'
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
    City.associate = (models) => {
        City.belongsTo(models.district, { foreignKey: 'districtId', as: 'district' })
    };
    return City;
};
