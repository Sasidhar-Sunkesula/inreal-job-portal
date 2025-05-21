import { API_URL } from "@/constants";
import type { Job } from "@/types";
import { Loader } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import JobCard from "./JobCard";

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getRecommendations() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/recommendations`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        console.log(data);
        setRecommendations(data.recommendations);
      } catch {
        toast.error("Failed to fetch recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    getRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader className="animate-spin size-4" />
      </div>
    );
  }

  if (!recommendations.length) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-muted-foreground">No recommendations found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recommendations.map((job, i) => (
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
