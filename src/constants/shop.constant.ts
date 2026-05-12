export const SHOP_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED"
};

export type ShopStatus =
  (typeof SHOP_STATUS)[keyof typeof SHOP_STATUS];