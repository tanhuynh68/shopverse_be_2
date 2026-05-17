import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const validateBody =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      req.body = schema.parse(req.body);
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.issues,
        });
      }
      return res.status(500).json({
        message: "Internal error",
      });
    }
  };

export const validateParams =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      schema.parse(req.params);
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          errors: error.flatten(),
        });
      }
      return res.status(500).json({
        message: "Internal error",
      });
    }
  };
