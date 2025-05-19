import { useState } from "react";
import JobList from "../components/Jobs/JobList";
import { Link } from "react-router-dom";

const jobs = [
  { id: "1", title: "Frontend Developer", company: "TechCorp", location: "Remote", skills: ["React", "TypeScript", "CSS"] },
  { id: "2", title: "Backend Engineer", company: "DataWorks", location: "Onsite", skills: ["Node.js", "SQL", "DevOps"] },
  { id: "3", title: "AI Specialist", company: "AIMinds", location: "Remote", skills: ["Python", "AI/ML", "DevOps"] },
  { id: "4", title: "Full Stack Developer", company: "Webify", location: "Remote", skills: ["React", "Node.js", "Tailwind"] },
];

export default function Jobs() {
  const [search, setSearch] = useState("");
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search jobs, companies, or skills..."
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Link to="/recommendations" className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">Find My Matches</Link>
      </div>
      <JobList jobs={filteredJobs} />
    </div>
  );
}
