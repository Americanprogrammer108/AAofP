import express from 'express';
import Contact from "../Models/contact";
import User from '../Models/user';
import passport from 'passport';
import {AuthGuard} from '../util/index';
import {UserDisplayName} from '../util/index';
import {DisplayContactPage, DisplayHomePage, DisplayProductsPage, DisplayServicesPage} from "../controllers";
import {DisplayAboutPage} from "../controllers";

const router = express.Router();
const {MongoClient} = require('mongodb');

let url = "mongodb+srv://AmericanProgrammer108:$54Gb*a7C!@cluster0.cz17wla.mongodb.net/?retryWrites=true&w=majority";

/* GET home page. */

router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage);
router.get('/about', DisplayAboutPage);
router.get('/contact', DisplayContactPage);
router.get('/products', DisplayProductsPage);
router.get('/services', DisplayServicesPage);
// router.get('/register', function(req, res, next) {
//   if(!req.user)
//   {
//     return res.render('index', {title: 'Register', page: 'register',
//     messages: req.flash('registerMessage'), displayName : UserDisplayName(req) });
//     return res.redirect("/contact-list");
//   }
//
// });

// router.get('/login', function(req, res, next) {
//   res.render('index', { title: 'Login', page: 'login', displayName : ""});
// });
//
// router.get('/logout', function(req, res, next) {
//   req.logOut(function (err)
//   {
//     if(err)
//     {
//       console.error(err);
//       res.end(err);
//     }
//     res.redirect('/login');
//   });
// });


