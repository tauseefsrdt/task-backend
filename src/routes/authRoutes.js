import { Router } from "express";
import { body } from "express-validator";
import { register, login, logout } from "../controllers/authController.js";

const router = Router();

router.post("/register", [body("email").isEmail().withMessage("Valid email required"), body("password").isLength({ min: 6 }).withMessage("Password min 6 chars")], register);

router.post("/login", [body("email").isEmail().withMessage("Valid email required"), body("password").notEmpty().withMessage("Password required")], login);

router.post("/logout", logout);

export default router;
