import express from "express";
import bcrypt from "bcryptjs";
import User from "../Models/User";
import joi from "@hapi/joi";

const router = express.Router();

const registerSchema = joi.object({
  fname: joi.string().min(3).required(),
  lname: joi.string().min(3).required(),
  email: joi.string().min(3).required().email(),
  password: joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {
  //CHECKING IF USER EMAIL ALREADY EXISTS
  const emailExist = await User.findOne({ email: req.body.email });
  // IF EMAIL EXIST THEN RETURN
  if (emailExist) {
    res.status(400).send("Email already exists");
    return;
  }

  //HASHING THE PASSWORD

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //ON PROCESS OF ADDING NEW USER

  const user = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: hashedPassword,
    bloodPressureRecords: [],
  });

  try {
    //VALIDATION OF USER INPUTS

    const { error: newUserHasInvalidDetails } =
      await registerSchema.validateAsync(req.body);
    //WE CAN JUST GET THE ERROR(IF EXISTS) WITH OBJECT DECONSTRUCTION

    //   IF ERROR EXISTS THEN SEND BACK THE ERROR
    if (newUserHasInvalidDetails) {
      res.status(400).send(newUserHasInvalidDetails?.details[0]?.message);
      return;
    } else {
      //NEW USER IS ADDED

      const saveUser = await user.save();
      res.status(200).send("user created");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
