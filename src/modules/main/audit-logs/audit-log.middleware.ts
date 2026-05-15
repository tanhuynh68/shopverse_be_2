import { z } from "zod";
import { AuditAction } from "../../../constants/audit-action.js";
import { AuditTargetType } from "../../../constants/audit-target-type.js";

export const createAuditLogValidate = z.object({
  action: z.enum(AuditAction),

  targetId: z.string().trim().min(1, "targetId is required"),

  targetType: z.enum(AuditTargetType),

  description: z
    .string()
    .trim()
    .min(1, "description is required"),

  isSuccess: z.boolean(),

  reason: z.string().trim().optional(),
});