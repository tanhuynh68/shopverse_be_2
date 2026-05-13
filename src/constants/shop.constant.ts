export const SHOP_APPROVAL_STATUS = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED"
};

export type ShopApprovalStatus =
  (typeof SHOP_APPROVAL_STATUS)[keyof typeof SHOP_APPROVAL_STATUS];