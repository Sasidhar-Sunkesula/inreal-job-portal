import type { Job } from "@/types";
import { motion } from "motion/react";

export default function JobCard({ job }: { job: Job }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-card rounded-lg shadow p-6 mb-4 border border-border"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold text-primary">{job.title}</h3>
        <span className="text-sm text-muted-foreground">{job.location}</span>
      </div>
      <div className="text-muted-foreground mb-2 text-sm">{job.company}</div>
      <div className="flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
