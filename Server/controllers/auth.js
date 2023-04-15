"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessLogoutPage = exports.ProcessRegisterPage = exports.ProcessLoginPage = exports.DisplayRegisterPage = exports.DisplayLoginPage = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../Models/user"));
const passport_1 = __importDefault(require("passport"));
const index_1 = require("../util/index");
const router = express_1.default.Router();
const { MongoClient } = require('mongodb');
function DisplayLoginPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'login', page: 'login',
            messages: req.flash('loginMessage'), displayName: (0, index_1.UserDisplayName)(req) });
    }
    return res.redirect('/contact-list');
}
exports.DisplayLoginPage = DisplayLoginPage;
function DisplayRegisterPage(req, res, next) {
    if (!req.user) {
        return res.render('index', { title: 'register', page: 'register',
            messages: req.flash('registerMessage'), displayName: (0, index_1.UserDisplayName)(req) });
    }
    return res.redirect('/contact-list');
}
exports.DisplayRegisterPage = DisplayRegisterPage;
function ProcessLoginPage(req, res, next) {
    passport_1.default.authenticate('local', function (err, user, info) {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (!user) {
            req.flash('loginMessage', 'Authentication Error');
            res.redirect('/login');
        }
        req.login(user, function (err) {
            if (err) {
                console.log('213344');
                console.error(err);
            }
            res.redirect('/contact-list');
        });
    })(req, res, next);
}
exports.ProcessLoginPage = ProcessLoginPage;
function ProcessRegisterPage(req, res, next) {
    let newUser = new user_1.default({
        username: req.body.FullName,
        EmailAddress: req.body.EmailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });
    console.log("password: " + req.body.password);
    user_1.default.register(newUser, req.body.password, function (err) {
        if (err) {
            if (err.name == "UserExistsError") {
                console.error("Error: user already exists");
                req.flash('registerMessage', 'Registration Error');
                res.redirect('/register');
                console.log("456");
            }
            return passport_1.default.authenticate('local')(req, res, function () {
                return res.redirect('/contact-list');
                console.log("123");
            });
        }
        console.log("000");
    });
}
exports.ProcessRegisterPage = ProcessRegisterPage;
function ProcessLogoutPage(req, res, next) {
    req.logOut(function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/login');
    });
}
exports.ProcessLogoutPage = ProcessLogoutPage;
exports.default = router;
//# sourceMappingURL=auth.js.map