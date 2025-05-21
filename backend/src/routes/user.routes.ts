import { Router } from "express";
import { getUser, updateProfile } from "../controllers/user.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/", requireAuth, getUser);
router.put("/profile", requireAuth, updateProfile);

export default router;
