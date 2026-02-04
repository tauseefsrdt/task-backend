import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "30m" });

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

  const { email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await User.create({ email, password: hash });

    return res.status(201).json({ message: "Registered successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Registration failed" });
  }0
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user._id);
    return res.json({ token, user: { email: user.email } });
  } catch (e) {
    return res.status(500).json({ message: "Login failed" });
  }
};

// logout

export const logout = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (e) {
    return res.status(500).json({
      message: "Logout failed",
    });
  }
};
