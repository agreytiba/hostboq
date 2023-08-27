const mongoose = require('mongoose');

const finishingSchema = mongoose.Schema(
	{
		material: {
			type: String,
			required: [ true, 'weka jina la bidhaa' ],
		},
		unit: {
			type: String,
			required: [ true, 'weka kipimo cha bidhaa' ]
		},
		rate:{
            type:Number,
            default: 0,
		},
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Finishing', finishingSchema);
