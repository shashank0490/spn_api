/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-01
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-01
 * Creating a table named district with the following fields: id, stateId, code, name, createdAt, updatedAt, isActive
 */

module.exports = (sequelize, type) => {
    const District = sequelize.define('district', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        stateId: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'Primary id of State'
        },
        code: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'District code'
        },
        name: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'District name'
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
    District.associate = (models) => {
        District.belongsTo(models.state, { foreignKey: 'stateId', as: 'state' })
    };
    return District;
};
