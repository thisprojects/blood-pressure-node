"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fname: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    lname: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    bloodPressureRecords: [
        {
            required: false,
            date: {
                type: Date,
                required: false,
            },
            pulse: {
                type: String,
                required: false,
            },
            systolic: {
                type: String,
                required: false,
            },
            diastolic: {
                type: String,
                required: false,
            },
            comments: {
                type: String,
                required: false,
            },
        },
    ],
}, {
    statics: {
        getCurrentUserButOmitPasswords(id) {
            return mongoose_1.default
                .model("User")
                .findOne({ _id: id })
                .select("fname lname date email bloodPressureRecords");
        },
    },
});
exports.default = mongoose_1.default.model("User", userSchema);
