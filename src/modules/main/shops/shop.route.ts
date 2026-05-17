import express from "express";

import { isAdmin, isUser } from "../../../middlewares/jwt/jwt.middleware.js";
import { validateBody } from "../../../utils/validate.util.js";
import {
  adminApproveRequest,
  adminGetRequests,
  customerRequestBecomeShop,
} from "./shop.contronller.js";
import {
  userRequestBecomeShopValidate,
  adminApproveRequestValidate,
  adminRejectRequestValidate,
  adminGetRequestsValidate,
} from "./shop.middleware.js";
const shopRoute = express.Router();

// user send req to admin for create shop
shopRoute.post(
  "/request",
  isUser,
  validateBody(userRequestBecomeShopValidate),
  customerRequestBecomeShop,
);
// admin approve req become shop of user
shopRoute.post(
  "/approve",
  isAdmin,
  validateBody(adminApproveRequestValidate),
  adminApproveRequest,
);
// admin reject req become shop of user
shopRoute.post(
  "/reject",
  isAdmin,
  validateBody(adminRejectRequestValidate),
  adminApproveRequest,
);
// admin get requests of users want to become shop
shopRoute.get(
  "/request",
  isAdmin,
  validateBody(adminGetRequestsValidate),
  adminGetRequests,
);

export default shopRoute;
