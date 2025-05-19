import { motion } from "motion/react";
import JobCard from "./JobCard";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  skills: string[];
};

export default function Recommendations({ jobs }: { jobs: Job[] }) {
  return (
    <div className="space-y-4">
      {jobs.map((job, i) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
        >
          <JobCard job={job} />
        </motion.div>
      ))}
    </div>
  );
}
