import z from "zod";

export const addProductToWishlistSchema = z.object({
  productId: z.string().min(1, "productId is required"),
});

export const deleleProductFromWishListSchema = z.object({
  wishlistId: z.string().min(1, "wishlistId is required"),
});

export const deleleProductsFromWishListSchema = z.object({
  wishlistIds: z.array(z.string()),
});