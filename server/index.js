import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const app = express();
dotenv.config();
// import middleware
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js";

// use middewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(logger);

// import routes
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";
import imageRoute from "./routes/image.js";

import { authenticateUser } from "./middlewares/authentication.js";

app.use("/api/v1/images", imageRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", authenticateUser, userRoute);
app.use("/api/v1/orders", authenticateUser, orderRoute);

app.get("/", (req, res) => {
  return res.json("hello world");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    // database holbolt
    await connectDB();
    app.listen(PORT, () => console.log(`${PORT} дээр ажиллаж байна...`));
  } catch (error) {
    console.log(error);
  }
};

// server asaah
startServer();

export default app;
