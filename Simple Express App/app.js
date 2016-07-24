/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/express/express.d.ts" />
var express = require('express');
var path = require('path');
var app = express();
//set configuration
app.set('trust proxy', true);
app.set('case sensitive routing', true);
app.set('strict routing', true);
var users = [
    { username: "pk", password: "1", createdAt: Date.now(), bio: "He is very intelligent" },
    { username: "hadi", password: "2", createdAt: Date.now(), bio: "He is very genuius" },
    { username: "zain", password: "3", createdAt: Date.now(), bio: "He is very smart" },
    { username: "rehan", password: "4", createdAt: Date.now(), bio: "He is very talkative" },
    { username: "zeeshan", password: "5", createdAt: Date.now(), bio: "He is very goodlooking" },
];
//set view
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
//Middleware
app.use(express.static(path.join(__dirname, './public')));
app.get('/login', function (req, res) {
    res.render('login');
});
app.get('/signup', function (req, res) {
    res.render('signup');
});
app.post('/login', function (req, res) {
    res.redirect('/login');
});
app.get('/', function (req, res) {
    res.render('homepage', { users: users });
});
app.use('/:username', function (req, res, next) {
    for (var i = 0; i < users.length; i++) {
        if (req.params.username == users[i].username) {
            res.render('userprofile', { title: users[i].username, user: users[i].username, userdata: JSON.stringify(users[i]) });
        }
    }
});
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    var listenport = server.address().port;
    console.log("your server is listening at port: " + listenport);
});
