import client from "./client";

async function main() {
  const companies = await client.company.createManyAndReturn({
    data: [
      {
        name: "TechCorp",
      },
      {
        name: "DataWorks",
      },
      {
        name: "AIMinds",
      },
      {
        name: "Webify",
      },
    ],
  });

  await client.job.createMany({
    data: [
      {
        title: "Frontend Developer",
        companyId: companies[0].id,
        type: 'Remote',
        skills: ["React", "TypeScript", "CSS"],
      },
      {
        title: "Full Stack Developer",
        companyId: companies[0].id,
        type: 'Remote',
        skills: ["React", "Node.js", "Tailwind"],
      },
      {
        title: "Backend Engineer",
        companyId: companies[1].id,
        type: 'Onsite',
        skills: ["Node.js", "SQL", "DevOps"],
      },
      {
        title: "AI Agent Developer",
        companyId: companies[1].id,
        type: 'Hybrid',
        skills: ["Python", "AI/ML", "DevOps"],
      },
      {
        title: "AI Specialist",
        companyId: companies[2].id,
        type: 'Remote',
        skills: ["Python", "AI/ML", "DevOps"],
      },
      {
        title: "UI/UX Designer",
        companyId: companies[2].id,
        type: 'Hybrid',
        skills: ["Figma", "UI/UX", "Design"],
      },
      {
        title: "Full Stack Developer",
        companyId: companies[3].id,
        type: 'Remote',
        skills: ["React", "Node.js", "Tailwind"],
      },
      {
        title: "React Native Developer",
        companyId: companies[3].id,
        type: 'Hybrid',
        skills: ["React Native", "TypeScript", "CSS"],
      },
    ],
  });

  console.log("Seeding completed");
}

main();
