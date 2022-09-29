const otpGenerator = require('otp-generator');

/* Generating a random number of length 6. */
module.exports.generateOTP = () => {
  const otpConst = global._const.OTP;
  const OTP = otpGenerator.generate(otpConst.OTP_LENGTH, otpConst.OTP_CONFIG);
  return OTP;
};
