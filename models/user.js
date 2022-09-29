/*
 * @Author: Anup Kumar Srivastav
 * @Date: 2022-09-05
 * @Last Modified by: anup.kumar@dhwaniris.com
 * @Last Modified Date: 2022-09-05
 * Creating a table named user with the following fields:
 */

module.exports = (sequelize, type) => {
    const User = sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ngoProfileId: {  
            type: type.INTEGER,
            allowNull: false,
            comment: 'Primary id of NGO Profile'
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
            // allowNull: false,
            // validate: { 
            //     len : { 
            //         msg: 'Invalid input length in lastName',
            //         args: 4 
            //     }
            // },
            comment: 'User last name'
        },
        emailId: {
            type: type.STRING(200),
            unique: true,
            allowNull: false,
            comment: 'NGO User email id',
            validate: { isEmail: true }
        },
        contactNo: {
            type: type.STRING(20),
            unique: true,
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
        file:{
            type: type.TEXT,
            defaultValue: null
        },
        password: { 
            type: type.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        confirmPassword : { 
            type: type.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg : "Both password must match"
                }
            }
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
        },
        entryFrom: {
            type: type.ENUM('1', '2'),
            defaultValue: '1',
            comment: `1: Register 2 : Import`
        },
        reset_password_token: {
			type: type.STRING,
			defaultValue: null
		},
		reset_password_expires: {
			type: type.STRING,
			defaultValue: null
		},
    }, 
    { 
        freezeTableName: true, 
        timestamps: false,
        validate: {
            stringValidation() {
                if (this.firstName && _const.specials.some((s) => this.firstName.includes(s))) {
                    throw new Error("Special characters are not allowed in this : " + this.firstName);
                }
                // if (this.lastName && _const.specials.some((s) => this.lastName.includes(s))) {
                //     throw new Error("Special characters are not allowed in this : " + this.lastName);
                // }
                if (this.password == '') {
                    throw new Error("Password can't be blank!" );
                }
                if (this.password != this.confirmPassword) {
                    throw new Error("Both password must match");
                }
            }
        }
    }
    );
    User.associate = (models) => {
        User.belongsTo(models.ngo_profile, { foreignKey: 'ngoProfileId', as: 'ngo_profile', message: "error" })
        User.belongsTo(models.designation, { foreignKey: 'designationId', as: 'designation' })
    };
    return User;
};
