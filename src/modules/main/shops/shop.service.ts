import { ObjectId } from "mongoose";
import Shop from "./shop.schema.js";
import { ShopApprovalStatus } from "../../../constants/shop.constant.js";

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

export const updateStatusService = async (
  owner: string,
  approvalStatus: ShopApprovalStatus,
  rejectReason?: string,
) => {
  const shop = await Shop.findByIdAndUpdate(
    owner,
    { approvalStatus, rejectReason },
    { new: true },
  );
  return shop;
};

export const getShopByOwnerId = async (owner: string) => {
  const shop = await Shop.findOne({owner});
  return shop;
};

export const adminGetRequestsService = async (
  owner: string | null, // used to filter
  isDeleted: boolean | null, // used to filter
  approvalStatus: ShopApprovalStatus[] | null, // used to filter
) => {
  const query: any = {};

  if(isDeleted!=null){
    query.isDeleted = isDeleted;
  }
  if(owner!=null){
    query.owner = owner;
  }
  if(isDeleted!=null){
    query.approvalStatus = {$in: approvalStatus};
  }

  const shop = await Shop.find({
    owner,
    isDeleted,
    approvalStatus,
  }).populate('owner');

  return shop;
};
