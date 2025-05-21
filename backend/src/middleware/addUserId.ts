import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function addUserId(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.jwt;
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  if (!token) {
    next();
    return;
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };
  req.userId = decoded.id;
  next();
}
