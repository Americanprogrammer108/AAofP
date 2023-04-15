"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_list_1 = require("../controllers/contact-list");
const router = express_1.default.Router();
const { MongoClient } = require('mongodb');
router.get('/contact-list', contact_list_1.DisplayContactListPage);
router.get('/add', contact_list_1.DisplayAddPage);
router.post('/add', contact_list_1.ProcessAddPage);
router.get('/delete/:id', contact_list_1.ProcessDeletePage);
router.get('/edit/:id', contact_list_1.DisplayEditPage);
router.post('/edit:id', contact_list_1.ProcessEditPage);
exports.default = router;
//# sourceMappingURL=contact-list.js.map