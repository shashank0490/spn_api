const page = require('../model').page;
const language = require('../model').language;
const mapper = require('../model').pageLanguageMapper;
const model = require('../model');
const csvDownload = require('../../utils/csvDownload');

module.exports.page = (async(req, res) => {
    try {
        let where = req.query ? req.query : {};
        let data = await page.findAll({where});
        return res.Ok(data,"FETCHED DATA.");
    } catch (caughtErr) {
        return res.BadRequest(caughtErr,"CAUGHT EXCEPTION.");
    }
});

module.exports.download = (async(req, res) => {
    try {
        if(!req.params._model) throw new Error("Invalid request!");
        var requestModel = req.params._model
        req.fileName = req.params._model+'.csv';
        if(requestModel = (model[requestModel] || model.masters[requestModel])){
            req.model = requestModel;
            req.condition = {};
            csvDownload.generateCSV(req,res);
        }else{
            throw new Error("Requested model not found!");
        }
    } catch (error) {
        res.BadRequest(error,"Error while downloading.")
    }
});

module.exports.language = (async(req, res) => {
    try {
        let where = req.query ? req.query : {};
        let data = await language.findAll({where});
        return res.Ok(data,"FETCHED DATA.");
    } catch (caughtErr) {
        return res.BadRequest(caughtErr,"CAUGHT EXCEPTION.");
    }
});

module.exports.languageMapper = (async(req, res) => {
    try {
        let where = req.query ? req.query : {};
        let lngWhere = {};
        if(!req.params._lng) throw new Error("Please select language.");

        lngWhere['code'] = req.params._lng;

        relatePage = { 
            model: page,
            attributes: ['name','code'],
            as: 'page'
        };
        relateLanguage = { 
            model: language,
            attributes: ['language','code'],
            where: lngWhere,
            as: 'language'
        };
        let data = await mapper.findAll({where,raw : true, include: [relatePage,relateLanguage],raw : true});
        console.log("ANup Test ==========>",data)
        data = data ? await modifyData(data) : data;
        return res.Ok(data,"FETCHED DATA.");
    } catch (caughtErr) {
        return res.BadRequest(caughtErr,"CAUGHT EXCEPTION.");
    }
});

const modifyData = (async(data) => {
    let newObj = {}
    const valArr = Object.values(data);
    for (const obj of data) {
        newObj[obj['page.code']] = obj['fields'];
    }
    return newObj;
});