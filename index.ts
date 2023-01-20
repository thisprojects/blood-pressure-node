import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import register from "./Routes/register";
import login from "./Routes/login";
import addBloodPressure from "./Routes/addBloodPressure";
import updateBloodPressure from "./Routes/updateBloodPressure ";
import getBloodPressure from "./Routes/getBloodPressure";
import deleteBloodPressure from "./Routes/deleteBloodPressure";
import { connectDB } from "./handleMongoConnection";

dotenv.config();

export const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

//MIDDLEWARE
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

//ROUTES
app.use("/api/post", register);
app.use("/api/post", addBloodPressure);
app.use("/api/post", login);
app.use("/api/post", getBloodPressure);
app.use("/api/put", updateBloodPressure);
app.use("/api/delete", deleteBloodPressure);

if (process.env.NODE_ENV !== "test") {
  connectDB();
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
}
