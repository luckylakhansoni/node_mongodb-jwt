const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { to, ReE, ReS } = require('../services/util.service');
// const saltRounds = 10;



module.exports = {
	create: async function (req, res, next) {
		const body = req.body
		// body.password=bcrypt.hashSync(body.password, saltRounds);
		let [err, user] = await to(userModel.create(body))
		if (err) return ReE(err, 'data not insert')
		return ReS(res, 'data interest')
		// userModel.create(body, function (err, result) {
		// 	if(err)
		if (err)
			next(err);
		else
			res.json({ status: "success", message: "User added successfully!!!" });

		// });
	},

	authenticate: async function (req, res, next) {
		// userModel.findOne({ email: req.body.email }, function (err, userInfo) {
		const body = req.body
		let [err, update] = await to(userModel.findOne({ email: body.email }));
		console.log(err);
		if (err) {
			next(err);
		} else {

			if (update != null && bcrypt.compareSync(req.body.password, update.password)) {

				const token = jwt.sign({ id: update._id }, req.app.get('secretKey'), { expiresIn: '1h' });

				res.json({ status: "success", message: "user found!!!", data: { user: update, token: token } });

			} else {
				res.json({ status: "error", message: "Invalid email/password!!!", data: null });
			}
		}
		// });
	},

}					
