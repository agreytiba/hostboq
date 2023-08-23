const mongoose = require('mongoose');

const mapDetailsSchema = mongoose.Schema(
	{
		userName: {
			type: String,
			required: [ true, 'jaza jina la mtumiaji' ]
		},
			userId: {
			type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'User'
		},
		region: {
			type: String,
			required: [ true, 'jaza jina la mkoa' ]
		},
		district: {
			type: String,
			required: [ true, 'jaza jina la wilaya' ]
		},
		ward: {
			type: String,
			required: [ true, ' jaza jina la mtaa' ]
		},
		status: {
			type: String,
			default: 'imetumwa'
		},
		startConstruction: {
			type: String,
			required: [ true, ' jaza tarehe  ya kuanza ujenzi' ]
		},
		assignTo: {
			type: String,
			default: ''
		},
		isOpen: {
			type: Boolean,
			default: false
		},
		desc: {
			type: String,
			default: ''
		},
		checkComment: {
			type: String,
			default:""
		},
		unitComment: {
			type: String,
			default:""
		},
		suggestionOnMap: {
			type: String,
			default:""
		},
		mapIds: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'PDF'
		}],
		
	
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Map', mapDetailsSchema);
