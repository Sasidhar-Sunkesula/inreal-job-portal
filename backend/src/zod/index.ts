import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  location: z.string().min(3, "Location must be at least 3 characters long"),
  experience: z.number().min(0, "Experience must be at least 0"),
  skills: z.array(z.string()).min(1, "Skills must be at least 1"),
  preference: z.enum(["Remote", "Onsite", "Hybrid"]),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
