import express from "express";
import { isAdmin } from "../../../middlewares/jwt/jwt.middleware.js";
import { createAuditLog } from "./audit-log.controller.js";
import { validateBody } from "../../../utils/validate.util.js";
import { createAuditLogValidate } from "./audit-log.middleware.js";

const auditLogRoute = express.Router();

// add product to wishlist
auditLogRoute.post("/", isAdmin, validateBody(createAuditLogValidate), createAuditLog);

export default auditLogRoute;
