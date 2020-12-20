const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
	series:String,
	image:String,
	data:String,
	premise:String,
	
	castp1:String,
	castp2:String,
	castp3:String,
	castp4:String,
	castp5:String,
	castp6:String,
	
	castn1:String,
	castn2:String,
	castn3:String,
	castn4:String,
	castn5:String,
	castn6:String,
	
	castd1:String,
	castd2:String,
	castd3:String,
	castd4:String,
	castd5:String,
	castd6:String,
	
	link:String,
	watch:String,
	author:{
		id:{		
	    type:mongoose.Schema.Types.ObjectId,
		ref:"User"
},
		   username:String
	},
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	]
});

module.exports = mongoose.model("home",homeSchema);