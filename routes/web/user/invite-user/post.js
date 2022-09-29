const inviteUser = require('../../model').inviteUser;
const { ValidateEmail,validatePhoneNumber,updateOrCreate } = require('../../../utils/common-function'); 
const sendInvite = require('../../../../services/send-email');
const {checkAlreadyRegister} = require('../../ngo/profile/get');

/* Sending an invite to a user. */
module.exports = (async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        let validate = await validateForm(req.body,res);
        if(!validate.status) throw new Error(validate.msg);

        let bodydata = Object.assign({},req.body);
        if(!req.hasOwnProperty('user')) throw new Error('User detail not found.');

        delete bodydata['contactNo'];
        bodydata['userId'] = req.user.id;
        bodydata.countryCode = req.body.contactNo.countryCode;
        bodydata.contactNo = req.body.contactNo.number;

        if(await checkAlreadyRegister({emailId: bodydata.emailId, isActive: '1'})) throw new Error('Already registered.');

        updateOrCreate(inviteUser,{emailId: bodydata.emailId},bodydata,transaction).then(async (data) => {
            if(data.errors){
                transaction.rollback();
                return res.BadRequest(data.errors,data.message);
            }else{
                let otpObj = {
                    to : bodydata.emailId,
                    type: global._const.templateType.invite,
                    name: bodydata.firstName,
                    txnId: data.txnId
                };
                const sendotp = await sendInvite(otpObj);
                if(sendotp.status){
                    transaction.commit();
                    return res.Ok(data,"Invite sent successfully.");
                }else{
                    transaction.rollback();
                    return res.BadRequest(sendotp.error,"Error while sending invite.");
                }
            }
        });
    } catch (error) {
        transaction.rollback();
        res.BadRequest(error,"Error while sending invite.")
    }
});

/* Checking if the bodydata has the properties contactNo, emailId, firstName, and if they are not empty. */
const validateForm = (async (bodydata) => {
    let error = {status: true, msg: ''};
    if(!bodydata.hasOwnProperty('contactNo') || bodydata.hasOwnProperty('contactNo') == ''){
        error.status = false;
        error.msg = 'Contact no. cannot be null';
    }

    if(!bodydata.hasOwnProperty('emailId') || bodydata.hasOwnProperty('emailId') == ''){
        error.status = false;
        error.msg = 'email Id cannot be null';
    }

    if(!bodydata.hasOwnProperty('firstName') || bodydata.hasOwnProperty('firstName') == ''){
        error.status = false;
        error.msg = 'Full Name cannot be null';
    }

    if(!ValidateEmail(bodydata.emailId)){
        error.status = false;
        error.msg = 'Invalid email id given!';
    }

    if(!validatePhoneNumber(bodydata.contactNo)){
        error.status = false;
        error.msg = 'Invalid phone number given!';
    }
    return error;
});