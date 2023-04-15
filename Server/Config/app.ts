import createError from 'http-errors';
import express, {NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from "mongoose";


import indexRouter from '../routes';
import usersRouter from '../routes/users';
import authRouter from '../routes/auth';
import contactListRouter from '../routes/contact-list';

//modules for authentication
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

import cors from 'cors';
import passportJWT from 'passport-jwt';

let JWTStrategy = passportJWT.Strategy;
let ExtractJwt = passportJWT.ExtractJwt;

let localStrategy = passportLocal.Strategy;


const app = express();

import * as DBConfig from "./db";
mongoose.connect(DBConfig.RemoteURI);
const db = mongoose.connection;



import User from '../Models/user';
app.use(cors());

db.on("error", function()
{
  console.error("Connection error");
});

db.once("open", function()
{
  console.log(`Connected to MongoDB at ${DBConfig.HostName}`);
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//added static paths
app.use(express.static(path.join(__dirname, "../../client")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

app.use(session({
  secret : DBConfig.SessionSecret,
  saveUninitialized: false,
  resave: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Implement an Authentication Strategy
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', contactListRouter);

let jwtOptions =
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: DBConfig.SessionSecret
    }

let strategy = new JWTStrategy(jwtOptions, function(jet_payload: any, done: any)
{
  User.find({id: jet_payload.sub}).then(function(user: any)
  {
    if(user)
    {
      return done(null, user);
    }
    if(user)
    {
      return done(null, false);
    }
    else
    {
      return done(null, false);
    }
  }).catch(function (err)
  {
    if(err)
    {
      return done(err, false);
    }
  });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req: express.Request, res: express.Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//AUTHENTICATION

export default app;
