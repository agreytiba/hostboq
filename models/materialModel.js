const mongoose = require('mongoose');

const MaterialSchema = mongoose.Schema(
	{
		material: {
			type: String,
			required: [ true, 'weka jina la bidhaa' ],
		},
		unit: {
			type: String,
			required: [ true, 'weka kipimo cha bidhaa' ]
		},
		price:{
            type:Number,
            required: [ true, ' weka gharama ya bidhaa' ]
		},
		manufacturer: {
            type: String,
             default:""
		},
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Material', MaterialSchema);
