/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/express/express.d.ts" />
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var nunjucks = require('express-nunjucks');
var session = require('express-session');
var app = express();
//set configuration
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
//app.set('view engine','ejs');
//Middlewares
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(session({
    genid: function (req) {
        return (Date.now().toString()); // use UUIDs for session IDs 
    },
    secret: '123456789'
}));
//Handle logout request middleware
app.get('/logout', function (req, res) {
    req.session["isLogin"] = false;
    res.render("form", { "message": JSON.stringify('') });
});
//DataBase connection
////mongodb://test:test@ds061345.mongolab.com:61345/portfolioapp
//mongodb://localhost/portfolioapp
var dbUri = "mongodb://test:test@ds061345.mongolab.com:61345/portfolioapp";
mongoose.connect(dbUri);
mongoose.connection.on('connected', function () {
    console.log('Database connected');
});
mongoose.connection.on('error', function (err) {
    console.log(err);
});
//Database Schema
var blogSchema = mongoose.Schema({
    "name": { type: String },
    "message": { type: String },
    "status": { type: Boolean, default: false },
    "sendOn": { type: Date, default: Date.now() }
});
//Database Model 
var Blog = mongoose.model('blogs', blogSchema);
//Mainpage
app.get('/', function (req, res) {
    Blog.find({ "status": true }, function (err, data) {
        if (err) {
            console.log("Error in status" + err);
        }
        else {
            if (data.length == 0) {
                console.log(" " + data);
                res.render('blog', { commit: false, count: data.length });
            }
            else {
                console.log("approved commit " + data);
                console.log(data.length);
                res.render('blog', { commit: JSON.stringify(data), count: data.length });
            }
        }
        ;
    });
});
app.post('/commit', function (req, res) {
    console.log(req.body.message);
    console.log(req.body.username);
    var blog = new Blog({
        "name": req.body.username,
        "message": req.body.message,
        "status": false,
        "sendOn": Date.now()
    }).save(function (err, data) {
        if (err)
            console.log(err);
        else
            console.log(data);
    });
    res.send("Your message has been submitted and is pending approval by an admin.");
});
app.get('/admin', function (req, res) {
    res.render("form", { "message": JSON.stringify('') });
});
app.get('/adminpanel', function (req, res) {
    if (req.session["isLogin"]) {
        Blog.find({ "status": false }, function (err, data) {
            if (err) {
                console.log("Admin" + err);
            }
            else {
                res.render('adminpanel', { data: JSON.stringify(data) });
            }
        });
    }
    else {
        res.redirect('/logout');
    }
});
app.post('/admin', function (req, res) {
    console.log(req.body.username + " " + req.body.password);
    if (req.body.username == "admin" && req.body.password == "nodejs.html") {
        Blog.find({ "status": false }, function (err, data) {
            if (err) {
                console.log("Admin" + err);
            }
            else {
                req.session["isLogin"] = true;
                res.render('adminpanel', { data: JSON.stringify(data) });
            }
        });
    }
    else {
        res.render('form', { message: JSON.stringify("You are not authorized person") });
    }
});
app.get('/approve/:id', function (req, res) {
    console.log(req.params.id);
    Blog.update({ _id: req.params.id }, { $set: {
            "status": true
        }
    }, function (err, data) {
        if (err)
            console.log("Update: " + err);
        else
            console.log("updated: " + data);
    });
    res.redirect('/adminpanel');
});
app.get('/delete/:id', function (req, res) {
    Blog.remove({ "_id": req.params.id }, function (err, data) {
        if (err) {
            console.log("Delete: " + err);
        }
        else {
            console.log("Delete" + data);
        }
        ;
    });
    res.redirect('/adminpanel');
});
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    var listenport = server.address().port;
    console.log("server is listening at port: " + listenport);
});
/*app.get('/',function(req,res){
    res.render('form',{message:JSON.stringify("pk")});
})*/
/*var userSchema=mongoose.Schema({
   "username":{type:String , required:true},
   "email":{type:String,unique:true , required:true},
   "password":{type:String, required:true},
   "confirm_password":{type:String, required:true} ,
   "createdOn":{type:Date,default:Date.now()}
});
 
var User=mongoose.model('Users',userSchema);*/
/*app.post('/registration',function(req,res){
    var newUser=new User({
   "username":req.body.username,
   "email":req.body.email,
   "password":req.body.password,
   "confirm_password":req.body.password_confirm,
    "createdOn":Date.now()
    }).save(function(err,data) {
        if(err) console.log(err);
        else console.log(data);
    })
    var message="Your account been created";
    res.render('form',{message:JSON.stringify(message)});
})*/
/*app.post('/login',function(req:any,res){
    console.log("req.hit")
    console.log(req.body.email);
    User.find({"email":req.body.email},function(err,data){
        for(var i=0;i<data.length;i++){
            if(data[i].email==req.body.email && data[i].password == req.body.password){
               req.session["isLogin"] = true;
               req.session["user"] = req.body.email;
                  Blog.find({"status":true},function(err,data){
     if(err){console.log("Error in status"+ err)}
     else{
         if(data.length==0){
             console.log(" "+data)
             res.render('blog',{commit:false})
        }
         else{ console.log("approved commit "+data)
           res.render('blog',{commit:JSON.stringify(data)})}
   };
 })
            }
            else{
                res.send("Invalid user");
            }
        }
    })
})*/ 
