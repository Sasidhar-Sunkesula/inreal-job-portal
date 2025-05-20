import { Router } from "express";
import { errorHandler } from "../middleware/errorHandler";
import authRouter from "./auth.routes";
import jobsRouter from "./jobs.routes";
import userRouter from "./user.routes";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/api/jobs", jobsRouter);
router.use("/api/user", userRouter);

// Error handler
router.use(errorHandler);

// 404 handler
router.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default router;
