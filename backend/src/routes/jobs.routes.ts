import { Router } from "express";
import { applyJob, getJobs } from "../controllers/jobs.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.get("/", getJobs);
router.post("/apply", requireAuth, applyJob);

export default router;
