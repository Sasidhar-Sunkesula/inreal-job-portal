import JobCard from "./JobCard";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  skills: string[];
};

export default function JobList({ jobs }: { jobs: Job[] }) {
  if (!jobs.length) return <div>No jobs found.</div>;
  return (
    <div>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
