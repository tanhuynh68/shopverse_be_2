import { AddressLabel } from "../../../constants/address.js";
import { createAddress } from "./address.controller.js";
import { Address } from "./address.schema.js";

export const getAddressByOwnerId = async (owner: string) => {
  const address = await Address.find({ owner });
  return address;
};

export const getAddressByAddressId = async (_id: string) => {
  const address = await Address.findById(_id);
  return address;
};

export const isAddressOfUser = async (owner: string, addressId: string) => {
  const address = await Address.find({ owner, _id: addressId });
  return address;
};

export const updateDefaultAddressService = async (
  _id: string,
  owner: string,
  isDefault: boolean,
) => {
  const address = await Address.findOneAndUpdate(
    { _id, owner },
    { isDefault: !isDefault },
    { new: true },
  );
  return address;
};

export const createAddressService = async (
  fullName: string,
  phoneNumber: string,
  province: string,
  ward: string,
  specificAddress: string,
  label: AddressLabel,
  isDefault: boolean,
) => {
  const address = await Address.create({
    fullName,
    phoneNumber,
    province,
    ward,
    specificAddress,
    label,
    isDefault,
  });
  return address;
};

export const updateAddressService = async (
  fullName: string,
  phoneNumber: string,
  province: string,
  ward: string,
  specificAddress: string,
  label: AddressLabel,
  isDefault: boolean,
  _id: string,
) => {
  const address = await Address.findByIdAndUpdate(
    _id,
    {
      fullName,
      phoneNumber,
      province,
      ward,
      specificAddress,
      label,
      isDefault,
    },
    { new: true },
  );
  return address;
};

export const deleteAddressService = async (_id: string, owner: string) => {
  const address = await Address.findOneAndDelete({ owner, _id }, { new: true });
  return address;
};
