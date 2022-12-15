"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const register_1 = __importDefault(require("./Routes/register"));
const login_1 = __importDefault(require("./Routes/login"));
const getCurrentUser_1 = __importDefault(require("./Routes/getCurrentUser"));
const updateBloodPressure_1 = __importDefault(require("./Routes/updateBloodPressure"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
mongoose_1.default.connect(process.env.DB_CONNECT, () => console.log("connected to db  "));
//MIDDLEWARE -> DISALBING CORS AND USED FOR JSON OUTPUT
app.use(express_1.default.json(), (0, cors_1.default)());
//ROUTE MIDDLEWARE
app.use("/api/post", register_1.default);
app.use("/api/post", updateBloodPressure_1.default);
app.use("/api/get", login_1.default);
app.use("/api/get", getCurrentUser_1.default);
