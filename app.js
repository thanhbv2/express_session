const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks')
const indexRouter = require('./routes/index');
const session = require('express-session');
const cors = require('cors');
const FileStore = require('session-file-store')(session);

const app = express();
const data = [
  { id: 1, username: 'test1', password: '123' },
  { id: 2, username: '007', password: '123' },
  { id: 3, username: 'test2', password: '123' },
  { id: 4, username: 'test3', password: '123' },
  { id: 5, username: 'test4', password: '123' },
]

nunjucks.configure('views', {
  autoescape: false,
  express: app,
  cache: true
});
app.engine('html', nunjucks.render);
app.set('view engine', 'html')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'test',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}))

app.use(cors());
app.use((req, res, next) => {
  if (!req.session.userId) {
    return next();
  }
  const user = data.find(el => el.id === req.session.userId);
  req.isLogin = true;
  next();
});
app.use('/', indexRouter);

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

module.exports = app;
