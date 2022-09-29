const moment = require("moment");
const csv = require('csv-parser');
const fs = require('fs');
const csvDownload = require('../../utils/csvDownload');
const { apiCall } = require('../../utils/common-function');

let columnIs = {
    "pageId" : "Page Id",
    "languageId" : "language Id",
    "code" : "Fields Codes",
    "value" : "Fields Value",
    "placeholder" : "Fields placeholder"
};

module.exports = async function (req, res) {
    try {
        if(!process.env.BACKEND_HOSTNAME || process.env.BACKEND_HOSTNAME == undefined) throw new Error("HOSTNAME is invalid!");

        let host = process.env.BACKEND_HOSTNAME+'web/api/';
        let errorArray = [];
        let arraData = [];
        let header = {
            'x-access-token' : req.headers['x-access-token'],
            "Content-Type": "application/json"
        }

        await new Promise((resolve) => {
            fs.createReadStream(req.file.path).pipe(csv({})).on('data',(data) => arraData.push(data)).on('end',async ()=> {
                let i = 0;
                let isValidateTrue = await validateColumn(arraData);
                if(!isValidateTrue.some(e => e.response && e.response.success === false)){
                    const listOfArr = convertStructure(arraData);
                    for (const objectIs of listOfArr) {
                        let modifYData = await modifyObject(objectIs);
                        i++;
                        if(!modifYData.err){
                            let options = {
                                method: "POST",
                                headers: header,
                                url: `${host}page-language-mapper`,
                                json: true,
                                body: modifYData
                            };
                            await apiCall(options,async (resIs)=>{
                                errorArray.push({"response" : resIs,"data" : modifYData});
                                if(listOfArr.length === i){
                                    resolve(errorArray);
                                }
                            });
                        }else{
                            errorArray.push({"response" : modifYData,"data" : objectIs});
                            if(listOfArr.length === i){
                                resolve(errorArray);
                            }
                        }
                    }
                }else{
                    resolve(isValidateTrue);
                }
            })
        }).then(async (result) => {
            fs.unlinkSync(req.file.path);
            console.log("After Used File removed:", req.file.path);
            let findOnlyErrorData = await result.filter(e => e.response && e.response.success == false);
            if(findOnlyErrorData && findOnlyErrorData.length && findOnlyErrorData.length > 0){
                let errorIndata = findOnlyErrorData.some(e => e.data);
                return res.BadRequest(
                            findOnlyErrorData.map(x => x.response.message).join(","),
                            errorIndata ? 
                                    "Getting error while uploading!" : 
                                    findOnlyErrorData.some(e => e.response.message) ? 
                                    findOnlyErrorData.map(x => x.response.message).join(",") : 
                                    "Getting error while uploading!"
                        );
            }else{
                return res.OK({},"Uploaded Successfully!");
            }
        })
    } catch (error) {
        return res.BadRequest(error,"Getting error while upload");
    }
}

/* Used to download the sample file. */
module.exports.sampleFormat = async function (req,res){
    req["fileName"] = 'LanguageContent'+ "-" + moment().format("DD-MMM-YY") + ".csv";
    let newObj = {};
    Object.keys(columnIs).map(k =>{
        newObj[k] = columnIs[k];
    });
    req.data = [newObj];
    await csvDownload.generateCSV(req,res);
}

/**
 * Create a new object by copying the old object and then modifying the new object
 * @param oldObj - The object to be modified.
 * @returns The new object with the modified values.
 */
async function modifyObject(oldObj){ 
    try {
        oldObj['languageId'] = parseInt(oldObj['languageId']);
        oldObj['pageId'] = parseInt(oldObj['pageId']);
        return oldObj;
    } catch (error) {
        let err = { message: error.message};
        let obj = {
            success: false,
            message: error.message
        }
        Object.assign(obj, {err});
        return obj;
    }
    
}

/**
 * This function is used to validate the column names of the dataframe
 * @param arr - The array of objects that you want to validate.
 * @returns an array of objects. Each object contains the response and the message.
 */
async function validateColumn(arr){
    let errorArr = [];
    let newObj = {};
    Object.keys(columnIs).map(k => {
        newObj[k] = columnIs[k];
    });

    if(arr.length && arr.length > 0){
        let firstIndex = Object.keys(arr[0]);
        if(JSON.stringify(Object.keys(newObj)) === JSON.stringify(firstIndex)){
            let obj = {
                success: true,
                message: 'Column matched'
            }
            errorArr.push({'response' : obj,'message' : "Column matched"});
        }else{
            let obj = {
                success: false,
                message: 'Column mismatched! Please refer to sample file.'
            }
            errorArr.push({'response' : obj,'message' : "Column mismatched! Please refer to sample file."});
        }
    }
    return errorArr;
}

const convertStructure = ((arrList) => {
    newArr = [];
    for (const list of arrList) {
        if(Object.hasOwn(newArr, list.pageId+'_'+list.languageId)){
            newArr[list.pageId+'_'+list.languageId]['fields'][list.code+'_placeholder']= list.placeholder;
            newArr[list.pageId+'_'+list.languageId]['fields'][list.code]= list.value;
            newArr[list.pageId+'_'+list.languageId]['pageId'] = list.pageId;
            newArr[list.pageId+'_'+list.languageId]['languageId'] = list.languageId;
        }else{
            newArr[list.pageId+'_'+list.languageId] = {};
            newArr[list.pageId+'_'+list.languageId]['fields'] = {};
            newArr[list.pageId+'_'+list.languageId]['fields'][list.code+'_placeholder']= list.placeholder;
            newArr[list.pageId+'_'+list.languageId]['fields'][list.code]= list.value;
            newArr[list.pageId+'_'+list.languageId]['pageId'] = list.pageId;
            newArr[list.pageId+'_'+list.languageId]['languageId'] = list.languageId;
        }
    }
    return Object.values(newArr);
})