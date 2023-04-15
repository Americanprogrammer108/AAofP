"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const controllers_2 = require("../controllers");
const router = express_1.default.Router();
const { MongoClient } = require('mongodb');
let url = "mongodb+srv://AmericanProgrammer108:$54Gb*a7C!@cluster0.cz17wla.mongodb.net/?retryWrites=true&w=majority";
router.get('/', controllers_1.DisplayHomePage);
router.get('/home', controllers_1.DisplayHomePage);
router.get('/about', controllers_2.DisplayAboutPage);
router.get('/contact', controllers_1.DisplayContactPage);
router.get('/products', controllers_1.DisplayProductsPage);
router.get('/services', controllers_1.DisplayServicesPage);
exports.default = router;
//# sourceMappingURL=index.js.map