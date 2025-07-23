import express from "express";
import { productController } from "../../controller/product/productController.js";
import { authenticateToken } from "../../middleware/token-middleware.js";
import upload from "../../middleware/multerConfig.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  productController.addProduct
);
router.get("/", productController.getAllProducts);
router.get("/by_category", productController.getProductByCategory);
router.get("/:id", productController.getProductById);
router.delete("/:id", authenticateToken, productController.deleteProduct);
router.patch(
  "/:id",
  authenticateToken,
  upload.single("image"),
  productController.updateProduct
);

export { router as productRouter };