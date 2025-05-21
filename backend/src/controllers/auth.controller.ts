import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import client from "../db/client";
import { loginSchema, registerSchema } from "../zod";

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const validated = loginSchema.safeParse(req.body);
    if (!validated.success) {
      throw new Error(validated.error.message);
    }
    const { email, password } = validated.data;
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Incorrect password");
    }
    const token = createToken(user.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: 'none', // Allow cross-site requests
      secure: true, // Ensure the cookie is sent over HTTPS
    });
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

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const validated = registerSchema.safeParse(req.body);
    if (!validated.success) {
      throw new Error(validated.error.message);
    }
    const { name, email, password, location, experience, skills, preference } =
      validated.data;
    const existingUser = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await client.user.create({
      data: {
        name,
        email,
        password: hash,
        location,
        experience,
        skills: skills || [],
        preference,
      },
    });
    const token = createToken(user.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: 'none', // Allow cross-site requests
      secure: true, // Ensure the cookie is sent over HTTPS
    });
    res.status(201).json({
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

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: 'none', // Allow cross-site requests
      secure: true, // Ensure the cookie is sent over HTTPS
    });
    res.json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
}
