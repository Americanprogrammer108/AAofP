"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplayContactListPage = void 0;
const contact_1 = __importDefault(require("../Models/contact"));
const util_1 = require("../util");
function DisplayContactListPage(req, res, next) {
    contact_1.default.find().then(function (contacts) {
        res.render('index', {
            title: 'Contact List',
            page: 'contact-list',
            contacts: contacts,
            displayName: (0, util_1.UserDisplayName)(req)
        });
    }).catch(function (err) {
        console.error("Encountered an error reading from the database: " + err);
        res.end();
    });
}
exports.DisplayContactListPage = DisplayContactListPage;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', contact: "", page: 'edit', displayName: "" });
}
exports.DisplayAddPage = DisplayAddPage;
function DisplayEditPage(req, res, next) {
    res.render('index', { title: 'Edit', contact: "", page: 'edit', displayName: "" });
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessAddPage(req, res, next) {
    let newContact = new contact_1.default({
        "FullName": req.body.FullName,
        "ContactNumber": req.body.ContactNumber,
        "EmailAddress": req.body.EmailAddress
    });
    contact_1.default.create(newContact).then(function () {
        res.redirect("/contact-list");
    }).catch(function (err) {
        console.error("Encountered an error updating contact to eh database: " + err);
        res.end(err);
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedContact = new contact_1.default({
        "_id": id,
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });
    contact_1.default.updateOne({ _id: id }, updatedContact).then(function () {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error(err);
        res.end(err);
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    contact_1.default.deleteOne({ _id: id }).then(function () {
        res.redirect('/contact-list');
    }).catch(function (err) {
        console.error(err);
        res.end(err);
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
//# sourceMappingURL=contact-list.js.map