import { Request, Response } from "express";
import { AuditTargetType } from "../../../constants/audit-target-type.js";
import { getShopByOwnerId } from "../shops/shop.service.js";
import { returnResponse } from "../../../utils/return.util.js";
import { MESSAGES } from "../../../messages/index.js";
import {
  createAuditLogService,
  getAuditLogById,
  getAuditLogsService,
} from "./audit-log.service.js";
import { AuditAction } from "../../../constants/audit-action.js";
import { getUsersByIdService } from "../../sub/users/users.service.js";

/**
 * auto create audit log when finish 1 important api
 * @param req
 * @param res
 * @param action
 * @param targetId
 * @param targetType
 * @param description
 * @param isSuccess
 * @param reason
 * @param actorId
 * @returns
 */
export const createAuditLog = async (
  req: Request,
  res: Response,
  action: AuditAction,
  targetId: string,
  targetType: AuditTargetType,
  description: string,
  isSuccess: boolean,
  actorId: string,
  reason?: String,
) => {
  try {
    // create meta data
    let metadata: any = {
      isSuccess,
      shop: targetId,
    };
    // audit log for process admin approve request user become admin
    if (targetType === AuditTargetType.SHOP) {
      const shop = await getShopByOwnerId(targetId);
      //check shop valid
      if (!shop || shop.isDeleted) {
        return returnResponse(MESSAGES.SHOP_NOT_FOUND, null, res, 404);
      }
      // check action to create correct metadata
      if (action === AuditAction.APPROVE_SHOP) {
        metadata = { ...metadata, approvedBy: actorId };
      } else {
        metadata = { ...metadata, rejectedBy: actorId, reason: reason };
      }
    }
    const auditLog = await createAuditLogService(
      req,
      actorId,
      action,
      targetId,
      targetType,
      description,
      metadata,
    );
    return returnResponse(
      MESSAGES.CREATE_AUDIT_LOG_SUCCESSFULLY,
      auditLog,
      res,
      201,
    );
  } catch (error) {
    return returnResponse(MESSAGES.CREATE_AUDIT_LOG_FAILED, error, res, 500);
  }
};

/**
 * admin get audit logs
 * @param req
 * @param res
 * @returns
 */
export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const { auditLogId, actions, actorIds, targetTypes } = req.body;
    // check auditLogId has been existed
    if (auditLogId != "") {
      const auditLog = await getAuditLogById(auditLogId);
      if (!auditLog) {
        return returnResponse(MESSAGES.AUDIT_LOT_NOT_FOUND, null, res, 404);
      }
    }
    // get actors by ids
    const actors = await getUsersByIdService(actorIds);
    // if number of actors != number of ids => 1 or more ids has been deleted or don't existed
    if (actors.length != actorIds.length) {
      // get ids don't valid
      const ids = actors.filter((item) => !actorIds.includes(item._id));
      // data return
      const data = {
        countIdsInvalid: ids.length, // number of Id invalid
        idsInvalid: ids, // ids in valid
        actorValid: actors, // actors valid (actors that getUsersByIdService return)
      };
      return returnResponse(MESSAGES.AUDIT_LOT_NOT_FOUND, data, res, 400);
    }
    // get audit logs
    const auditLogs = await getAuditLogsService(
      auditLogId,
      actions,
      actorIds,
      targetTypes,
    );
    return returnResponse(
      MESSAGES.GET_AUDIT_LOG_SUCCESSFULLY,
      auditLogs,
      res,
      200,
    );
  } catch (error) {
    return returnResponse(MESSAGES.GET_AUDIT_LOG_FAILED, error, res, 500);
  }
};
