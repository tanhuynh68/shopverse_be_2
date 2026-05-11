import express from "express";
import { validateBody } from "../../constants/index.js";
import { isLogin, isUser } from "../../middlewares/jwt/jwt.middleware.js";
import { addProductToWishlist, deleleProductFromWishList, deleleProductsFromWishList, getMyWishList } from "./wish-list.controller.js";
import { addProductToWishlistSchema, deleleProductFromWishListSchema, deleleProductsFromWishListSchema } from "./wish-list.middleware.js";

const wishlistRoute = express.Router();

// add product to wishlist
wishlistRoute.post("/", isUser, validateBody(addProductToWishlistSchema), addProductToWishlist);
wishlistRoute.delete("/", isUser, validateBody(deleleProductFromWishListSchema), deleleProductFromWishList);
wishlistRoute.delete("/many", isUser, validateBody(deleleProductsFromWishListSchema), deleleProductsFromWishList);
wishlistRoute.post("/", isUser, getMyWishList);

export default wishlistRoute;
