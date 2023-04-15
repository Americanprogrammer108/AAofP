"use strict";

import mongoose from "mongoose";
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';
let UserDocument;


const UserSchema : any = new Schema
(
    {
        DisplayName: String,
        EmailAddress: String,
        username: String,
        Created:
            {
                type : Date,
                default: Date.now()
            },
        Updated:
            {
                type: Date,
                default: Date.now()
            }
    },

    {
        collection: "users"
    }
);

UserSchema.plugin(passportLocalMongoose);

declare global
{
    export type UserDocument = mongoose.Document &
        {
            username: string,
            EmailAddress: string,
            DisplayName: string
        }
}

const Model = mongoose.model("User", UserSchema);
export default Model;
