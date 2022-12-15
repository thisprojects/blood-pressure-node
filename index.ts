import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import register from "./Routes/register";
import login from "./Routes/login";
import getCurrentUser from "./Routes/getCurrentUser";
import updateBloodPressure from "./Routes/updateBloodPressure";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

mongoose.connect(process.env.DB_CONNECT!, () =>
  console.log("connected to db  ")
);

//MIDDLEWARE -> DISALBING CORS AND USED FOR JSON OUTPUT
app.use(express.json(), cors());

//ROUTE MIDDLEWARE
app.use("/api/post", register);
app.use("/api/post", updateBloodPressure);
app.use("/api/post", login);
app.use("/api/get", getCurrentUser);
