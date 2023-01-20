const jwt = require("jsonwebtoken");
import { Request, Response } from "express";

interface IAuthVerify extends Request {
  user?: string;
}

function authVerify(req: IAuthVerify, res: Response, next: () => void) {
  const id = req.header("id");
  const token = req.header("auth-token");

  if (!token) return res.status(401).send("No Auth Token");
  if (!id) return res.status(401).send("No User Id");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    // if users id doesn't match the id registerd to the token
    if (verified?._id !== id) {
      return res.status(400).send("Auth token id does not match users id");
    }

    next();
  } catch (error) {
    res.status(400).send("Invalid Auth Token");
  }
}

export default authVerify;
