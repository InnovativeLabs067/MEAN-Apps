/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/express/express.d.ts" />

import express =require('express');
var path =require('path');
var bodyparser=require('body-parser');
var session=require('express-session');
var mongoose=require('mongoose');
var app=express();
// mongodb://<dbuser>:<dbpassword>@ds045054.mongolab.com:45054/todoapp
//mongodb://127.0.0.1/todoapp
var dburi='mongodb://test:test@ds045054.mongolab.com:45054/todoapp';
mongoose.connect(dburi);

//setting view-engine
app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');

//setting middleware
app.use(express.static(path.join(__dirname,'/public')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(session({
  genid: function(req) {
    return (Date.now().toString()) // use UUIDs for session IDs 
  },
  secret: '123456789'
}));

//connection verification
mongoose.connection.on('connected',function() {
    console.log('Connection status : Database connected');
})

mongoose.connection.on('error',function(err) {
    console.log('Connection status : fail \n' +err);
})

var todoSchema=mongoose.Schema({
    "email":{type:String, required:true},
    "task":{type:String, required:true},
    "description":{type:String, required:true},
    "createdOn":{type:Date,default:Date.now()}
})

var userSchema=mongoose.Schema({
   "username":{type:String , required:true},
   "email":{type:String,unique:true , required:true},
   "password":{type:String, required:true},
   "confirm_password":{type:String, required:true} ,
   "createdOn":{type:Date,default:Date.now()}
});


var todo=mongoose.model('todos',todoSchema);
var User=mongoose.model('Users',userSchema);

app.get('/logout',function(req:any,res){
    req.session["isLogin"]=false;
    req.session["username"]=null;
   res.redirect('/');
})

app.get('/todo',function(req:any,res){
    if(req.session["username"]){
       todo.find({"email":req.session["username"]},function(err,data) {
        if(err)console.log(err);
        else{
            console.log(data.length);
            if(data.length==0){ res.render('todo',{data:JSON.stringify(' ')});}
            else{res.render('todo',{data:JSON.stringify(data)});}
           
        }
        
    })
    }
    else{ res.render('login',{message:JSON.stringify("Kindly login first or create new account")})}
 })

app.post('/addtodos',function(req:any,res){
    console.log(typeof(req.session["username"]));
   var email =req.session["username"]
   console.log(email);
    var todo_list=new todo({
        "email": email,
        "task":req.body.task,
        "description":req.body.description,
        "createdOn":Date.now()
    }).save(function(err,data){
        if(err)console.log(err);
        else{
            console.log(data);
           res.redirect('/todo');
        }
    })
 
})

app.get('/delete/:id',function(req,res){
  todo.remove({"_id":req.params.id},function(err,data){
      if(err)console.log("Delete status\n"+err);
      else{
          console.log("Delete status : Deleted \n"+data);
          res.redirect('/todo');
      }
  })
})

app.get('/',function (req,res) {
    res.render('login',{message:JSON.stringify(" ")});
})
app.post('/signin',function(req:any,res){
   console.log(req.body.username + " "+ req.body.password);
    User.find({"email":req.body.username},function(err,data){
        if(data.length>0){
        for(var i=0;i<data.length;i++){
            if(data[i].email==req.body.username && data[i].password == req.body.password){
              req.session["isLogin"]=true;
               req.session["username"]=req.body.username;
                console.log(req.session["username"]);
    
    todo.find({"email": req.session["username"]},function(err,data) {
        
        if(err)console.log(err);
        else{
            console.log("/signin: "+data.length);
            if(data.length==0){ res.redirect('/todo');}
            else{ res.redirect('/todo');}
           
        }
        
    })}
    else{res.render('login',{message:JSON.stringify("Email or password entered not correctly")})}
}}   
else{res.render('login',{message:JSON.stringify("You are not authorized person kindly create your account")})}

});
})


app.post('/signup',function(req,res){
    var newUser=new User({
   "username":req.body.username,
   "email":req.body.email,
   "password":req.body.password,
   "confirm_password":req.body.password_confirm,
    "createdOn":Date.now()
    }).save(function(err,data) {
        if(err) {console.log(err);
            res.render('login',{message:JSON.stringify("Account cannot create your email already registered....")})
            }
        else {
            var message="Your account has been created";
            res.render('login',{message:JSON.stringify(message)});
            console.log(data)
             };
    })
    
})

var port:number=process.env.PORT||3000;
var server=app.listen(port,function() {
    var listen_port=server.address().port;
    console.log('server is listening at port: '+listen_port);
})