const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Define a schema
const Schema = mongoose.Schema;

const UserLeave = new Schema({
    
    userId: {
		type: Object,
		trim: true,		
	
    },
    reason: {
		type: String,
		trim: true,		
	
    },
    leave_name: {
		type: String,
		trim: true,		
	
	},
	leave_type: {
		type: String,
		trim: true,
		},
		user_type: {
			type: Number,
			trim: true,
			},
	isApproved: { // 1 pending, 2 approved , 3 reject by management   
		type: Number,
		default:1
		},
		
			
		
},{timestamps: true});



module.exports = mongoose.model('UserLeave', UserLeave);