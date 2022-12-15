import express from "express";
import authenticate from "./authVerify";
import User from "../Models/User";
import joi from "@hapi/joi";

const router = express.Router();

const bloodPressureSchema = joi.object({
  id: joi.string().required(),
  newReading: {
    systolic: joi.string().required(),
    diastolic: joi.string().required(),
    date: joi.date().required(),
  },
});

router.post("/updateBloodPressure", authenticate, async (req, res) => {
  const { error: InvalidBloodPressureDetails } =
    await bloodPressureSchema.validateAsync(req?.body);

  if (InvalidBloodPressureDetails) {
    res.status(400).send(InvalidBloodPressureDetails?.details[0]?.message);
    return;
  }

  try {
    const usersId = req?.body?.id;
    const user = await User?.findOne({ _id: usersId });

    user?.bloodPressureRecords?.push(req?.body?.newReading);
    await user?.save();

    res.status(200).send(`User ${user?.fname} has been updated`);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
