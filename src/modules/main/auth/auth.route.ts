import express from "express";
import { validateBody } from "../../../utils/validate.util.js";
import { shopLogin } from "./auth.controller.js";
import { shopLoginValidate } from "./auth.middleware.js";
const authRoute = express.Router();

authRoute.post("/shop-login", validateBody(shopLoginValidate), shopLogin);


export default authRoute;
