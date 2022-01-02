
require('dotenv').config();

const express = require("express"),
      app = express(),
      bodyparser = require("body-parser"),
	  mongoose= require("mongoose"),
	  seedDB = require("./seeds"),
	  home = require("./models/home"),
	  Comment = require("./models/comments"),
	  passport = require("passport"),
	  LocalStrategy = require("passport-local"),
	  passportLocalMongoose = require("passport-local-mongoose"),
	  User = require("./models/user"),
	  methodoverride = require("method-override"),
	  session = require("express-session"),
	  flash = require("connect-flash"),
	  MongoDBStore = require("connect-mongo")(session);

const dburl = process.env.db_url;


// process.env.db_url;
const homeroutes = require("./routes/home"),
	  commentsroutes = require("./routes/comments"),
	  authenroutes = require("./routes/authen");
	  
// 'mongodb://localhost:27017/blog1'

mongoose.connect(dburl
				 , {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"))
app.set("view engine","ejs");
app.use(methodoverride("_method"));
app.use(flash());

app.use(express.urlencoded({
	extended:false
}));
app.use(express.json());


app.use(require("express-session")({
	secret:"It is awesome",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/home",homeroutes);
app.use("/home/:id/comments",commentsroutes);
app.use("/",authenroutes);



app.get("/contact",function(req,res){
	res.render("contact.ejs")
});


app.listen(process.env.PORT||3000,process.env.IP,function(){
	console.log("Project1 intiated...");
});