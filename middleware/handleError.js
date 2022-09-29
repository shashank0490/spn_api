
function handleError(err){
    let msg = {"message": err.message};
    if(err && err.errors){
        if(err.name && err.name == "SequelizeUniqueConstraintError"){
            msg = {"message": err['errors'][0]["path"].split("_").join(" ")}
        } else {
            msg = {"message": err['errors'][0]["message"]}
        } 
    }else if(err.length){
        msg = err.length && err[0].message ? {"message": err[0].message} : msg;
    }
    return msg;
}

module.exports = {
    handleError
}
