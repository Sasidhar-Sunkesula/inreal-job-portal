import { Router } from "express";
import { applyJob, getJobs, recommendJobs } from "../controllers/jobs.controller";
import { requireAuth } from "../middleware/requireAuth";
import { addUserId } from "../middleware/addUserId";

const router = Router();

router.get("/", addUserId, getJobs);
router.post("/apply", requireAuth, applyJob);
router.get("/recommendations", requireAuth, recommendJobs);

export default router;
