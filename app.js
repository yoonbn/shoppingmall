var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session'); //세션 모듈
var passport = require('passport'); //passport 설치

global.pool = require('./config/dbpool');



var app = express();
var main = require ('./routes/index');
var products = require('./routes/products');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    "secret" : process.env.JOGON_SERVER_KEY,  //open rand -base64 32 실제로는 프로세스에 넣고 작업
    "cooike" : { "maxAge" : 86400000 }, //하루동안 세션을 사용
    "resave" : true, //변경되었을때 세션 정보 재저장
    "saveUninitialized" : true //초기화 되지 않은상태여도 저장
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', main);
app.use('/products', products); //마운트 포인트지정 (member)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
