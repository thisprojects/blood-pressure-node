import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User";
import joi from "@hapi/joi";
import multer from "multer";

const upload = multer();

const router = express.Router();

const loginSchema = joi.object({
  email: joi.string().min(6).required().email(),
  password: joi.string().min(6).required(),
});

router.post("/login", upload.none(), async (req, res) => {
  //CHECKING IF USER EMAIL EXISTS

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Incorrect Email- ID");

    //CHECKING IF USER PASSWORD MATCHES

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) return res.status(400).send("Incorrect Password");

    //VALIDATION OF USER INPUTS

    const { error: invalidUserDetails } = await loginSchema.validateAsync(
      req.body
    );

    if (invalidUserDetails)
      return res.status(400).send(invalidUserDetails?.details[0]?.message);
    else {
      //SENDING BACK THE TOKEN
      const token = jwt.sign(
        { _id: user._id },
        process.env.TOKEN_SECRET as string
      );

      const userDetails = await User.getCurrentUserButOmitPasswords(user.id);
      res
        .header("auth-token", token)
        .send({ token: token, userId: user._id, userDetails: userDetails });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
