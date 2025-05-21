export function getRecommendationPrompt(
  user: {
    name: string;
    location: string | null;
    experience: number | null;
    skills: string[] | null;
    preference: string | null;
  },
  jobs: {
    id: string;
    title: string;
    company: {
      name: string;
    };
    type: string;
    skills: string[];
  }[]
) {
  return `You are an expert job matching assistant. Given a user profile and a list of jobs, 
recommend the top 3 most relevant jobs for the user. 
User Profile:
Name: ${user.name}
Location: ${user.location}
Years of Experience: ${user.experience}
Skills: ${user.skills?.join(", ")}
Preferred Job Type: ${user.preference}

Job Listings:
${jobs
  .map(
    (job, idx) =>
      `${idx + 1}. ID: ${job.id}\n   Title: ${job.title}\n   Company: ${
        job.company.name
      }\n   Location: ${job.type}\n   Skills: ${job.skills.join(", ")}`
  )
  .join("\n")}

Instructions: Select the 3 jobs that best match the user's skills, experience, location, and preferences. 
Respond ONLY with a JSON object of the 3 best jobs with a string array of the job ids. 
It should have a job key and the value should be an array of job ids.
Example: {"jobs": ["1", "2", "3"]}`;
}
