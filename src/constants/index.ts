import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

type SuccessStatusCode = 200 | 201;

type ErrorData =
  | {
      message?: string;
    }
  | string
  | unknown;

export const returnResponse = <T>(
  message: string,
  data: T,
  res: Response,
  statusCode: number,
): Response => {
  const isSuccess = statusCode === 200 || statusCode === 201;

  return res.status(statusCode).json({
    message,
    status_code: statusCode,
    totalItems: Array.isArray(data) ? data.length : undefined,

    ...(isSuccess
      ? { data }
      : {
          error:
            typeof data === "object" && data !== null && "message" in data
              ? (data as { message?: string }).message
              : data,
        }),
  });
};

export const returnResponseQuery = <T>(
  message: string,
  data: T,
  res: Response,
  statusCode: number,
  currentPage: number,
  totalPages: number,
  limit: number,
  totalItems: number,
): Response => {
  const isSuccess = statusCode === 200 || statusCode === 201;

  return res.status(statusCode).json({
    message,
    status_code: statusCode,
    totalItems,
    currentPage,
    totalPages,
    size: limit,

    ...(isSuccess
      ? { data }
      : {
          error:
            typeof data === "object" && data !== null && "message" in data
              ? (data as { message?: string }).message
              : data,
        }),
  });
};

export const validateBody =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body.user;
      req.body = schema.parse(req.body);
      req.body.user = user;
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
