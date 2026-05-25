import { z } from "zod";
import { AddressLabel } from "../../../constants/address.js";

export const createAddressValidate = z.object({
  fullName: z
    .string({
      message: "fullName is required",
    })
    .min(1, {
      message: "fullName is required",
    }),

  phoneNumber: z
    .string({
      message: "phoneNumber is required",
    })
    .regex(/^[0-9]{10}$/, {
      message: "phoneNumber must be 10 digits",
    }),

  province: z.object({
    code: z.string().min(1, {
      message: "province code is required",
    }),

    name: z.string().min(1, {
      message: "province name is required",
    }),
  }),

  ward: z.object({
    code: z.string().min(1, {
      message: "ward code is required",
    }),

    name: z.string().min(1, {
      message: "ward name is required",
    }),
  }),

  specificAddress: z
    .string({
      message: "specificAddress is required",
    })
    .min(1, {
      message: "specificAddress is required",
    }),

  label: z
    .enum(Object.values(AddressLabel) as [string, ...string[]], {
      message: "Invalid address label",
    })
    .optional(),

  isDefault: z.boolean().optional(),
});

export const updateAddressValidate = z.object({
  fullName: z
    .string({
      message: "fullName is required",
    })
    .min(1, {
      message: "fullName is required",
    }),

  phoneNumber: z
    .string({
      message: "phoneNumber is required",
    })
    .regex(/^[0-9]{10}$/, {
      message: "phoneNumber must be 10 digits",
    }),

  province: z.object({
    code: z.string().min(1, {
      message: "province code is required",
    }),

    name: z.string().min(1, {
      message: "province name is required",
    }),
  }),

  ward: z.object({
    code: z.string().min(1, {
      message: "ward code is required",
    }),

    name: z.string().min(1, {
      message: "ward name is required",
    }),
  }),

  specificAddress: z
    .string({
      message: "specificAddress is required",
    })
    .min(1, {
      message: "specificAddress is required",
    }),

  label: z
    .enum(Object.values(AddressLabel) as [string, ...string[]], {
      message: "Invalid address label",
    })
    .optional(),

  isDefault: z.boolean().optional(),
  addressId: z.string({
    message: "addressId is required",
  }),
});

export const deleteAddressValidate = z.object({
  addressId: z.string({
    message: "addressId is required",
  }),
});

export const updateDefaultAddressValidate = z.object({
  addressId: z.string({
    message: "addressId is required",
  }),
});
