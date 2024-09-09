import { Request, Response, NextFunction } from "express";

// Custom error class to standardize error responses
class AppError extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}
export const errorMiddleware = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  console.error(`[Error] ${message}:`, err);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

export const createError = (statusCode: number, message: string) => {
  return new AppError(statusCode, message);
};
