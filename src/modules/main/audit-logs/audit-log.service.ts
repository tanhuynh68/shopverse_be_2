import { Request } from "express";
import { AuditAction } from "../../../constants/audit-action.js";
import { AuditTargetType } from "../../../constants/audit-target-type.js";
import { getIpAddress, getUserAgent } from "../../../utils/auth.util.js";
import { AuditLog } from "./audit-log.schema.js";

export const createAuditLogService = async (
  req: Request,
  actor: string,
  action: AuditAction,
  targetId: string,
  targetType: AuditTargetType,
  description: string,
  metadata: any,
) => {
  // get ip and user agent
  const ipAddress = getIpAddress(req);
  const userAgent = getUserAgent(req);
  const auditLog = await AuditLog.create({
    actor,
    action,
    targetId,
    targetType,
    description,
    ipAddress,
    userAgent,
    metadata,
  });
  return auditLog;
};

export const getAuditLogsService = async (
  auditLogId: string,
  actions: AuditAction[],
  actors: string[],
  targetTypes: AuditTargetType[],
) => {
  let query: any = {};
  if (auditLogId != "") {
    query._id = auditLogId;
  }
  if (actions.length > 0) {
    query.action = { $in: actions };
  }
  if (actors.length > 0) {
    query.actor = { $in: actors };
  }
  if (targetTypes.length > 0) {
    query.targetType = { $in: targetTypes };
  }
  const auditLogs = await AuditLog.find(query);
  return auditLogs;
};

export const getAuditLogById = async (id: string) => {
  const auditLog = await AuditLog.findById(id);
  return auditLog;
};
