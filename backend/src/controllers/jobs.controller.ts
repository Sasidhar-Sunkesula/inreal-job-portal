import { NextFunction, Request, Response } from "express";
import client from "../db/client";

export async function getJobs(req: Request, res: Response, next: NextFunction) {
  try {
    // Pagination
    const page = parseInt(req.query.page as string) || 0;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = page * limit;
    const jobs = await client.job.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        title: true,
        company: {
          select: {
            name: true,
          },
        },
        location: true,
        skills: true,
        updatedAt: true,
      },
    });
    res.json({ jobs });
  } catch (error) {
    next(error);
  }
}

export async function applyJob(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { jobId } = req.body;
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const job = await client.job.findUnique({
      where: {
        id: jobId,
      },
    });
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }
    const application = await client.application.findUnique({
      where: {
        userId_jobId: {
          jobId,
          userId,
        },
      },
    });
    if (application) {
      res.status(400).json({ message: "Already applied" });
      return;
    }
    await client.application.create({
      data: {
        jobId,
        userId,
      },
    });
    res.status(201).send();
  } catch (error) {
    next(error);
  }
}
