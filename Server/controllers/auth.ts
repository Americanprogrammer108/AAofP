import express, {Request, Response, NextFunction} from 'express';
import Contact from "../Models/contact";
import User from '../Models/user';
import passport, {deserializeUser} from 'passport';
import {AuthGuard} from '../util/index';
import {UserDisplayName} from '../util/index';

const router = express.Router();
const {MongoClient} = require('mongodb');

export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', {title: 'login', page: 'login',
        messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }
    return res.redirect('/contact-list');
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', {title: 'register', page: 'register',
            messages: req.flash('registerMessage'), displayName: UserDisplayName(req) });
    }
    return res.redirect('/contact-list');
}

//PROCESSING
export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void
{
    passport.authenticate('local', function(err: Error, user: Express.User, info: string)
    {
        if(err)
        {
            console.error(err);
            return next(err);
        }

        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            res.redirect('/login');
        }

        req.login(user, function(err)
        {
            if(err)
            {
                console.log('213344');
                console.error(err);
            }
            res.redirect('/contact-list');
        });

    })(req, res, next);
}
export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    let newUser = new User(
        {
            username : req.body.FullName,
            EmailAddress: req.body.EmailAddress,
            DisplayName: req.body.firstName + " " + req.body.lastName
        });

    console.log("password: " + req.body.password);
    User.register(newUser, req.body.password, function(err)
    {
        if(err)
        {
            if(err.name == "UserExistsError")
            {
                console.error("Error: user already exists");
                req.flash('registerMessage', 'Registration Error');
                res.redirect('/register');
                console.log("456");
            }

            return passport.authenticate('local')(req, res, function()
            {
                return res.redirect('/contact-list');
                console.log("123");
            });
        }
        console.log("000");
    });
    
}
export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
    req.logOut(function(err)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        res.redirect('/login');
    });
}


//
// // AUTHENTICATION ROUTES
// router.get('/register', function(req, res, next) {
//     if(!req.user)
//     {
//         return res.render('index', {title: 'Register', page: 'register',
//             messages: req.flash('registerMessage'), displayName : UserDisplayName(req) });
//         return res.redirect("/contact-list");
//     }
//
// });
//
//
// router.post('/login', function(req, res, next) {
//     passport.authenticate('local', function(err: Error, user: Express.User, info: string)
//     {
//         if(err)
//         {
//             console.error(err);
//             res.end(err);
//         }
//
//         if(!user)
//         {
//             req.flash('loginMessage', 'Authentication Error');
//             res.redirect('/register');
//         }
//
//         req.login(user, function(err)
//         {
//             if(err)
//             {
//                 console.error(err);
//             }
//             res.redirect('/contact-list');
//         });
//
//     })(req, res, next);
//
// });
//
//
// router.post('/register', function(req, res, next) {
//     let newUser = new User(
//         {
//             username : req.body.FullName,
//             EmailAddress: req.body.EmailAddress,
//             DisplayName: req.body.firstName + " " + req.body.lastName
//         });
//
//     console.log("password" + req.body.password);
//     User.register(newUser, req.body.password, function(err)
//     {
//         if(err)
//         {
//             if(err.name == "UserExistsError")
//             {
//                 console.error("Error: user already exists");
//                 req.flash('registerMessage', 'Registration Error');
//                 res.redirect('/register');
//             }
//
//             return passport.authenticate('local')(req, res, function()
//             {
//                 return res.redirect('/contact-list');
//             });
//
//
//         }
//     });
//
//
// });
//
// //END OF AUTHENTICATION ROUTES

export default router;
