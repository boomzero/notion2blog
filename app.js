const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const config = require('./config');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postRouter = require('./routes/posts');


mongoose.connect(config.database.connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(res => console.log(`Connect to DB succesfully.`))
  .catch(err => console.log(`Error in DB connection ${err}`));

const app = express();
const authService = require('./services/AuthService')

app.use(session({
  // TODO: move to config
  secret: "random",
  resave: true,
  saveUninitialized: false,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(authService.router);
// TODO: test
// app.get('/', (req, res) => {
//   const template = 'login';
//   const userinfo = req.userContext && req.userContext.userinfo;
//   res.render(template, {
//     isLoggedIn: !!userinfo,
//     userinfo: userinfo,
//     baseUrl: webServerConfig.baseUrl,
//   });
// });

// app.use('/', authService.ensureAuthenticated(), indexRouter);
app.use('/users', usersRouter);
// show posts by default
app.use('/', postRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

authService.on('ready', () => {
  // eslint-disable-next-line no-console
  app.listen(config.webServer.port, () => console.log(`App started on port ${config.webServer.port}`));
});

module.exports = app;
