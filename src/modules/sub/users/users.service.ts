import { ROLE } from "../../../constants/role.constant.js";
import User from "./users.schema.js";

// for user and shop
export const getUserByIdService = async (_id: string) => {
  const user = User.findById(_id);
  return user;
};

export const addRoleShop = async (_id: string) => {
  const user = User.findByIdAndUpdate(
    _id,
    { role: [ROLE.CUSTOMER, ROLE.SHOP] },
    { new: true },
  );
  return user;
};

export const getUserByEmailService = async (email: string) => {
  const user = User.findOne({ email });
  return user;
};

//
export const getUsersByIdService = async (ids: string) => {
  const user = User.find({ _id: { $in: ids } });
  return user;
};
