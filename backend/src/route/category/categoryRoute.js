import express from "express";
import { categoryController } from "../../controller/category/categoryController.js";
import { authenticateToken } from "../../middleware/token-middleware.js";

const router = express.Router();

router.post("/", authenticateToken, categoryController.addCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.delete("/:id", authenticateToken, categoryController.deleteCategory);
router.patch("/:id", authenticateToken, categoryController.updateCategory);

export { router as categoryRouter };