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
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../Models/User"));
const joi_1 = __importDefault(require("@hapi/joi"));
const router = express_1.default.Router();
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().min(6).required().email(),
    password: joi_1.default.string().min(6).required(),
});
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //CHECKING IF USER EMAIL EXISTS
    var _a;
    const user = yield User_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send("Incorrect Email- ID");
    //CHECKING IF USER PASSWORD MATCHES
    const validPassword = yield bcryptjs_1.default.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send("Incorrect Password");
    try {
        //VALIDATION OF USER INPUTS
        const { error: invalidUserDetails } = yield loginSchema.validateAsync(req.body);
        if (invalidUserDetails)
            return res.status(400).send((_a = invalidUserDetails === null || invalidUserDetails === void 0 ? void 0 : invalidUserDetails.details[0]) === null || _a === void 0 ? void 0 : _a.message);
        else {
            //SENDING BACK THE TOKEN
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET);
            res.header("auth-token", token).send({ token: token, userId: user._id });
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = router;
