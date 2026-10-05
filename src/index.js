import connectDB from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("sever is running on port:", port);
    });

    app.on("error", () => {
      console.log("ERROR", error);
      throw error;
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!!", err);
  });
