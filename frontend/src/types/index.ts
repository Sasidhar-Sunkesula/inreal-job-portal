export type Job = {
  id: string;
  title: string;
  company: {
    name: string;
  };
  location: string;
  skills: string[];
  updatedAt: string;
};
export type User = {
  id: string;
  name: string;
  email: string;
};
