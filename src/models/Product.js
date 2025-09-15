import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 140 },
  description: { type: String, trim: true, maxlength: 1000 },
  status: { type: String, enum: ["todo", "in_progress", "done"], default: "todo", index: true },
  dueDate: { type: Date },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  tags: [{ type: String, trim: true }]
}, { timestamps: true });

ProductSchema.index({ owner: 1, status: 1, dueDate: 1 });

export default mongoose.model("Product", ProductSchema);
