import { Request, Response } from "express";
import { createBrandService, createCateService } from "./test.service.js";
import { returnResponse } from "../../utils/return.util.js";

export const createBrand = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const brand = await createBrandService(name);
    return returnResponse("create test brand", brand, res, 201);
  } catch (error) {
    return returnResponse("create test brand failed", error, res, 500);
  }
};

export const createCate= async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const brand = await createCateService(name);
    return returnResponse("create test cate", brand, res, 201);
  } catch (error) {
    return returnResponse("create test cate failed", error, res, 500);
  }
};

