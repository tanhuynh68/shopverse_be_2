import { Request, Response } from "express";
import { normalizeShopName } from "../../../utils/format.ultil.js";
import {
  getShopByHotline,
  getShopByNormalizeName,
  getShopByOwnerId,
  sendRequestService,
  updateStatusService,
} from "./shop.service.js";
import { returnResponse } from "../../../utils/return.util.js";
import { MESSAGES } from "../../../messages/index.js";
import { SHOP_STATUS } from "../../../constants/shop.constant.js";
import {
  addRoleShop,
  getUserByIdService,
} from "../../sub/users/users.service.js";

/**
 * customer send request create shop to admin
 * @param req
 * @param res
 * @returns
 */
export const userRequestBecomeShop = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user!;
    const { shopName, hotline, address } = req.body;
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
 * admin approve request become shop of user
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
    // if shop status approved by admin
    if (isShopExisted.status === SHOP_STATUS.APPROVED) {
      return returnResponse(MESSAGES.SHOP_APPROVED, null, res, 400);
    }
    // update status to approved
    const updateStatus = await updateStatusService(owner, SHOP_STATUS.APPROVED);
    if (!updateStatus) {
      return returnResponse(
        MESSAGES.UPDATE_STATUS_FAILED,
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
      shopAfterUpdate: updateStatus?.status,
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
