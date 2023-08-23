const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [ true, 'please add a name' ]
		},
		email: {
			type: String,
			required: [ true, 'please add an email' ],
			unique: true
		},
		phone: {
			type: Number,
			required: [ true, 'please add phone number' ]
		},
		accessLevel: {
			type: String,
			required: [ true, 'please add  access level' ]
		},
	  profilePic: {
      type: String,
      default: "",
    },

		password: {
			type: String,
			required: [ true, 'please add a password' ]
		},
		
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('User', userSchema);
