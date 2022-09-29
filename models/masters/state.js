/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-01
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-01
 * Creating a table named state with the following fields: id, countryId, code, name, createdAt, updatedAt, isActive 
 */

module.exports = (sequelize, type) => {
    const State = sequelize.define('state', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        countryId: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'Primary id of Country'
        },
        code: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'State code'
        },
        name: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'State name'
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
    State.associate = (models) => {
        State.belongsTo(models.country, { foreignKey: 'countryId', as: 'country' })
    };
    return State;
};
