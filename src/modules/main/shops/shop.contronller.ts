import { Request, Response } from "express";
import { normalizeShopName } from "../../../utils/format.ultil.js";
import {
  adminGetRequestsService,
  getShopByHotline,
  getShopByNormalizeName,
  getShopByOwnerId,
  sendRequestService,
  updateStatusService,
} from "./shop.service.js";
import { returnResponse } from "../../../utils/return.util.js";
import { MESSAGES } from "../../../messages/index.js";
import {
  SHOP_APPROVAL_STATUS,
  ShopApprovalStatus,
} from "../../../constants/shop.constant.js";
import {
  addRoleShop,
  getUserByIdService,
} from "../../sub/users/users.service.js";
import { ROLE } from "../../../constants/role.constant.js";

/**
 * customer send request create shop to admin (customer send req first time or resend when current req has been rejetced)
 * @param req
 * @param res
 * @returns
 */
export const userRequestBecomeShop = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user!;
    const { shopName, hotline, address } = req.body;
    const shop = await getShopByOwnerId(userId);
    // check user has been had pending req or not
    if (shop && shop.approvalStatus === SHOP_APPROVAL_STATUS.PENDING) {
      return returnResponse(
        MESSAGES.SHOP_REQUEST_ALREADY_PENDING,
        { shopStatus: shop.approvalStatus },
        res,
        400,
      );
    }
    // check user has been had approved req or not (approved === user already has a shop)
    if (shop && shop.approvalStatus === SHOP_APPROVAL_STATUS.APPROVED) {
      return returnResponse(
        MESSAGES.ALREADY_HAVE_SHOP,
        { shopStatus: shop.approvalStatus },
        res,
        400,
      );
    }
    // normalize shop name
    const normalizedName = normalizeShopName(shopName);
    // find shop name after normalize
    const isShopNameExisted = await getShopByNormalizeName(normalizedName);
    // if shop name existed
    if (isShopNameExisted) {
      return returnResponse(
        MESSAGES.SHOP_NAME_EXISTED,
        isShopNameExisted,
        res,
        409,
      );
    }
    const isHotlineExisted = await getShopByHotline(hotline);
    if (isHotlineExisted) {
      return returnResponse(
        MESSAGES.SHOP_HOLINE_EXISTED,
        isHotlineExisted,
        res,
        409,
      );
    }
    // send request to admin
    const sendRequest = await sendRequestService(
      shopName,
      hotline,
      address,
      normalizedName,
      userId,
    );
    return returnResponse(
      MESSAGES.REQUEST_CREATE_SHOP_SUCCESSFULLY,
      sendRequest,
      res,
      201,
    );
  } catch (error) {
    return returnResponse(MESSAGES.REQUEST_CREATE_SHOP_FAILED, error, res, 500);
  }
};

/**
 * admin approve pending request become shop of user
 * @param req
 * @param res
 * @returns
 */
export const adminApproveRequest = async (req: Request, res: Response) => {
  try {
    const { owner } = req.body;
    const isUserExisted = await getUserByIdService(owner);
    // check user existed or not
    if (!isUserExisted) {
      return returnResponse(MESSAGES.USER_NOT_FOUND, null, res, 404);
    }
    if (isUserExisted.isDeleted) {
      return returnResponse(MESSAGES.USER_HAS_BEEN_DELETED, null, res, 400);
    }
    if (!isUserExisted.isActive) {
      return returnResponse(MESSAGES.USER_INACTIVE, null, res, 400);
    }
    const isShopExisted = await getShopByOwnerId(owner);
    if (!isShopExisted) {
      return returnResponse(MESSAGES.SHOP_NOT_FOUND, null, res, 404);
    }
    // shop status must be pending to admin reject
    if (isShopExisted.approvalStatus != SHOP_APPROVAL_STATUS.PENDING) {
      return returnResponse(
        MESSAGES.SHOP_APPROVAL_STATUS_MUST_BE_PENDING,
        null,
        res,
        400,
      );
    }
    // update status to approved
    const updateStatus = await updateStatusService(
      owner,
      SHOP_APPROVAL_STATUS.APPROVED,
    );
    if (!updateStatus) {
      return returnResponse(
        MESSAGES.UPDATE_STATUS_APPROVED_FAILED,
        null,
        res,
        500,
      );
    }
    // add role shop
    const addRole = await addRoleShop(owner);
    if (!addRole) {
      return returnResponse(MESSAGES.ADD_ROLE_SHOP_FAILED, null, res, 500);
    }
    //
    const data = {
      shopAfterUpdate: updateStatus?.approvalStatus,
      userAfterUpdate: addRole?.role,
    };
    return returnResponse(
      MESSAGES.APPROVE_CREATE_SHOP_SUCCESSFULLY,
      data,
      res,
      200,
    );
  } catch (error) {
    return returnResponse(MESSAGES.APPROVE_CREATE_SHOP_FAILED, error, res, 500);
  }
};

