import { useState } from "react";
import { toast } from "react-hot-toast";
import { API_URL } from "../constants";
import type { Job } from "../types";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchJobs() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/jobs`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setJobs(data.jobs);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return {
    jobs,
    fetchJobs,
    loading,
  };
}
