const moment = require("moment");
const csvwriter = require('csv-writer');
let createCsvWriter = csvwriter.createObjectCsvWriter;

/**
 * Two function one is defalut function and second is exportCsv work same but use diffrent type of login for download csv file
 */
module.exports = async function (req, res) {
  if((req['data'] && req['data'].length > 0) || req.model){
    const where = req.condition ? req.condition : {};
    const cursor = req['data'] ? req['data'] : req.model.findAll({where});
    const path = req["fileName"] ? req["fileName"] : "export.csv";

    res.writeHead(200, { "Content-Type": "text/csv" });
    res.flushHeaders();
  
    if(cursor.length > 0){
      let headersObj = Object.assign({},cursor[0]);
      let headers = Object.keys(headersObj);
      res.write(headers.toString() + "\r\n");
      await cursor.forEach(doc => {
        let arr = [];
        for (k of headers) {
          arr.push(
            Array.isArray(doc[k]) ?
            doc[k].join(" & ") :
            doc[k] || doc[k] == 0
            ? typeof doc[k] == "number"
                ? doc[k]
                : '"' +
                  JSON.stringify(doc[k])
                      .toString()
                      .replace(/[\/\\,~'";]/g, "") +
                  '"'
            : ""
          );
        }
        res.write(arr.toString() + "\r\n");
      });
      res.end();
    }
  }else{
    return res.status(400).json({
      timestamp: moment().unix(),
      success: false,
      message: "Record is empty!"
    });
  }
};


/* A function that will be called when the user clicks on the download button. */
module.exports.generateCSV = async function (req, res) {
  try {
    if(req['data']|| req.model){
      const where = req.condition ? req.condition : {};
      const model = req.model ? req.model : "";
      const cursor = req['data'] ? req['data'] : await model.findAll({where,raw:true});
      const path = req["fileName"] ? req["fileName"] : "export.csv";
      if(!cursor.length) throw new Error('Record is empty!');
  
      let header = cursor.map(e => Object.keys(e).map(x => { return { id: x,title:x}; }));
      const csvWriter = createCsvWriter({
        path: path,
        header: header ? header[0] : []
      });
      try {
        csvWriter.writeRecords(cursor).then(() => {res.download(path)});
      } catch (error) {
        return res.BadRequest(error,"Error while write csv !");
      }
    }else{
      return res.BadRequest({},"Invalid request!");
    }
  } catch (error) {
    return res.BadRequest({},"Record is empty!");
  }
};