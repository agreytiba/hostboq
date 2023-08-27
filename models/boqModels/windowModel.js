const mongoose = require('mongoose');

const windowSchema = mongoose.Schema(
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
        type:[]
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Window', windowSchema);
