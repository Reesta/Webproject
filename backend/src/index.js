import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { db } from "./database/index.js";
import { userRouter } from "./route/user/userRoute.js";
import { authRouter } from "./route/auth/authRoute.js";
import { categoryRouter } from "./route/category/categoryRoute.js";
import { productRouter } from "./route/product/productRoute.js";
import { orderRouter } from "./route/order/orderRoute.js";
import dotenv from "dotenv";
import router from "./route/uploadRoutes.js";
import { createUploadsFolder } from "./security/helper.js";
import { contactRouter } from "./route/contactRoute.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());
app.use(express.static("uploads"));
import { authenticateToken } from "./middleware/token-middleware.js";

app.use(authenticateToken);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/file", router);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/contact", contactRouter);

createUploadsFolder();

app.listen(port, function () {
  console.log("project running in port:", port);
  db();
});
