import { Request, Response } from "express";
import { getProductByIdService } from "../products/product.service.js";
import { MESSAGES } from "../../messages/index.js";
import {
  addProductToWishlistService,
  deleteProductFromWishListByIdService,
  deleteProductsFromWishListService,
  getUserWishList,
  getWishListByIdService,
  getWishListService,
} from "./wish-list.service.js";
import { returnResponse } from "../../utils/return.util.js";

/**
 * add 1 product into current user's wishlist (1 product with 1 user = 1 document in wishlist collecion)
 * @param req
 * @param res
 * @returns
 */
export const addProductToWishlist = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user!;
    const { productId } = req.body;
    // check product isExisted
    const product = await getProductByIdService(productId);
    if (!product) {
      return returnResponse(MESSAGES.PRODUCT_NOT_FOUND, null, res, 404);
    }
    // check product, if existed in wishlist of current user => return 400
    const isProductInWishList = await getWishListService(productId, userId);
    if(isProductInWishList){
      return returnResponse(MESSAGES.PRODUCT_IS_EXISTED_IN_WISHLIST, null, res, 400);
    }
    // check active of product
    if (product.isActive === false) {
      return returnResponse(MESSAGES.PRODUCT_IS_NOT_ACTIVE, null, res, 400);
    }
    // check product deleted or not
    if (product.isDeleted === true) {
      return returnResponse(MESSAGES.PRODUCT_IS_DELETED, null, res, 400);
    }
    // add product to wishlisgt
    const wishlist = await addProductToWishlistService(productId, userId);
    return returnResponse(
      MESSAGES.ADD_PRODUCT_TO_WISHLIST_SUCCESSFULLY,
      wishlist,
      res,
      200,
    );
  } catch (error) {
    return returnResponse(
      MESSAGES.ADD_PRODUCT_TO_WISHLIST_FAILED,
      error,
      res,
      500,
    );
  }
};

/**
 * delete 1 product from wishlist by wishlistId (1 product in wishlist = 1 document in wishlist)
 * @param req
 * @param res
 * @returns
 */
export const deleteProductFromWishList = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.user!;
    const { wishlistId } = req.body;
    // check wishlist existed or not
    const isWishListExisted = await getWishListByIdService(wishlistId);
    if (!isWishListExisted) {
      return returnResponse(MESSAGES.WISHLIST_NOT_FOUND, null, res, 404);
    }
    // check wishlist belong to current user not
    if (isWishListExisted.user.toString() != userId) {
      return returnResponse(MESSAGES.WISHLIST_NOT_FOUND, null, res, 400);
    }
    // delete
    const deleteProduct =
      await deleteProductFromWishListByIdService(wishlistId);
    return returnResponse(
      MESSAGES.DELETE_PRODUCT_FROM_WISHLIST_SUCCESSFULLY,
      deleteProduct,
      res,
      200,
    );
  } catch (error) {
    return returnResponse(
      MESSAGES.DELETE_PRODUCT_FROM_WISHLIST_FAILED,
      error,
      res,
      500,
    );
  }
};

/**
 * delete many products from wishlist by wishlistIds
 * @param req
 * @param res
 * @returns
 */
export const deleteProductsFromWishList = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = req.user!;
    const { wishlistIds } = req.body;
    // delete many product in wishlist by wishlistIds and userId
    const deleteProducts = await deleteProductsFromWishListService(
      wishlistIds,
      userId,
    );
    return returnResponse(
      MESSAGES.DELETE_PRODUCTS_FROM_WISHLIST_SUCCESSFULLY,
      deleteProducts,
      res,
      200,
    );
  } catch (error) {
    return returnResponse(
      MESSAGES.DELETE_PRODUCTS_FROM_WISHLIST_FAILED,
      error,
      res,
      500,
    );
  }
};

/**
 * get all wishlist of current user by userId
 * @param req
 * @param res
 * @returns
 */
export const getMyWishList = async (req: Request, res: Response) => {
  try {
    const { userId } = req.user!;
    const getWishList = await getUserWishList(userId);
    return returnResponse(
      MESSAGES.GET_WISHLIST_SUCCESSFULLY,
      getWishList,
      res,
      200,
    );
  } catch (error) {
    return returnResponse(
      MESSAGES.GET_MESSAGES_FAILED,
      error,
      res,
      500,
    );
  }
};
