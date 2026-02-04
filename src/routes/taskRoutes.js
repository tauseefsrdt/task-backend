import { Router } from "express";
import { body } from "express-validator";
import auth from "../middleware/auth.js";
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController.js";

const router = Router();

// All task routes are protected
router.get("/", auth, getTasks);

router.post("/", auth, [body("title").notEmpty().withMessage("Title is required")], createTask);

router.put("/:id", auth, updateTask);

router.delete("/:id", auth, deleteTask);

export default router;
