const mapper = require('../model').pageLanguageMapper;
const page = require('../model').page;
const language = require('../model').language;
const { updateOrCreate } = require('../../utils/common-function');

module.exports.page = (async (req, res) => {
    let bodydata = {...req.body};
    try {
        page.create(bodydata).then(data => {
            res.Ok(data,"CREATED SUCESSFULLY.")
        }).catch(err => {
            res.BadRequest(err,"Getting error while create!")
        })
    } catch (error) {
        
    }
})

module.exports.language = (async (req, res) => {
    let bodydata = {...req.body};
    try {
        language.create(bodydata).then(data => {
            return res.Ok(data,"CREATED SUCESSFULLY.")
        }).catch(err => {
            return res.BadRequest(err,"Getting error while create!")
        })
    } catch (error) {
        
    }
})

module.exports.pageLanguageMapper = (async (req, res) => {
    let bodydata = {...req.body};
    try {
        let where = {pageId: bodydata.pageId,languageId: bodydata.languageId};
        updateOrCreate(mapper,where,bodydata).then(async (data) => {
            if(data.id){
                return res.Ok(data,"CREATED SUCESSFULLY.");
            }else{
                return res.BadRequest(data,"Getting error while create!");
            }
        });
    } catch (error) {
        return res.BadRequest(error,"Getting error while create!")
    }
})