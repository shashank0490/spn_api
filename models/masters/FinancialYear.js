/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-02
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-02
 * Creating a table named financial_year with the following fields: id, month, Year, monthYear, createdAt, updatedAt, isActive
 */

module.exports = (sequelize, type) => {
    const FY = sequelize.define('financial_year', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        month: {
            type: type.STRING(200),
            allowNull: false,
            comment: 'Month'
        },
        Year: {
            type: type.STRING(200),
            unique: true,
            comment: 'Year'
        },
        monthYear: {
            type: type.STRING(200),
            allowNull: false,
            unique: true,
            comment: 'Month-Year'
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
    return FY;
};
