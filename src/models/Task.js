import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
