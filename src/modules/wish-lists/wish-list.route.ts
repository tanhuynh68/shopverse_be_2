import express from "express";
import { isUser } from "../../middlewares/jwt/jwt.middleware.js";
import { addProductToWishlist, deleteProductFromWishList, deleteProductsFromWishList, getMyWishList } from "./wish-list.controller.js";
import { addProductToWishlistSchema, deleteProductFromWishListSchema, deleteProductsFromWishListSchema, } from "./wish-list.middleware.js";
import { validateBody } from "../../utils/validate.util.js";

const wishlistRoute = express.Router();

// add product to wishlist
wishlistRoute.post("/", isUser, validateBody(addProductToWishlistSchema), addProductToWishlist);
wishlistRoute.delete("/", isUser, validateBody(deleteProductFromWishListSchema), deleteProductFromWishList);
wishlistRoute.delete("/many", isUser, validateBody(deleteProductsFromWishListSchema), deleteProductsFromWishList);
wishlistRoute.get("/", isUser, getMyWishList);

export default wishlistRoute;
