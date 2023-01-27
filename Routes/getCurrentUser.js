"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../Models/User"));
const authVerify_1 = __importDefault(require("./authVerify"));
const router = require("express").Router();
router.get("/getCurrentUser", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield User_1.default.getCurrentUserButOmitPasswords(req.body.id);
        res.send(results);
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
exports.default = router;
