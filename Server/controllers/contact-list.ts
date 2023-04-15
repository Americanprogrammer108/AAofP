import express, {Request, Response, NextFunction} from 'express';
import Contact from "../Models/contact";
import {UserDisplayName} from "../util";


export function DisplayContactListPage(req: Request, res: Response, next: NextFunction) : void
{
    Contact.find().then(function (contacts) {
        //console.log(contacts);
        res.render('index', {
            title: 'Contact List',
            page: 'contact-list',
            contacts: contacts,
            displayName: UserDisplayName(req)
        });
    }).catch(function (err) {
        console.error("Encountered an error reading from the database: " + err);
        res.end();
    });
}

export function DisplayAddPage(req: Request, res: Response, next: NextFunction) : void
{
    res.render('index', { title: 'Add', contact: "", page: 'edit', displayName : ""});
}
export function DisplayEditPage(req: Request, res: Response, next: NextFunction) : void
{
    res.render('index', { title: 'Edit', contact: "", page: 'edit', displayName : ""});
}

//PROCESS
export function ProcessAddPage(req: Request, res: Response, next: NextFunction) : void
{
    let newContact = new Contact(
        {
            "FullName": req.body.FullName,
            "ContactNumber": req.body.ContactNumber,
            "EmailAddress": req.body.EmailAddress
        });

    Contact.create(newContact).then(function()
    {
        res.redirect("/contact-list");
    }).catch(function(err)
    {
        console.error("Encountered an error updating contact to eh database: " + err);
        res.end(err);
    });
}
export function ProcessEditPage(req: Request, res: Response, next: NextFunction) : void
{
    let id = req.params.id;

    let updatedContact = new Contact(
        {
            "_id": id,
            "FullName": req.body.fullName,
            "ContactNumber": req.body.contactNumber,
            "EmailAddress": req.body.emailAddress
        }

    );
    Contact.updateOne({_id : id}, updatedContact).then(function()
    {
        res.redirect('/contact-list');
    }).catch(function(err)
    {
        console.error(err);
        res.end(err);
    });
}
export function ProcessDeletePage(req: Request, res: Response, next: NextFunction) : void
{
    let id = req.params.id;

    Contact.deleteOne({_id: id}).then(function()
    {
        res.redirect('/contact-list');
    }).catch(function(err)
    {
        console.error(err);
        res.end(err);
    })
}