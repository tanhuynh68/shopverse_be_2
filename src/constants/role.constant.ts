export const ROLE = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  SHOP: "SHOP",
};

export type IRole =
  (typeof ROLE)[keyof typeof ROLE];

