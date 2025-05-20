import { useEffect, useState } from "react";
import JobList from "../components/Jobs/JobList";
import { Input } from "../components/ui/input";
import { useJobs } from "../hooks/useJobs";
import { Loader } from "lucide-react";

export default function Jobs() {
  const { jobs, fetchJobs, loading } = useJobs();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader className="animate-spin size-4" />
      </div>
    );
  }

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.name.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      )
  );
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-center">Jobs</h1>
      <Input
        type="text"
        placeholder="Search jobs, companies, or skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <JobList jobs={filteredJobs} />
    </div>
  );
}
