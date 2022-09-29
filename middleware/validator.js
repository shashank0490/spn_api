global.validatePancard = function(password) {
    if(!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(password))) {
        throw new Error('The password must contain at least 10 and maximum 12 characters including at least 1 uppercase, 1 lowercase, one number and one special character.');
    }
}