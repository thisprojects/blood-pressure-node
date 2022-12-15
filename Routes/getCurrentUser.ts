import User from "../Models/User";
import authenticate from "./authVerify";
import { Request, Response } from "express";

const router = require("express").Router();

router.get(
  "/getCurrentUser",
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const results = await User.getCurrentUserButOmitPasswords(req.body.id);
      res.send(results);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

export default router;
