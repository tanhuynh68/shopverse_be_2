import express from "express";
import { isAdmin } from "../../../middlewares/jwt/jwt.middleware.js";
import { createAuditLog, getAuditLogs } from "./audit-log.controller.js";
import { validateBody } from "../../../utils/validate.util.js";
import { createAuditLogValidate } from "./audit-log.middleware.js";

const auditLogRoute = express.Router();

// get audit log
auditLogRoute.post("/", isAdmin, validateBody(createAuditLogValidate), getAuditLogs);
export default auditLogRoute;
