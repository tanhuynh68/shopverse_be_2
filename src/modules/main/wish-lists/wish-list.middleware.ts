import z from "zod";

export const addProductToWishlistSchema = z.object({
  productId: z.string().min(1, "productId is required"),
});

export const deleteProductFromWishListSchema = z.object({
  wishlistId: z.string().min(1, "wishlistId is required"),
});

export const deleteProductsFromWishListSchema = z.object({
  wishlistIds: z.array(z.string()),
});