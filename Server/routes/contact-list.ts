import express, {Request, Response, NextFunction} from 'express';
import Contact from "../Models/contact";
import User from '../Models/user';
import passport from 'passport';
import {AuthGuard} from '../util/index';
import {UserDisplayName} from '../util/index';

import {
    DisplayAddPage,
    DisplayContactListPage,
    DisplayEditPage,
    ProcessAddPage,
    ProcessDeletePage, ProcessEditPage
} from "../controllers/contact-list";

const router = express.Router();
const {MongoClient} = require('mongodb');


//CONTACT-LIST ROUTES
router.get('/contact-list', DisplayContactListPage);
router.get('/add', DisplayAddPage);

router.post('/add', ProcessAddPage);

router.get('/delete/:id', ProcessDeletePage);

router.get('/edit/:id', DisplayEditPage);

router.post('/edit:id', ProcessEditPage);

//END OF CONTACT-LIST ROUTES
export default router;