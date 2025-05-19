import type { Job } from "@/types";
import { Recommendations } from "../components/Jobs/Recommendations";

const recommendedJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    skills: ["React", "TypeScript", "CSS"],
  },
  {
    id: "3",
    title: "AI Specialist",
    company: "AIMinds",
    location: "Remote",
    skills: ["Python", "AI/ML", "DevOps"],
  },
  {
    id: "4",
    title: "Full Stack Developer",
    company: "Webify",
    location: "Remote",
    skills: ["React", "Node.js", "Tailwind"],
  },
];

export default function RecommendationsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-2xl font-bold text-center">AI Recommendations</h1>
        <p className="text-center text-muted-foreground text-sm">
          Based on your profile, here are some job recommendations for you by AI
        </p>
      </div>
      <Recommendations jobs={recommendedJobs} />
    </div>
  );
}
