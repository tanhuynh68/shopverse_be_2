import express from "express";

import { isAdmin, isUser } from "../../../middlewares/jwt/jwt.middleware.js";
import { validateBody } from "../../../utils/validate.util.js";
import { adminApproveRequest, userRequestBecomeShop } from "./shop.contronller.js";
import { userRequestBecomeShopValidate, adminApproveRequestValidate } from "./shop.middleware.js";
const shopRoute = express.Router();

// user send req to admin for create shop
shopRoute.post("/request", isUser, validateBody(userRequestBecomeShopValidate), userRequestBecomeShop);
// admin approve req become shop of user
shopRoute.post("/aprrove", isAdmin, validateBody(adminApproveRequestValidate), adminApproveRequest);
shopRoute.post("/reject", isAdmin, validateBody(adminApproveRequestValidate), adminApproveRequest);
export default shopRoute;
