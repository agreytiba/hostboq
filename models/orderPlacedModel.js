const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
    {
     
		purchaseId: {
			type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'Purchase'
		},
		userName: {
			type: String,
			required: [ true, 'weka jina ' ]
		},
		phoneNumber:{
            type:Number,
            required: [ true, ' weka namba ya simu' ]
		},
		quantity:{
            type: Number,
            required: [ true, 'weka idadi' ]
		},
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Order', OrderSchema);
