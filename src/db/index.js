import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";

dotenv.config({});

async function connectDB() {
  try {
    const connectionInstance = mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB connected!! DB_HOST : ${(await connectionInstance).connection.host}`
    );
  } catch (error) {
    console.log(`MONGO_DB ERROR : ${error}`);
    process.exit(1);
  }
}

export default connectDB;
