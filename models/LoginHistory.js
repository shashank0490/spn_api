/*
 * @Author: Anup Kumar Srivastav 
 * @Date: 2022-09-12
 * @Last Modified by: Anup Kumar Srivastav 
 * @Last Modified time: 2022-09-12
 */
require('dbConnection');
module.exports = (sequelize, type) => {
    const  loginHistory = sequelize.define('loginHistory', {
        id: {
            type: type.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: type.INTEGER(10),
            required: true
        },
        type: {
            type: type.STRING(5),
        },
        user_agent: {
            type: type.STRING,
        },
        lat: type.STRING(10),
        lng: type.STRING(10),
        logout_location_lat: type.STRING(10),
        logout_location_lng: type.STRING(10),
        ip_address: type.STRING(20),
        logged_out_at: type.DATE,
        logged_in_at: type.DATE,
        createdAt: {
            type: type.DATE,
            defaultValue: type.NOW
        },
        updatedAt: {
            type: type.DATE,
            defaultValue: type.NOW
        },
    }, { freezeTableName: true, timestamps: false })
    return loginHistory
}
