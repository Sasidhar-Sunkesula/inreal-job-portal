import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { getUser } from "../controllers/user.controller";

const router = Router();

router.get("/", requireAuth, getUser);

export default router;
