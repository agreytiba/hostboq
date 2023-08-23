const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema(
	{
		filename: {
			type: String,
			required: [true, "hakuna jina la ramani"]
		},
		data: {
			type: Buffer,
			required: [true, "hakuna jina la ramani"]
		}
	},
	{
		timestamps: true
	}
);


module.exports = mongoose.model('PDF', uploadSchema);
