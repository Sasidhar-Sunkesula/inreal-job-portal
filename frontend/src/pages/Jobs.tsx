import { useState } from "react";
import JobList from "../components/Jobs/JobList";
import { Input } from "../components/ui/input";

const jobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    skills: ["React", "TypeScript", "CSS"],
  },
  {
    id: "2",
    title: "Backend Engineer",
    company: "DataWorks",
    location: "Onsite",
    skills: ["Node.js", "SQL", "DevOps"],
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

export default function Jobs() {
  const [search, setSearch] = useState("");
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
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
