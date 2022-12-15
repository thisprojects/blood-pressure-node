import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    lname: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    bloodPressureRecords: [
      {
        required: false,
        date: {
          type: Date,
          required: false,
        },
        pulse: {
          type: String,
          required: false,
        },
        systolic: {
          type: String,
          required: false,
        },
        diastolic: {
          type: String,
          required: false,
        },
        comments: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    statics: {
      getCurrentUserButOmitPasswords(id) {
        return mongoose
          .model("User")
          .findOne({ _id: id })
          .select("fname lname date email bloodPressureRecords");
      },
    },
  }
);

export interface IUser {
  fname: string;
  lname: string;
  email: string;
  password?: string;
  date: Date;
}

export default mongoose.model("User", userSchema);
