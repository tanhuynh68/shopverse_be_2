import { Response } from "express";

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