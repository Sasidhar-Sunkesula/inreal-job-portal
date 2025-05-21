import { generateObject, generateText } from "ai";
import { NextFunction, Request, Response } from "express";
import client from "../db/client";
import { getRecommendationPrompt } from "../prompts/recommendation.prompt";
import { model } from "../providers";
import z from "zod";

export async function getJobs(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId;
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
        type: true,
        skills: true,
        updatedAt: true,
        applications: userId
          ? {
              where: {
                userId: userId,
              },
              select: {
                id: true,
              },
            }
          : undefined,
      },
    });

    // Transform the response to include applied status
    const transformedJobs = jobs.map((job) => ({
      ...job,
      applied: userId ? job.applications && job.applications.length > 0 : false,
      applications: undefined,
    }));

    res.json({ jobs: transformedJobs });
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

export async function recommendJobs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    // Fetch user profile
    const user = await client.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Fetch all jobs
    const jobs = await client.job.findMany({
      select: {
        id: true,
        title: true,
        company: { select: { name: true } },
        type: true,
        skills: true,
        updatedAt: true,
      },
      take: 20,
    });

    // Call the LLM
    const { object } = await generateObject({
      model: model,
      prompt: getRecommendationPrompt(user, jobs),
      mode: "json",
      schema: z.object({
        jobs: z.array(z.string()),
      }),
    });
    console.log(object);

    res.json({
      recommendations: (object.jobs as string[]).map((id) =>
        jobs.find((job) => job.id === id)
      ),
    });
  } catch (error) {
    next(error);
  }
}
