import { ObjectId } from "mongoose";
import Shop from "./shop.schema.js";
import { SHOP_STATUS, ShopStatus } from "../../../constants/shop.constant.js";

export const getShopByNormalizeName = async (name: string) => {
  const shop = await Shop.findOne({ normalizedName: name });
  return shop;
};

export const getShopByHotline = async (hotline: string) => {
  const shop = await Shop.findOne({ hotline });
  return shop;
};

export const sendRequestService = async (
  shopName: string,
  hotline: string,
  address: string,
  normalizedName: string,
  owner: string,
) => {
  const shop = await Shop.create({
    shopName,
    hotline,
    address,
    normalizedName,
    owner,
  });
  return shop;
};

export const updateStatusService = async (owner: string, status: ShopStatus) => {
  const shop = await Shop.findByIdAndUpdate(owner, { status }, { new: true });
  return shop;
};

export const getShopByOwnerId = async (owner: string) => {
  const shop = await Shop.findById(owner);
  return shop;
}; 
