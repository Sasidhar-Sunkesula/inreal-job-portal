import { motion } from "motion/react";
import { useState } from "react";
import Recommendations from "../components/Jobs/Recommendations";
import { buttonVariants } from "../components/ui/button";

const recommendedJobs = [
  { id: "1", title: "Frontend Developer", company: "TechCorp", location: "Remote", skills: ["React", "TypeScript", "CSS"] },
  { id: "3", title: "AI Specialist", company: "AIMinds", location: "Remote", skills: ["Python", "AI/ML", "DevOps"] },
  { id: "4", title: "Full Stack Developer", company: "Webify", location: "Remote", skills: ["React", "Node.js", "Tailwind"] },
];

export default function RecommendationsPage() {
  const [show, setShow] = useState(false);
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setShow(true)}
        className={buttonVariants({ variant: "default" })}
      >
        Find My Matches
      </motion.button>
      {show && <Recommendations jobs={recommendedJobs} />}
    </div>
  );
}
