/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-02
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-02
 * Creating a table named donor with the following fields: id, orgTypeId, name, createdAt, updatedAt, isActive
 */

module.exports = (sequelize, type) => {
    const Donor = sequelize.define('donor', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        orgTypeId: {
            type: type.INTEGER,
            allowNull: false,
            comment: 'Primary id of Orgnaization type'
        },
        name: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'Donor name'
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
    Donor.associate = (models) => {
        Donor.belongsTo(models.organization_type, { foreignKey: 'orgTypeId', as: 'organization_type' })
    };
    return Donor;
};
