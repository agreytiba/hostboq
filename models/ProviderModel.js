const mongoose = require('mongoose');

const providerSchema = mongoose.Schema(
	{
	
		name: {
			type: String,
			required: [ true, 'tafadhali weka jina' ],
		},
		region: {
			type: String,
			required: [ true, 'tafadhali jaza mkoa' ]
		},
			district: {
            type: Number,
            required: [ true, 'tafadhali jaza wilaya' ]
		},
		kata: {
			type: String,
			required: [ true, 'tafadhali weka kata' ]
		},
	
		status: {
			type: String,
			default: "hajasajiliwa"

		},
	
	services: [
		
	 ]
	
	
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Provider', providerSchema);
