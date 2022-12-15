const jwt = require("jsonwebtoken");
import { Request, Response } from "express";

interface IAuthVerify extends Request {
  user?: string;
}

function authVerify(req: IAuthVerify, res: Response, next: () => void) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("No Auth Token");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Auth Token");
  }
}

export default authVerify;
