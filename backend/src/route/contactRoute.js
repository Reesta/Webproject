import express from "express";
import { contactController } from "../controller/contactController.js";

const router = express.Router();

router.post("/", contactController.sendContactMessage);

export { router as contactRouter };
