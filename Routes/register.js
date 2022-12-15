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
const User_1 = __importDefault(require("../Models/User"));
const joi_1 = __importDefault(require("@hapi/joi"));
const router = express_1.default.Router();
const registerSchema = joi_1.default.object({
    fname: joi_1.default.string().min(3).required(),
    lname: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().min(3).required().email(),
    password: joi_1.default.string().min(6).required(),
});
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //CHECKING IF USER EMAIL ALREADY EXISTS
    const emailExist = yield User_1.default.findOne({ email: req.body.email });
    // IF EMAIL EXIST THEN RETURN
    if (emailExist) {
        res.status(400).send("Email already exists");
        return;
    }
    //HASHING THE PASSWORD
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
    //ON PROCESS OF ADDING NEW USER
    const user = new User_1.default({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword,
        bloodPressureRecords: [],
    });
    try {
        //VALIDATION OF USER INPUTS
        const { error: newUserHasInvalidDetails } = yield registerSchema.validateAsync(req.body);
        //WE CAN JUST GET THE ERROR(IF EXISTS) WITH OBJECT DECONSTRUCTION
        //   IF ERROR EXISTS THEN SEND BACK THE ERROR
        if (newUserHasInvalidDetails) {
            res.status(400).send((_a = newUserHasInvalidDetails === null || newUserHasInvalidDetails === void 0 ? void 0 : newUserHasInvalidDetails.details[0]) === null || _a === void 0 ? void 0 : _a.message);
            return;
        }
        else {
            //NEW USER IS ADDED
            const saveUser = yield user.save();
            res.status(200).send("user created");
        }
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = router;
