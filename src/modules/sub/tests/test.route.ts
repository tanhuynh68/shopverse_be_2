
import express from "express";
import { isAdmin} from "../../../middlewares/jwt/jwt.middleware.js";
import { createBrand, createCate } from "./test.controller.js";

const testRoute = express.Router();

testRoute.post("/brand", isAdmin, createBrand);
testRoute.post("/cate", isAdmin, createCate);

export default testRoute;
