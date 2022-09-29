const nodemailer = require('nodemailer');
const CONFIG = require("config");

/* Sending the OTP on email. */
module.exports = async (configObj) => {
    try {
        let transporter = nodemailer.createTransport(CONFIG.EMAILSEND);
        let templateIs = template(configObj);
        let info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: configObj.to, 
            subject: templateIs.subject,
            html: templateIs.text
        });
        return {status: true,info};
    } catch (error) {
        return {status: false,error};       
    }
};

const template = function(configObj){
    let subject = ''
    let text = '';
    switch (configObj.type) {
        case global._const.templateType.register:
            subject = 'Verify OTP';
            text = `
              <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
              <h2>Welcome to the INN</h2>
              <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to register</p>
              <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${configObj.otp}</h1>
              </div>`;
            break;
            
        case global._const.templateType.forgot:
            subject = "OTP Reset Password";
            text = `You are receiving this because you (or someone else) have requested the reset of the password for your account.
                    </br><b> OTP: ${configObj.otp} </b></br>
                    If you did not request this, please ignore this email and your password will email remain unchanged.`;
            break;
        case global._const.templateType.update:
            subject = "OTP Update Profile";
            text = `You are receiving this because you (or someone else) have requested the update the profile.
                    </br><b> OTP: ${configObj.otp} </b></br>
                    If you did not request this, please ignore this email and your profile will email remain unchanged.`;
            break;
        case global._const.templateType.invite:
            subject = "Welcome to INN: Invitation";
            text = `Hi ${configObj.name}!
                    </br></br>
                    We’ve given you access to our portal so that you can manage your journey with us and get to know all the possibilities offered by service.
                    </br></br>
                    If you want to create an account, please click on the following link: <a href="https://stgspn.dhwaniris.in/registration?txnId=${configObj.txnId}">click here</a>
                    </br></br>
                    Enjoy!
                    Best,
                    The Sattva team`;
            break;

        default:
            break;
    }
    return {subject,text};
}
