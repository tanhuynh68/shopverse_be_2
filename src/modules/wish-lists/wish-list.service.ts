import WishList from "./wish-list.schema.js";

export const addProductToWishlistService = async (productId: string, userId: string) => {
  const wishlist = await WishList.create({product: productId, user: userId});
  return wishlist;
};

export const getWishListService = async (productId: string, userId: string) => {
  const wishlist = await WishList.findOne({product: productId, user: userId});
  return wishlist;
};

export const getWishListByIdService = async (_id: string) => {
  const wishlist = await WishList.findById(_id);
  return wishlist;
};

export const deleteProductFromWishListByIdService = async (_id: string) => {
  const wishlist = await WishList.findByIdAndDelete(_id);
  return wishlist;
};

export const deleteProductsFromWishListService = async (wishlistIds: string, user: string) => {
  const result = await WishList.deleteMany({_id: {$in: wishlistIds}, user});
  return result.deletedCount;
};

export const getUserWishList = async ( userId: string) => {
  const wishlist = await WishList.find({ user: userId});
  return wishlist;
};
