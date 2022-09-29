const moment = require("moment");
const { handleError } = require("../middleware/handleError");
module.exports = function( err = [], message = "", status = 400){
	const res = this;
	let resData = {
		timestamp : moment().unix(),
		success  : false,
		message : message,
		err : handleError(!isObjectEmpty(err) || err.message ? err : {"message" : message})
	};
	console.log("Error Report ===========>",err,resData)
	return res.status(status).json(resData);
}

function isObjectEmpty(object) {
	var isEmpty = true;
	for (keys in object) {
	   isEmpty = false;
	   break; // exiting since we found that the object is not empty
	}
	return isEmpty;
  }