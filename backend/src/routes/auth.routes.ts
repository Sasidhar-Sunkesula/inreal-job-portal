import { Router } from "express";
import { logout, signIn, signUp } from "../controllers/auth.controller";

const router = Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/logout", logout);

export default router;