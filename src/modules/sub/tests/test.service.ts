import Brand from "../brands/brand.schema.js"
import Category from "../categories/category.schema.js";

export const createBrandService = async (name: string) => {
    const brand = await Brand.create({name})
    return brand;
}

export const createCateService = async (name: string) => {
    const brand = await Category.create({name})
    return brand;
}