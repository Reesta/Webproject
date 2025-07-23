import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { db } from "./database/index.js";
import { userRouter } from "./route/index.js";
import { authRouter } from "./route/index.js";
import { categoryRouter } from "./route/index.js";
import { productRouter } from "./route/index.js";
import { orderRouter } from "./route/index.js";
import dotenv from "dotenv";
import router from "./route/uploadRoutes.js";
import { createUploadsFolder } from "./security/helper.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("uploads"));
// app.use(authenticateToken);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/file", router);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/orders", orderRouter);

createUploadsFolder();

app.listen(port, function () {
  console.log("project running in port:", port);
  db();
});