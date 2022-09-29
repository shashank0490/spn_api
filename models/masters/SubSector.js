/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-02
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-02
 * Creating a table named sub_sector with the following fields: id, sectorId, code, name, createdAt, updatedAt, isActive
 */

module.exports = (sequelize, type) => {
    const SubSector = sequelize.define('sub_sector', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sectorId: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'Primary id of sector'
        },
        code: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'Sub Sector code'
        },
        name: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'Sub Sector name'
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
    SubSector.associate = (models) => {
        SubSector.belongsTo(models.sector, { foreignKey: 'sectorId', as: 'sector' })
    };
    return SubSector;
};
