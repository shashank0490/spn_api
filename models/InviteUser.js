/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-22
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-22
 * Creating a table named invite_user with the following fields:
 */

module.exports = (sequelize, type) => {
    const User = sequelize.define('invite_user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        txnId: {
            type: type.UUID,
            defaultValue: type.UUIDV4,
            unique: true,
            allowNull: false
        },
        userId: {  
            type: type.INTEGER,
            allowNull: false,
            comment: 'Primary id of User'
        },
        designationId: {  
            type: type.INTEGER,
            allowNull: false,
            comment: 'Primary id of Designation'
        },
        firstName: {
            type: type.STRING(200),
            allowNull: false,
            validate: {
                len : { 
                    msg: 'Invalid input length in firstName',
                    args: 4 
                }
            },
            comment: 'User first Name'
        },
        lastName: {
            type: type.STRING(200),
            comment: 'User last name'
        },
        emailId: {
            type: type.STRING(200),
            allowNull: false,
            comment: 'NGO User email id',
            validate: { isEmail: true }
        },
        contactNo: {
            type: type.STRING(20),
            allowNull: false,
            comment: 'User contact No.',
            // validate: {
            //     validator: function(v) {
            //         if(!(/^([6-9]{1}[0-9]{9})$/.test(v))) {
            //             throw new Error('Invalid contact number.');
            //         }
            //     }
            // }
        },
        countryCode: {
            type: type.STRING(20),
            // allowNull: false,
            comment: 'Country Code'
        },
        createdAt: {
            type: type.DATE,
            defaultValue: type.NOW,
            comment: 'Date of Registration'
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
    },
    );
    User.associate = (models) => {
        User.belongsTo(models.user, { foreignKey: 'userId', as: 'user'})
    };
    return User;
};
