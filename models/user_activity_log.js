/*
 * @Author: Anup Kumar Srivastav 
 * @Date: 2022-09-09 
 * @Last Modified by: Anup Kumar Srivastav
 * @Last Modified time: 2022-09-09
 */

require('dbConnection');
module.exports = (sequelize, type) => {
    const user_activity_log = sequelize.define('user_activity_log', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: type.INTEGER,
        },
        tbl_name: {
            type: type.STRING,
        },
        record_id: {
            type: type.INTEGER,
        },
        previous_record: {
            type: type.TEXT,
        },
        is_deleted: {
            type: type.STRING(1),
            defaultValue: '1',
            comment: `0: Inactive  1: Active 2 : Delete`,
            validate: {
                isIn: {
                    args: [['0', '1', '2']],
                    msg: "Only Active,Inactive & Delete is allowed"
                }
            }
        },
        created_at: {
            type: type.DATE,
            defaultValue: type.NOW
        },
        updated_at: {
            type: type.DATE,
            defaultValue: type.NOW
        },
        is_deleted_by: {
            type: type.INTEGER(11),
        },
        deleted_at: {
            type: type.DATE,
        },
        created_by: {
            type: type.INTEGER(11)
        },
        updated_by: {
            type: type.INTEGER(11)
        }
    }, { freezeTableName: true, timestamps: false })
    return user_activity_log;
}