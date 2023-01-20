import express from "express";
import authenticate from "./authVerify";
import User from "../Models/User";
import joi from "@hapi/joi";
import multer from "multer";

const upload = multer();

const router = express.Router();

const bloodPressureSchema = joi.object({
  systolic: joi.string().required(),
  diastolic: joi.string().required(),
  pulse: joi.string().required(),
  date: joi.date().required(),
});

router.post(
  "/addBloodPressure",
  authenticate,
  upload.none(),
  async (req, res) => {
    try {
      const { error: InvalidBloodPressureDetails } =
        await bloodPressureSchema.validateAsync(req?.body);
      if (InvalidBloodPressureDetails) {
        res.status(400).send(InvalidBloodPressureDetails?.details[0]?.message);
        throw new Error();
      }

      const usersId = req.header("id");
      const user = await User?.findOne({ _id: usersId });

      if (user && !Array.isArray(user?.bloodPressureRecords)) {
        user.bloodPressureRecords = [];
      }
      user?.bloodPressureRecords?.push(req?.body);
      await user?.save();

      res.status(200).send(`User ${user?.fname} has been updated`);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;
