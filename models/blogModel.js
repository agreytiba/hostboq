const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
	{
	
		title: {
			type: String,
			required: [ true, ' weka kichwa cha post' ],
		},
		img: {
			type: String,
			 default:""
        },
        
		article: {
            type: String,
             default:"",
		},
		comments: [
			{
				userName: {type: String},
				comment: { type: String}
		   }
	   ]
	},
	{
		timestamps: true
	}
);
module.exports = mongoose.model('Blog', blogSchema);
