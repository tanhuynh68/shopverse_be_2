import Product from "./product.schma.js";

export const getProductByIdService = async (productId: string) => {
  const product = await Product.findById(productId);
  return product;
};

export const getProductByShopId = async (
  productId: string,
  shopId: string,
) => {
  const product = await Product.findOne({
    shop_id: shopId,
    _id: productId,
    // isActive: isActive || true,
    // isDeleted: isDeleted ||false,
  });
  return product;
};
