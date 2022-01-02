const express = require("express"),
 router = express.Router(),
 home = require("../models/home"),
 middlewareobj = require("../middleware");




router.get("/",function(req,res){
home.find({},function(err, allhome){
		if(err){
			console.log(err);
		}else{
			res.render("home",{home:allhome,currentUser:req.user});
		}
	});
});

router.post("/",function(req,res){
	const series=req.body.series,
	 image=req.body.image,
	 data=req.body.data,
     premise =req.body.premise,
		  
	 castp1 = req.body.castp1,
	 castp2 = req.body.castp2,
	 castp3 = req.body.castp3,
	 castp4 = req.body.castp4,
	 castp5 = req.body.castp5,
	 castp6 = req.body.castp6,
		  
	 castn1 = req.body.castn1,
	 castn2 = req.body.castn2,
	 castn3 = req.body.castn3,
	 castn4 = req.body.castn4,
	 castn5 = req.body.castn5,
	 castn6 = req.body.castn6,
		  
	 castd1 = req.body.castd1,
	 castd2 = req.body.castd2,
	 castd3 = req.body.castd3,
	 castd4 = req.body.castd4,
	 castd5 = req.body.castd5,
	 castd6 = req.body.castd6,
		  
	 link=req.body.link,
	 watch=req.body.watch,
		  author = {
		id:req.user._id,
		username:req.user.username
	},
	 newhome = {series:series,image:image,data:data,premise:premise,
				castp1:castp1,castp2:castp2,castp3:castp3,castp4:castp4,castp5:castp5,castp6:castp6,
				castn1:castn1,castn2:castn2,castn3:castn3,castn4:castn4,castn5:castn5,castn6:castn6,
				castd1:castd1,castd2:castd2,castd3:castd3,castd4:castd4,castd5:castd5,castd6:castd6,
				link:link,watch:watch,author:author};
	home.create(newhome,function(err,newone){
		if(err){
			console.log(err);
		}else{
			res.redirect("/home");
		}
	});
});


router.get("/newkh41",middlewareobj.isLoggedIn,function(req,res){
	res.render("new")
});
	
router.get("/:id",function(req,res){
	home.findById(req.params.id).populate("comments").exec(function(err,foundhome){
		if(err){
			console.log(err);
		}else{
				res.render("show",{home:foundhome});
		}
	});
});

router.get("/:id/edit",middlewareobj.checkownership,function(req,res){
	
		home.findById(req.params.id,function(err,foundhome){
		res.render("edit",{home : foundhome});
	});	
});

router.put("/:id",middlewareobj.isLoggedIn,function(req,res){
	home.findByIdAndUpdate(req.params.id,req.body.home,function(err,updatehome){
		if(err){
			res.redirect("/home");
		}else{
			res.redirect("/home/" + req.params.id);
		}
	
	});
});

router.delete("/:id",middlewareobj.checkownership,function(req,res){
	home.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/home");
		}else{
			res.redirect("/home");
		}
	});
});






module.exports = router;