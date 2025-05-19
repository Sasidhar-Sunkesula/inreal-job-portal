import type { Job } from "@/types";
import JobCard from "./JobCard";

export default function JobList({ jobs }: { jobs: Job[] }) {
  if (!jobs.length) return <div>No jobs found.</div>;
  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
