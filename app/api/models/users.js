const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	userid: String,
	organisation: { type: Schema.Types.ObjectId, ref: 'organisation' },
	license: { type: String },
	login: { type: String },
	class: { type: String, default: 'user' },
	type: { type: String, default: 'advisor' },
	scope: { type: String, default: 'advisor' },
	personal: String,
	contact: String,
	flags: { first_login: { type: Boolean, default: true } },
	log: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

UserSchema.pre('save', function (next) {
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

module.exports = mongoose.model('User', UserSchema);