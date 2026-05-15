import { Request, Response } from "express";
import { AuditTargetType } from "../../../constants/audit-target-type.js";
import { getShopByOwnerId } from "../shops/shop.service.js";
import { returnResponse } from "../../../utils/return.util.js";
import { MESSAGES } from "../../../messages/index.js";
import { createAuditLogService } from "./audit-log.service.js";
import { AuditAction } from "../../../constants/audit-action.js";

export const createAuditLog = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user!;
    const { action, targetId, targetType, description, isSuccess, reason } =
      req.body;
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
        metadata = { ...metadata, approvedBy: userId };
      } else {
        metadata = { ...metadata, rejectedBy: userId, reason: reason };
      }
    }
    const auditLog = await createAuditLogService(
      req,
      userId,
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
