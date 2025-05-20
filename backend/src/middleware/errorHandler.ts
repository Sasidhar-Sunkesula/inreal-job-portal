import { Request, Response, NextFunction } from "express";

interface ErrorWithStatus extends Error {
  status: number;
  message: string;
}

export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message });
};
