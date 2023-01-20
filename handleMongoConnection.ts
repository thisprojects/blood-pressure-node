import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongod: MongoMemoryServer;
let dbUrl;

export const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      dbUrl = "mongodb://username:password@localhost:27017";
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
    } else {
      dbUrl = process.env.DB_CONNECT!;
    }
    const conn = await mongoose.connect(dbUrl);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
