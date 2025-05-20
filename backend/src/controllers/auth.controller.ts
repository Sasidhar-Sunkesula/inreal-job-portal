import { NextFunction, Request, Response } from "express";
import client from "../db/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
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
      secure: true,
      sameSite: "strict",
    });
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required");
    }
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
      },
    });
    const token = createToken(user.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      secure: true,
      sameSite: "strict",
    });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie("jwt");
    res.json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
}
