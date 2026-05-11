import ENV from "../../configs/env.config.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { returnResponse } from "../../constants/index.js";
import { ROLE } from "../../constants/role.constant.js";
import User from "../../modules/users/users.schema.js";

interface DecodedToken extends JwtPayload {
  data: {
    email: string;
    role: string;
    name: string;
    account_id: string;
    isPasswordExisted: boolean;
  };
}

const getTokenFromHeader = (req: Request): string | null => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split(" ")[1];
};

const isUser = async (
  req: any,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const token = getTokenFromHeader(req);

  if (!token) {
    return returnResponse("Access token is missing", null, res, 401);
  }

  try {
    const decoded = jwt.verify(token, ENV.SECRET) as DecodedToken;
    if (decoded.data.role === ROLE.CUSTOMER) {
      const user = await getAllUserData(decoded.data.account_id);

      if (!user) {
        return returnResponse("User not found", null, res, 404);
      }
      //
      req.user = { ...decoded.data, userId: decoded.data.account_id };
      return next();
    }

    return returnResponse("Forbidden", null, res, 403);
  } catch (error) {
    return returnResponse("Invalid or expired token", error, res, 403);
  }
};

const isAdmin = (
  req: any,
  res: Response,
  next: NextFunction,
): Response | void => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return returnResponse("Access token is missing", null, res, 401);
  }
  try {
    const decoded = jwt.verify(token, ENV.SECRET) as DecodedToken;
    if (decoded.data.role === ROLE.ADMIN) {
      //
      req.user = { ...decoded.data, userId: decoded.data.account_id };
      return next();
    }
    return returnResponse("Forbidden", null, res, 403);
  } catch (error) {
    return returnResponse("Invalid or expired token", error, res, 403);
  }
};

const isLogin = async (req: any, res: Response, next: NextFunction) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return returnResponse("Access token is missing", null, res, 401);
  }
  try {
    const decoded = jwt.verify(token, ENV.SECRET) as DecodedToken;
    if (
      decoded.data.role === ROLE.ADMIN || decoded.data.role === ROLE.CUSTOMER || decoded.data.role === ROLE.SHOP
    ) {
      const user = { ...decoded.data, userId: decoded.data.account_id }
      req.body = req.body || {};
      req.user = user;
      return next();
    }
    return returnResponse("Forbidden", null, res, 403);
  } catch (error) {
    return returnResponse("Invalid or expired token", error, res, 403);
  }
};

const getAllUserData = async (_id: string) => {
  const data = await User.findById({ _id });
  return data;
};
export { isUser, isAdmin, isLogin };