/**
 * admin reject pending request become shop of user
 * @param req
 * @param res
 * @returns
 */
export const adminRejectRequest = async (req: Request, res: Response) => {
  try {
    const { owner, rejectReason } = req.body;
    const isUserExisted = await getUserByIdService(owner);
    // check user existed or not
    if (!isUserExisted) {
      return returnResponse(MESSAGES.USER_NOT_FOUND, null, res, 404);
    }
    // check user has been deleted or not
    if (isUserExisted.isDeleted) {
      return returnResponse(MESSAGES.USER_HAS_BEEN_DELETED, null, res, 400);
    }
    // check user is active (verify via email) or not
    if (!isUserExisted.isActive) {
      return returnResponse(MESSAGES.USER_INACTIVE, null, res, 400);
    }
    // check shop existed or not
    const isShopExisted = await getShopByOwnerId(owner);
    if (!isShopExisted) {
      return returnResponse(MESSAGES.SHOP_NOT_FOUND, null, res, 404);
    }
    // shop status must be pending to admin reject
    if (isShopExisted.approvalStatus != SHOP_APPROVAL_STATUS.PENDING) {
      return returnResponse(
        MESSAGES.SHOP_APPROVAL_STATUS_MUST_BE_PENDING,
        null,
        res,
        400,
      );
    }
    // update status to rejected
    const updateStatus = await updateStatusService(
      owner,
      SHOP_APPROVAL_STATUS.REJECTED,
      rejectReason,
    );
    if (!updateStatus) {
      return returnResponse(
        MESSAGES.UPDATE_STATUS_REJECTED_FAILED,
        null,
        res,
        500,
      );
    }
    // add role shop
    const addRole = await addRoleShop(owner);
    if (!addRole) {
      return returnResponse(MESSAGES.ADD_ROLE_SHOP_FAILED, null, res, 500);
    }
    //
    const data = {
      shopAfterUpdate: updateStatus?.approvalStatus,
      userAfterUpdate: addRole?.role,
    };
    return returnResponse(
      MESSAGES.APPROVE_CREATE_SHOP_SUCCESSFULLY,
      data,
      res,
      200,
    );
  } catch (error) {
    return returnResponse(MESSAGES.APPROVE_CREATE_SHOP_FAILED, error, res, 500);
  }
};

/**
 * admin get requests of users want to become shop
 * @param req
 * @param res
 * @returns
 */
export const adminGetRequests = async (req: Request, res: Response) => {
  try {
    const { owner, approvalStatus, isDeleted } = req.body;
    // check owner (shop id) is existed or not ?
    if (!owner || owner === null) {
      return returnResponse(MESSAGES.SHOP_NOT_FOUND, null, res, 404);
    }
    // check shop approval status is exist or not
    if (approvalStatus.length > 0) {
      approvalStatus.map((item: ShopApprovalStatus) => {
        if (
          item != SHOP_APPROVAL_STATUS.APPROVED &&
          item != SHOP_APPROVAL_STATUS.REJECTED &&
          item != SHOP_APPROVAL_STATUS.PENDING
        )
          return returnResponse(
            MESSAGES.SHOP_APPROVAL_STATUS_IS_NOT_EXIST,
            null,
            res,
            404,
          );
      });
    }
    // get request user become shop
    const requests = await adminGetRequestsService(
      owner,
      isDeleted,
      approvalStatus,
    );
    return returnResponse(
      MESSAGES.ADMIN_GET_REQUEST_USER_BECOME_SHOP_SUCCESSFULLY,
      requests,
      res,
      200,
    );
  } catch (error) {
    return returnResponse(
      MESSAGES.ADMIN_GET_REQUEST_USER_BECOME_SHOP_FAILED,
      error,
      res,
      500,
    );
  }
};
