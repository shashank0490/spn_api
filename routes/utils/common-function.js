
const {phone} = require('phone');
const Op = Sequelize.Op;
const request = require('request');

/**
 * It will either create a new record or update an existing record based on the where clause.
 * @param model - The model you want to update or create
 * @param where - { id: 1 }
 * @param newItem - The item to be created or updated
 * @param cb - callback function
 */
const updateOrCreate  = (model, where, newItem, transaction = false) =>  {
    // First try to find the record
    return model
    .findOne({where: where})
    .then(function (foundItem) {
        if (!foundItem) {
            // Item not found, create a new one
            return model
                .create(newItem,{transaction})
                .then(function (item) { return  item }).catch(function (error) {
                    // console.log("Test foundItem==========>",error,where)
                     return error 
                });
        }
         // Found an item, update it
        return model
            .update(newItem, {where: where, transaction})
            .then(function (item) { 
                return model.findOne({ where: where});
            }).catch(function (error) { return error });
    })
}

const findAndUpdate  = (model, where, newItem, _cb) =>  {
    // First try to find the record
    model
    .findOne({where: where})
    .then(function (foundItem) {
        if (!foundItem) {
            // Item not found
            _cb(false,{message : "Error while getting data for update"});
        }else{
            model
                .update(newItem, {where: where})
                .then(function (item) { 
                    _cb(true,model.findOne({ where: where}));
                }).catch(function (error) {
                    _cb(false,error);
                });
        }
    })
}


/* Checking if the email is valid or not. */
ValidateEmail = (mail) => {
    if (
        mail &&
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(mail)
    ) {
        return true;
    }
    return false;
};
  
/* Checking if the input is a 10 digit number. */
const validatePhoneNumber = (contactNo) => {
    if(!contactNo.hasOwnProperty('countryCode')){
        var phoneno = /^\d{10}$/;
        if (contactNo && contactNo.match(phoneno)) {
            return true;
        } else {
            return false;
        }
    }else{
        let codeWithNumber = contactNo.countryCode+' '+contactNo.number;
        let checkIsValid = phone(codeWithNumber);
        return checkIsValid.isValid;
    }
};


const filterBind = (req, res, next) => {
    if(req.query){
        if(req.query.name){
            req.query.name = {[Op.like]: `%${req.query.name}%`};
        }
    }
    next();
};

/**
 * It makes an API call to the specified URL and returns the response.
 * @param options - The options object that is passed to the request.post() function.
 * @param cb - Callback function to be called when the API call is complete.
 */
async function apiCall(options,cb){
    cb(await new Promise((resolve) => {
        request(options, (err, response, body) => {
            resolve(body);
        });
    }).then(data =>{
        return data;
    }));
}

module.exports = {
    updateOrCreate,
    validatePhoneNumber,
    ValidateEmail,
    findAndUpdate,
    filterBind,
    apiCall
};