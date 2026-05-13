import { Request, Response } from "express";
import { getUserByEmailService } from "../../sub/users/users.service.js";
import { returnResponse } from "../../../utils/return.util.js";
import { MESSAGES } from "../../../messages/index.js";
import { comparePassword } from "../../../utils/password.util.js";
import { ROLE } from "../../../constants/role.constant.js";
import { createToken } from "../../../middlewares/jwt/jwt.middleware.js";

export const shopLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmailService(email);
    // check email existed or not
    if (!user) {
      return returnResponse(MESSAGES.EMAIL_NOT_FOUND, null, res, 404);
    }
    const isPasswordCorrect = await comparePassword(password, email.password);
    // check pass
    if (isPasswordCorrect === null) {
      return returnResponse(MESSAGES.PASSWORD_IS_NOT_CORRECT, null, res, 401);
    }
    // check role
    if (!user.role.includes(ROLE.SHOP)) {
      return returnResponse(MESSAGES.YOU_ARE_NOT_SHOP, null, res, 403);
    }
    // create access token
    const accessToken = createToken(user, res);
    if (!accessToken) {
      return returnResponse(MESSAGES.SHOP_LOGIN_FAILED, null, res, 500);
    }
    const data = {
      accessToken,
    };
    return returnResponse(MESSAGES.SHOP_LOGIN_SUCCESSFULLY, data, res, 200);
  } catch (error) {
    return returnResponse(MESSAGES.SHOP_LOGIN_FAILED, null, res, 500);
  }
};
