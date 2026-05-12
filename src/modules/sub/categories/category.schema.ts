import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    img: { type: String, required: false },
  },
  { timestamps: true }
);

const Category = model("categories", categorySchema);

export default Category;