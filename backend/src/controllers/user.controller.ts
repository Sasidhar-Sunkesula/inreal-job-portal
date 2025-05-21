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
        location: user.location,
        experience: user.experience,
        skills: user.skills,
        preference: user.preference,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    
    const { name, location, experience, skills, preference } = req.body;
    
    const updatedUser = await client.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
        location: location,
        experience: experience,
        skills: skills,
        preference: preference,
      },
    });
    
    res.json({
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        location: updatedUser.location,
        experience: updatedUser.experience,
        skills: updatedUser.skills,
        preference: updatedUser.preference,
      },
    });
  } catch (error) {
    next(error);
  }
}
