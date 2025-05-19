import { useState } from "react";
import { motion } from "motion/react";

const skillsList = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "SQL", "CSS", "Tailwind", "AI/ML", "DevOps"
];
const jobTypes = ["remote", "onsite", "any"];

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [jobType, setJobType] = useState("any");

  const handleSkillToggle = (skill: string) => {
    setSkills(skills.includes(skill)
      ? skills.filter(s => s !== skill)
      : [...skills, skill]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call profile API
    alert(`Profile: ${name}, ${location}, ${experience}, ${skills.join(", ")}, ${jobType}`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-card p-8 rounded-lg shadow max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Location</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Years of Experience</label>
        <input
          type="number"
          min="0"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary"
          value={experience}
          onChange={e => setExperience(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Skills</label>
        <div className="flex flex-wrap gap-2">
          {skillsList.map(skill => (
            <button
              type="button"
              key={skill}
              className={`px-3 py-1 rounded-full border ${skills.includes(skill) ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block mb-1 font-medium">Preferred Job Type</label>
        <select
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary"
          value={jobType}
          onChange={e => setJobType(e.target.value)}
        >
          {jobTypes.map(type => (
            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md font-semibold hover:bg-primary/90 transition-colors"
      >
        Save Profile
      </button>
    </motion.form>
  );
}
