"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
function authVerify(req, res, next) {
    const token = req.header("auth-token");
    if (!token)
        return res.status(401).send("No Auth Token");
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).send("Invalid Auth Token");
    }
}
exports.default = authVerify;
