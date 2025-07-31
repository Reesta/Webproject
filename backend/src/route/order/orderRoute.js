import express from "express";
import { orderController } from "../../controller/order/orderController.js";
import { authenticateToken } from "../../middleware/token-middleware.js";
import { isAdmin } from "../../middleware/role-middleware.js";

const router = express.Router();

// Routes for both regular users and admins
router.post("/", authenticateToken, orderController.createOrder);
router.get("/user", authenticateToken, orderController.getUserOrders);
router.get("/:id", authenticateToken, orderController.getOrderById);

// Admin-only routes
router.get("/", authenticateToken, isAdmin, orderController.getAllOrders);
router.patch(
  "/:id/status",
  authenticateToken,
  isAdmin,
  orderController.updateOrderStatus
);
router.delete("/:id", authenticateToken, isAdmin, orderController.deleteOrder);

export {router as orderRouter};