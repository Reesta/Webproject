import express from "express";
import { userController } from "../../controller/user/userController.js";
import { isAdmin } from "../../middleware/role-middleware.js";
import { authenticateToken } from "../../middleware/token-middleware.js";

const router = express.Router();

// Admin only routes
router.get("/", userController.getAll);
router.post("/", userController.create);
router.put("/:id", authenticateToken, isAdmin, userController.update);
router.delete("/:id", authenticateToken, isAdmin, userController.deleteById);

// Both admin and user can access
router.get("/profile", authenticateToken, userController.getById);
router.put("/profile", authenticateToken, userController.updateProfile);

// New route for password change
router.post("/change-password", authenticateToken, userController.changePassword);

export { router as userRouter };
