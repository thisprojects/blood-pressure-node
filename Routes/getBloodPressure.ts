import User from "../Models/User";
import authenticate from "./authVerify";
import { Request, Response } from "express";

const router = require("express").Router();

router.post(
  "/getBloodPressure",
  authenticate,
  async (req: Request, res: Response) => {
    const id = req.header("id");
    try {
      const results = await User.getBloodPressureRecords(id);
      res.send(results[0] || results);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

export default router;
