import { Request, Response, NextFunction } from "express";
import client from "../db/client";

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const user = await client.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}
