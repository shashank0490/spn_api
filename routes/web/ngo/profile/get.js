const profile = require('../../model').profile;
const inviteUser = require('../../model').inviteUser;
const user = require('../../model').user;

module.exports = async (req, res) => {
    try {
        let where = req.query ? req.query : {};
        where = await checkPanOrTxnId(where);
        let data = await profile.findAll({where,raw : true});
        return res.Ok(data,"FETCHED DATA.");
    } catch (caughtErr) {
        return res.BadRequest(caughtErr,"CAUGHT EXCEPTION");
    }
}

const checkPanOrTxnId = (async(where) => {
    if(where.hasOwnProperty('txnId') && where.txnId != ''){
        let filter = {txnId : where.txnId, isActive: '1'};
        relateProfile = { 
            model: profile,
            attributes: ['pancard'],
            as: 'ngo_profile'
        };

        relateUser = { 
            model: user,
            attributes: ['ngoProfileId'],
            as: 'user',
            include: [relateProfile]
        };
        let data = await inviteUser.findOne({where : filter, include: [relateUser],raw : true,nest: true});
        if(!data || !data.user || !data.user.ngo_profile || !data.user.ngo_profile.pancard){
            throw new Error('Data not exist!');
        }
        
        if(await checkAlreadyRegister({emailId: data.emailId, isActive: '1'})) throw new Error('Your are already registered, please login to continue.');

        where['pancard'] = data.user.ngo_profile.pancard;
        delete where['txnId'];
        return where;
    }else{
        return where;
    }
});

const checkAlreadyRegister = (async(where) => {
    return await user.findOne({where, raw : true});
});

module.exports.checkAlreadyRegister = checkAlreadyRegister;

