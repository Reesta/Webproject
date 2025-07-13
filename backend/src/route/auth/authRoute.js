import express from "express";
import { authController } from "../../controller/index.js";
const router = express.Router();
router.get("/init", authController.init);
router.post("/login", authController.login);
router.post("/signup", authController.signup);

export { router as authRouter };