// //TOP LEVEL ROUTES
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName });
// });
// router.get('/home', function(req, res, next) {
//   res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName });
// });
//
// router.get('/about', function(req, res, next) {
//   res.render('index', { title: 'About Us', page: 'about', displayName : UserDisplayName});
// });
//
// router.get('/contact', function(req, res, next) {
//   res.render('index', { title: 'Contact Us', page: 'contact', displayName : UserDisplayName});
// });
//
// router.get('/products', function(req, res, next) {
//   res.render('index', { title: 'Our Products', page: 'products', displayName : ""});
// });
//
// router.get('/register', function(req, res, next) {
//   if(!req.user)
//   {
//     return res.render('index', {title: 'Register', page: 'register',
//       messages: req.flash('registerMessage'), displayName : UserDisplayName(req) });
//     return res.redirect("/contact-list");
//   }
//
// });
//
// router.post('/register', function(req, res, next) {
//   let newUser = new User(
//       {
//
//         username : req.body.FullName,
//         EmailAddress: req.body.EmailAddress,
//         DisplayName: req.body.firstName + " " + req.body.lastName
//       });
//
//   console.log("password" + req.body.password);
//   User.register(newUser, req.body.password, function(err)
//   {
//     if(err)
//     {
//       if(err.name == "UserExistsError")
//       {
//         console.error("Error: user already exists");
//         req.flash('registerMessage', 'Registration Error');
//         res.redirect('/register');
//       }
//
//       console.error(err.name);
//       req.flash('registerMessage', "Server Error");
//       res.redirect('/register');
//
//     }
//     return passport.authenticate('local')(req, res, function()
//     {
//       return res.redirect('/contact-list');
//     });
//   });
//
//
//
// })
//
// router.get('/services', function(req, res, next) {
//   res.render('index', { title: 'Our Services', page: 'services', displayName : ""});
// });
// //END OF TOP LEVEL ROUTES
//
//
// // AUTHENTICATION ROUTES
// router.get('/register', function(req, res, next) {
//   if(!req.user)
//   {
//     return res.render('index', {title: 'Register', page: 'register',
//       messages: req.flash('registerMessage'), displayName : UserDisplayName(req) });
//     return res.redirect("/contact-list");
//   }
//
// });
//
//
// router.post('/login', function(req, res, next) {
//   passport.authenticate('local', function(err: Error, user: Express.User, info: string)
//   {
//     if(err)
//     {
//       console.error(err);
//       res.end(err);
//     }
//
//     if(!user)
//     {
//       req.flash('loginMessage', 'Authentication Error');
//       res.redirect('/register');
//     }
//
//     req.login(user, function(err)
//     {
//       if(err)
//       {
//         console.error(err);
//       }
//       res.redirect('/contact-list');
//     });
//
//   })(req, res, next);
//
// });
//
//
// router.post('/register', function(req, res, next) {
//   let newUser = new User(
//       {
//         username : req.body.FullName,
//         EmailAddress: req.body.EmailAddress,
//         DisplayName: req.body.firstName + " " + req.body.lastName
//       });
//
//   console.log("password" + req.body.password);
//   User.register(newUser, req.body.password, function(err)
//   {
//     if(err)
//     {
//       if(err.name == "UserExistsError")
//       {
//         console.error("Error: user already exists");
//         req.flash('registerMessage', 'Registration Error');
//         res.redirect('/register');
//       }
//
//       return passport.authenticate('local')(req, res, function()
//       {
//         return res.redirect('/contact-list');
//       });
//     }
//   });
//
//   // Contact.updateOne({_id: id}, updatedContact).then(function(contact: any)
//   // {
//   //   res.redirect("/contact-list");
//   // }).catch(function(err)
//   // {
//   //   res.end(err)
//   // });
//
// });
//
// //END OF AUTHENTICATION ROUTES
//
//
// //CONTACT-LIST ROUTES
// router.get('/contact-list', AuthGuard, function(req, res, next) {
//
//   Contact.find().then(function (data) {
//     //console.log(contacts);
//     res.render('index', {
//       title: 'Contact List',
//       page: 'contact-list',
//       contacts: data,
//       displayName: UserDisplayName(req)
//     });
//   }).catch(function (err) {
//     console.error("Encountered an error reading from the database: " + err);
//     res.end();
//   })
// });
// router.get('/add', function(req, res, next) {
//     res.render('index', { title: 'Add', contact: "", page: 'edit', displayName : ""});
//   });
//
// router.post('/add', AuthGuard, function(req, res, next) {
//
//     let newContact = new Contact(
//         {
//           "FullName": req.body.FullName,
//           "ContactNumber": req.body.ContactNumber,
//           "EmailAddress": req.body.EmailAddress
//         });
//
//     Contact.create(newContact).then(function()
//     {
//       res.redirect("/contact-list");
//     }).catch(function(err)
//     {
//       console.error("Encountered an error updating contact to eh database: " + err);
//       res.end(err);
//     });
//
//   });
//
// router.get('/delete/:id', AuthGuard, function(req, res, next) {
//     let id = req.params.id;
//     Contact.deleteOne({id: id}).then(function()
//     {
//       res.redirect("./contact-list");
//     }).catch(function(err)
//     {
//       console.error("Encountered an error deleting contact from the database: " + err);
//       res.end();
//     })
//     res.render('index', { title: 'Add', contact: "", page: 'edit', displayName : ""});
//   });
//
// router.get('/edit/:id', function(req, res, next) {
//     let id = req.params.id;
//     Contact.findById(id).then(function(contact: any)
//     {
//       res.render('index', { title: 'Edit', page: 'edit', contact: contact, displayName : ""});
//     }).catch(function(err : any)
//     {
//
//     });
//
//   });
//
// router.post('/edit:id', AuthGuard, function(req, res, next)
// {
//   let id = req.params.id;
//
//   let updatedContact = new Contact(
//       {
//       "_id": id,
//         "FullName": req.body.fullName,
//         "ContactNumber": req.body.contactNumber,
//         "EmailAddress": req.body.emailAddress
//       }
//
//   );
//   Contact.updateOne({_id : id}, updatedContact).then(function()
//   {
//     res.redirect('/contact-list');
//   }).catch(function(err)
//   {
//     console.error(err);
//     res.end(err);
//   });
// });
//END OF CONTACT-LIST ROUTES


export default router;
