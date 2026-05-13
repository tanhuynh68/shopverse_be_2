import ENV from "../../configs/env.config.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IRole, ROLE } from "../../constants/role.constant.js";
import User from "../../modules/sub/users/users.schema.js";
import { returnResponse } from "../../utils/return.util.js";
import { MESSAGES } from "../../messages/index.js";
//
interface DecodedToken extends JwtPayload {
  data: {
    email: string;
    role: IRole[];
    name: string;
    account_id: string;
    isPasswordExisted: boolean;
    isActive: boolean,
    isDeleted: boolean,
    phone: string
  };
}
//
export interface IUserAuthData {
  email: string;
  role: IRole[]; // hoặc RoleType nếu có enum
  name: string;
  _id: string;
  isPasswordExisted: boolean;
  isActive: boolean;
  isDeleted: boolean;
  phone: string;
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
    console.log(decoded)
    if (decoded.data.role.includes(ROLE.CUSTOMER)) {
      const user = await getAllUserData(decoded.data.account_id);
      // user is not exist or user has been sort deleted by admin
      if (!user || user.isDeleted) { // isDeleted = true => user has been deleted => not found
        return returnResponse("User not found", null, res, 404);
      }
      if (user.isActive === false) {
        return returnResponse("Account has not been activated yet!", null, res, 400);
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
    console.log("decoded: ", decoded);
    if (decoded.data.role.includes(ROLE.ADMIN)) {
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
      decoded.data.role.includes(ROLE.ADMIN) ||
      decoded.data.role.includes(ROLE.CUSTOMER) ||
      decoded.data.role.includes(ROLE.SHOP)
    ) {
      const user = { ...decoded.data, userId: decoded.data.account_id };
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


const createToken = (data: any, res: Response) => {
  if(data.isDeleted){
    return returnResponse(MESSAGES.USER_HAS_BEEN_DELETED, null, res, 401);
  }
  const token = jwt.sign(
    {
      data: {
        email: data.email,
        role: data.role,
        name: data.name,
        account_id: data._id,
        isPasswordExisted: data.isPasswordExisted,
        isActive: data.isActive,
        isDeleted: data.isDeleted,
        phone: data.phone,
      },
    },
    ENV.SECRET as string,
    {
      expiresIn: ENV.TOKEN_EXPIRED as jwt.SignOptions["expiresIn"],
    }
  );

  return token;
};
export { isUser, isAdmin, isLogin, createToken };
