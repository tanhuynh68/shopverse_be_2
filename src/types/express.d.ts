import { JwtPayload } from "jsonwebtoken";
// this interface used to declare user in req
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email?: string;
        role?: string;
      };
    }
  }
}