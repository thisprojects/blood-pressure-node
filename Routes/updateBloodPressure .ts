import express from "express";
import authenticate from "./authVerify";
import User from "../Models/User";
import joi from "@hapi/joi";
import multer from "multer";
import ObjectId from "bson-objectid";

const upload = multer();

const router = express.Router();

const bloodPressureSchema = joi.object({
  systolic: joi.string().required(),
  diastolic: joi.string().required(),
  date: joi.date().required(),
  pulse: joi.string().required(),
  id: joi.string().required(),
});

router.put(
  "/updateBloodPressure",
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

      const recordId = ObjectId(req.body.id);
      const usersId = req.header("id");
      const user = await User?.getBloodPressureRecords(usersId);

      const itemIndex = user.bloodPressureRecords.findIndex((item: any) =>
        item._id.equals(recordId)
      );

      if (itemIndex >= 0) {
        user.bloodPressureRecords[itemIndex] = req.body;
      } else {
        res.status(500).send("ITEM NOT FOUND");
      }

      await user?.save();

      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;
