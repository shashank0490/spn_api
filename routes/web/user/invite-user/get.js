const User = require('../../model').user;
const inviteUser = require('../../model').inviteUser;

module.exports = async (req, res) => {
    try {
        if(!req.hasOwnProperty('user') && !req.query.hasOwnProperty('id')) throw new Error('User id not found.');

        let where = req.query ? req.query : {};
        if(req.user && req.user.id){
            where['userId'] = req.user.id;
        }
        let data = await inviteUser.findAll({where,raw : true});
        data = data ? await findRegisterUser(data) : data;
        return res.Ok(data,"FETCHED DATA.")
    } catch (error) {
        res.BadRequest(error,"CAUGHT EXCEPTION.")
    }
}

const findRegisterUser = (async (data) => {
    let listEmail = data.map(e => e.emailId);
    let where = {
        emailId: {
            $in: Array.from(new Set(listEmail))
        }
    };
    let registeredUser = await User.findAll({where,raw:true});
    if(registeredUser){
        for (const x of registeredUser) {
            let index = data.findIndex(e => e.emailId == x.emailId);
            if(index){
                data[index]['file'] = x.file;
                data[index]['registered'] = true;
            }
        }
    }

    for (const y of data) {
        if(!y.hasOwnProperty('file')){
            y['file'] = null;
            y['registered'] = false;
        }
    }
    return data;
})