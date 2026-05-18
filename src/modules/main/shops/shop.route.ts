import express from "express";

import { isAdmin, isUser } from "../../../middlewares/jwt/jwt.middleware.js";
import { validateBody } from "../../../utils/validate.util.js";
import {
  adminApproveRequest,
  adminGetRequests,
  adminRejectRequest,
  customerRequestBecomeShop,
  resendRequestCreateShop,
} from "./shop.controller.js";
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
  adminRejectRequest,
);

// admin get requests of users want to become shop
shopRoute.post(
  "/get-requests",
  isAdmin,
  validateBody(adminGetRequestsValidate),
  adminGetRequests,
);
// customer resend new request after admin has been rejected\
shopRoute.post(
  "/resend-request",
  isUser,
  resendRequestCreateShop,
);
export default shopRoute;
