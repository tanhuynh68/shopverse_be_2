import { Request, Response } from "express";
import {
  createAddressService,
  deleteAddressService,
  getAddressByAddressId,
  getAddressByOwnerId,
  isAddressOfUser,
  updateAddressService,
  updateDefaultAddressService,
} from "./address.service.js";
import { MESSAGES } from "../../../messages/index.js";
import { returnResponse } from "../../../utils/return.util.js";
import { ROLE } from "../../../constants/role.constant.js";

/**
 * shop or customer create address
 * @param req
 * @param res
 */
export const createAddress = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      phoneNumber,
      province,
      ward,
      specificAddress,
      label,
      isDefault,
    } = req.body;
    const { userId, role } = req.user!;
    // check user (shop, customer) has been had address or not
    const address = await getAddressByOwnerId(userId);
    //
    if (address && role === ROLE.SHOP) {
      return returnResponse(
        MESSAGES.SHOP_HAS_BEEN_HAD_ADDRESS,
        address,
        res,
        409,
      );
    }
    // customer can create max 5 address
    if(address && address.length > 4){
      return returnResponse(
        MESSAGES.CUSTOMER_CAN_CREATE_MAX_5_ADDRESS,
        address,
        res,
        400,
      );
    }
    // get default address
    const addressFault = address.filter((item) => item.isDefault === true);
    // update current default address = false when field isDefault = true
    if (addressFault.length > 0 && isDefault) {
      await updateDefaultAddressService(addressFault[0]._id.toString(), userId, isDefault);
      const newAddress = await createAddressService(
        fullName,
        phoneNumber,
        province,
        ward,
        specificAddress,
        label,
        isDefault, // true
      );
      return returnResponse(
        MESSAGES.CREATE_ADDRESS_SUCCESSFULLY,
        newAddress,
        res,
        201,
      );
    }
    // if user create first address, isDefault = true
    const newAddress = await createAddressService(
      fullName,
      phoneNumber,
      province,
      ward,
      specificAddress,
      label,
      true,
    );
    return returnResponse(
      MESSAGES.CREATE_ADDRESS_SUCCESSFULLY,
      newAddress,
      res,
      201,
    );
  } catch (error) {
    return returnResponse(MESSAGES.CREATE_ADDRESS_FAILED, error, res, 500);
  }
};

/**
 * customer or shop get address
 * @param req
 * @param res
 * @returns
 */
export const getAddresses = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user!;
    const addresses = await getAddressByOwnerId(userId);
    return returnResponse(
      MESSAGES.GET_ADDRESS_SUCCESSFULLY,
      addresses,
      res,
      200,
    );
  } catch (error) {
    return returnResponse(MESSAGES.GET_ADDRESS_FAILED, error, res, 500);
  }
};

/**
 * customer or shop update address
 * @param req
 * @param res
 * @returns
 */
export const updateAddress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user!;
    const {
      fullName,
      phoneNumber,
      province,
      ward,
      specificAddress,
      label,
      isDefault,
      addressId,
    } = req.body;
    // get address by id
    const address = await getAddressByAddressId(addressId);
    if (!address) {
      return returnResponse(MESSAGES.ADDRESS_NOT_FOUND, null, res, 400);
    }
    // compare owner of address with userId to check this address of current user or not
    if (address && address.owner != userId) {
      return returnResponse(
        MESSAGES.ADDRESS_IS_NOT_BELONG_TO_THIS_USER,
        null,
        res,
        403,
      );
    }
    // update address
    const addresses = await updateAddressService(
      fullName,
      phoneNumber,
      province,
      ward,
      specificAddress,
      label,
      isDefault,
      addressId,
    );
    return returnResponse(
      MESSAGES.UPDATE_ADDRESS_SUCCESSFULLY,
      addresses,
      res,
      200,
    );
  } catch (error) {
    return returnResponse(MESSAGES.UPDATE_ADDRESS_FAILED, error, res, 500);
  }
};

/**
 * customer or shop delete address
 * @param req 
 * @param res 
 * @returns 
 */
export const userDeleteAddress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user!;
    const {addressId} = req.body
     // get address by id
    const address = await getAddressByAddressId(addressId);
    if (!address) {
      return returnResponse(MESSAGES.ADDRESS_NOT_FOUND, null, res, 400);
    }
    // compare owner of address with userId to check this address of current user or not
    if (address && address.owner != userId) {
      return returnResponse(
        MESSAGES.ADDRESS_IS_NOT_BELONG_TO_THIS_USER,
        null,
        res,
        403,
      );
    }
    const deleteAddress = await deleteAddressService(addressId, userId)
    return returnResponse(
      MESSAGES.DELETE_ADDRESS_SUCCESSFULLY,
      deleteAddress,
      res,
      200,
    );
  } catch (error) {
    return returnResponse(MESSAGES.DELETE_ADDRESS_FAILED, error, res, 500);
  }
};

/**
 * shop or customer update default address
 * @param req 
 * @param res 
 * @returns 
 */
export const updateDefaultAddress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user!;
    const {addressId} = req.body
     // get address by id
    const address = await getAddressByAddressId(addressId);
    if (!address) {
      return returnResponse(MESSAGES.ADDRESS_NOT_FOUND, null, res, 400);
    }
    // compare owner of address with userId to check this address of current user or not
    if (address && address.owner != userId) {
      return returnResponse(
        MESSAGES.ADDRESS_IS_NOT_BELONG_TO_THIS_USER,
        null,
        res,
        403,
      );
    }
    const updateDefault = await updateDefaultAddressService(addressId, userId, address.isDefault)
    return returnResponse(
      MESSAGES.DELETE_ADDRESS_SUCCESSFULLY,
      updateDefault,
      res,
      200,
    );
  } catch (error) {
    return returnResponse(MESSAGES.DELETE_ADDRESS_FAILED, error, res, 500);
  }
};


