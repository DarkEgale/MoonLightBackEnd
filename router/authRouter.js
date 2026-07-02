import express from "express";
import { Registration, Login, Me } from "../controllers/authController.js";
import { protect } from "../middleware/tokencheck.js";

const router = express.Router();
router.post('/register', Registration)
router.post('/login', Login)
router.get('/me', protect, Me)

export default router;