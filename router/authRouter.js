import express from "express";
import { Login, Me, Logout, changePasswordController } from "../controllers/authController.js";
import { protect } from "../middleware/tokencheck.js";

const router = express.Router();
router.post('/login', Login)
router.get('/me', protect, Me)
router.post('/logout', Logout)
router.post('/change-password', protect, changePasswordController)

export default router;
