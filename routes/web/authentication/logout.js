const LoginHistory = require('../model').loginHistory;

/* Updating the login history table with the logout time and location. */
module.exports = async function (req, res) {
	let updateData = { logged_out_at: new Date() };
	if (req.body.lat && req.body.lng) {
		updateData = { ...updateData, "logout_location_lat": req.body.lat, "logout_location_lng": req.body.lng }
	}
	let condition = { id: req.user.loginId }
	let data = await LoginHistory.update(updateData, { where: condition })
	try {
		if (data != null) {
			res.Ok(data,"logout successfully");
		} else {
			return res.BadRequest({},"token not valid");
		}
	} catch (err) {
		return res.BadRequest(err,"Failed to create login-history!");
	};
}