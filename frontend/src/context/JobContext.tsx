import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { API_URL } from "../constants";
import type { Job } from "../types";

interface JobContextType {
  jobs: Job[];
  loading: boolean;
  applyingJobId: string | null;
  fetchJobs: () => Promise<void>;
  applyForJob: (jobId: string) => Promise<void>;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);

  async function fetchJobs() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/jobs`, {
        credentials: "include", // Include cookies for auth
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error('Failed to fetch jobs');
      }
      setJobs(data.jobs);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  async function applyForJob(jobId: string) {
    if (applyingJobId) return; // Prevent multiple applications at once
    
    try {
      setApplyingJobId(jobId);
      const res = await fetch(`${API_URL}/api/jobs/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ jobId }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to apply for job");
      }
      
      // Update the job in the local state
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId ? { ...job, applied: true } : job
        )
      );
      
      toast.success("Successfully applied for job!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to apply for job");
    } finally {
      setApplyingJobId(null);
    }
  }

  return (
    <JobContext.Provider
      value={{
        jobs,
        loading,
        applyingJobId,
        fetchJobs,
        applyForJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
}