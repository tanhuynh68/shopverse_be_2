import mongoose from "mongoose";

const { Schema } = mongoose;

const shopSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    shopName: {
      type: String,
      required: true,
      unique: true,
    },
    logo: String,
    address: String,
    isActive: {
      type: Boolean,
      default: false,
    },
    followers: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("shop", shopSchema);
