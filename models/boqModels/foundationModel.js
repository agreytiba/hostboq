const mongoose = require('mongoose');

const foundationSchema = mongoose.Schema(
	{
		mapId: {
			type:String,
			// type: mongoose.Schema.Types.ObjectId,
			required: true,
			// ref: 'Map'
			
		},
		type: {
				type:String,
			    default: "foundation"
			
		},
		userId: { type: String, required: [ true, ' id ya mteja' ] },
		materials: [
			{
				quantity: { type: Number, required: [ true, ' weka idadi cha bidhaa' ] },
				materialId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Material' }
			}
		]
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Foundation', foundationSchema);
