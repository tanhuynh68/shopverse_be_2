import mongoose from "mongoose";

const { Schema, model } = mongoose;

const brandSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    img: { type: String, required: false },
  },
  { timestamps: true }
);

const Brand = model("brands", brandSchema);

export default Brand;