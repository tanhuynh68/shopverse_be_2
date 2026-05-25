import express from "express";
import { isLogin } from "../../../middlewares/jwt/jwt.middleware.js";
import { validateBody } from "../../../utils/validate.util.js";
import {
  createAddress,
  getAddresses,
  updateAddress,
  updateDefaultAddress,
  userDeleteAddress,
} from "./address.controller.js";
import {
  createAddressValidate,
  deleteAddressValidate,
  updateAddressValidate,
  updateDefaultAddressValidate,
} from "./address.middleware.js";

const addressRoute = express.Router();
// create address
addressRoute.post(
  "/",
  isLogin,
  validateBody(createAddressValidate),
  createAddress,
);
// get addresses
addressRoute.get("/", isLogin, getAddresses);
// update address
addressRoute.put(
  "/",
  isLogin,
  validateBody(updateAddressValidate),
  updateAddress,
);
// delete address
addressRoute.delete(
  "/",
  isLogin,
  validateBody(deleteAddressValidate),
  userDeleteAddress,
);
// update default address
addressRoute.patch(
  "/default",
  isLogin,
  validateBody(updateDefaultAddressValidate),
  updateDefaultAddress,
);
export default addressRoute;
