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
const authVerify_1 = __importDefault(require("./authVerify"));
const User_1 = __importDefault(require("../Models/User"));
const router = express_1.default.Router();
router.post("/updateBloodPressure", authVerify_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const newBloodPressureReading = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.newReading;
    if (!newBloodPressureReading) {
        res.status(500).send("Request Did Not Contain Blood Pressure Reading");
    }
    try {
        const usersId = (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.id;
        const user = yield (User_1.default === null || User_1.default === void 0 ? void 0 : User_1.default.findOne({ _id: usersId }));
        (_c = user === null || user === void 0 ? void 0 : user.bloodPressureRecords) === null || _c === void 0 ? void 0 : _c.push(newBloodPressureReading);
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(200).send(`User ${user === null || user === void 0 ? void 0 : user.fname} has been updated`);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = router;
