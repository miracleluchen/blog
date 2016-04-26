/**
 * Created by luch on 4/20/16.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
// var MongoDBStore = require('connect-mongo/es5')(session);
var flash = require('connect-flash');
var cors = require('cors');
var configAuth = require('./config/global');
var mongoose = require('mongoose');
mongoose.connect(configAuth.DB_ADDR, configAuth.DB_OPTIONS);
var posts = require('./routes/posts');

require('./auth/auth')(passport);

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'hBmPMvoH9fmcFvKkNz2hvpArzXUPo1dtjoO4o1I5pJGF685tI6YtDRIc7ZlXXyTp'
    // cookie: {maxAge: 2628000000},
    // store: new MongoDBStore({
    //     url: configAuth.DB_ADDR,
    // mongoOptions: configAuth.DB_OPTIONS,
    // collection: 'sessions'
    // })
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(cors());

require('./routes/auth')(app, passport);
app.use('/backend/api/posts', posts);

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});
