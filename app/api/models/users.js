const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,		
	
	},
	email_id: {
		type: String,
		trim: true,
		},
	password: {
		type: String,
		trim: true,
		},
		user_type:{ // user type 1 = emp, // 2 = manager 
			type:String,
			trim:true
		},
		
			
		
},{timestamps: true});

UserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});

module.exports = mongoose.model('User', UserSchema);