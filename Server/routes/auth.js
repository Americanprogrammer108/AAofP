"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
const { MongoClient } = require('mongodb');
router.get('/register', auth_1.DisplayRegisterPage);
router.get('/login', auth_1.DisplayLoginPage);
router.post('/login', auth_1.ProcessLoginPage);
router.post('/register', auth_1.ProcessRegisterPage);
router.get('/logout', auth_1.ProcessLogoutPage);
exports.default = router;
//# sourceMappingURL=auth.js.map