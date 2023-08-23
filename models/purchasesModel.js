const mongoose = require('mongoose');

const purchasesSchema = mongoose.Schema(
	{
	
		material: {
			type: String,
			required: [ true, 'weka bidhaa' ],
		},
		price: {
			type: Number,
			required: [ true, 'weka gharama za bidhaa' ]
		},
		quantity: {
            type: Number,
            required: [ true, 'weka idadi ya bidhaa' ]
		},
		payBefore: {
			type: String,
			required: [ true, 'weka tarehe ya mwisho' ]
		},
		deliveryRange: {
            type: String,
			required: [ true, ' muda wa kufisha bidhaa sites' ] 
			
		},
		transport: {
			type: String,
			required: [ true, ' swala la usafiri' ]

		},
		orderStatus: {
			type: String,
		   default:"notPlaced"

		},
		userAcceptOffer:[]
	
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Purchase', purchasesSchema);
