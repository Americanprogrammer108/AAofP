import express from 'express';
import Contact from "../Models/contact";
import User from '../Models/user';
import passport from 'passport';
import {AuthGuard} from '../util/index';
import {UserDisplayName} from '../util/index';
import {
    DisplayRegisterPage,
    DisplayLoginPage,
    ProcessLoginPage,
    ProcessRegisterPage,
    ProcessLogoutPage
} from "../controllers/auth";

const router = express.Router();
const {MongoClient} = require('mongodb');

// AUTHENTICATION ROUTES
router.get('/register', DisplayRegisterPage);
router.get('/login', DisplayLoginPage);


router.post('/login', ProcessLoginPage);
router.post('/register', ProcessRegisterPage);
router.get('/logout', ProcessLogoutPage);

//END OF AUTHENTICATION ROUTES
export default router;
