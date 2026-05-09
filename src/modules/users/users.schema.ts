import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    role: { type: String, enum: ["CUSTOMER", "SHOP", "ADMIN"], default: ["CUSTOMER"] },
    verifyCode: { type: String, default: null },
    verifyCodeExpiresAt: { type: Date, default: null },
    avatar: { type: String },
    phone: { type: String, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpire: { type: Date, default: null },
    accountType: {
      type: String,
      enum: ["NORMAL", "GOOGLE"],
      default: "NORMAL",
    },
    // when register = google, user will not have passwword, use this field to show for fe
    isPasswordExisted: { type: Boolean, default: false },
    shopName: { type: String, default: null },
  },
  { timestamps: true }
);

var User = mongoose.model("user", userSchema);
export default User;
