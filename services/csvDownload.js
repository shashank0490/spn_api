module.exports.exportCsv = (data, callback) => {
    res.writeHead(200, { "Content-Type": "text/csv" });
    res.flushHeaders();
    if (data.length > 0) {
        let headersObj = data[0];
        let headers = Object.keys(headersObj);
        res.write(headers.toString() + "\r\n");
        await data.forEach(doc => {
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
};

module.exports.convertToCSVString = async (data) =>{
    const cursor = data;
    let str='';
    if (cursor.length > 0) {
      let headersObj = Object.assign({}, cursor[0]);
      let headers = Object.keys(headersObj);
  
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
        str += arr.toString() + "\r\n";
      });
    }
    return str;
  }