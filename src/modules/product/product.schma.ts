import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category_id: { type: Schema.Types.ObjectId, ref: "categories", required: true },
    images: [{ type: String }],
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
    sku: { type: String, unique: true },
    brand_id: { type: Schema.Types.ObjectId, ref: "brands", required: true },
    shop_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
    sold: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;