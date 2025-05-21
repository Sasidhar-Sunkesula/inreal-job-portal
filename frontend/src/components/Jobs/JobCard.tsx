import { useAuth } from "@/context/AuthContext";
import { useJobs } from "@/context/JobContext";
import type { Job } from "@/types";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";

export default function JobCard({ job }: { job: Job }) {
  const { user } = useAuth();
  const { applyForJob, applyingJobId } = useJobs();

  const handleApply = async () => {
    if (!user) {
      toast.error("Please login to apply for jobs");
      return;
    }

    applyForJob(job.id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-card rounded-lg shadow p-6 mb-4 border border-border"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-primary">{job.title}</h3>
        <span className="text-sm text-muted-foreground">{job.type}</span>
      </div>
      <div className="text-muted-foreground mb-2 text-sm">
        {job.company.name}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {new Date(job.updatedAt).toLocaleDateString()}
        </span>
        <Button
          onClick={handleApply}
          disabled={applyingJobId === job.id || job.applied}
          variant={job.applied ? "outline" : "default"}
          size="sm"
        >
          {job.applied
            ? "Applied"
            : applyingJobId === job.id
            ? "Applying..."
            : "Apply"}
        </Button>
      </div>
    </motion.div>
  );
}
