import express from "express";
import { validateBody } from "../../../utils/validate.util.js";
import { shopLogin } from "./auth.controller.js";
import { shopLoginValidate } from "./auth.middleware.js";
const authRoute = express.Router();

authRoute.post("/", validateBody(shopLoginValidate), shopLogin);


export default authRoute;
