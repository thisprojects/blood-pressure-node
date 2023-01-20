import express from "express";
import authenticate from "./authVerify";
import User from "../Models/User";
import joi from "@hapi/joi";
import multer from "multer";
import ObjectId from "bson-objectid";

const upload = multer();

const router = express.Router();

const bloodPressureSchema = joi.object({
  id: joi.string().required(),
});

router.delete("/deleteBloodPressure", authenticate, async (req, res) => {
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
      user.bloodPressureRecords.splice(itemIndex, 1);
    } else {
      res.status(500).send("ITEM NOT FOUND");
    }

    await user?.save();

    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
