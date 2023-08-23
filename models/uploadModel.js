const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema(
	{
		filename: { type: String },
		originalname: { type: String },
		path: { type: String }
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Upload', uploadSchema);
