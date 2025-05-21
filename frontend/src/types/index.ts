export type Job = {
  id: string;
  title: string;
  company: {
    name: string;
  };
  type: "Remote" | "Hybrid" | "Onsite";
  skills: string[];
  updatedAt: string;
  applied?: boolean;
};
export type User = {
  id: string;
  name: string;
  email: string;
  location: string;
  experience: number;
  preference: "Remote" | "Hybrid" | "Onsite" | "Any";
  skills: string[];
};
