import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import type { User } from "@/types";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const skillsList = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "SQL",
  "CSS",
  "Tailwind",
  "AI/ML",
  "DevOps",
];
const jobTypes: User["preference"][] = ["Remote", "Hybrid", "Onsite", "Any"];

export default function ProfileForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState<number | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [jobType, setJobType] = useState<User["preference"]>("Any");
  const { user } = useAuth();

  const handleSkillToggle = (skill: string) => {
    setSkills(
      skills.includes(skill)
        ? skills.filter((s) => s !== skill)
        : [...skills, skill]
    );
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setLocation(user.location);
      setExperience(user.experience);
      setSkills(user.skills);
      setJobType(user.preference);
    }
  }, [user]);

  const { updateProfile, loading: profileLoading } = useProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({
        name,
        location,
        experience: experience || 0,
        skills,
        preference: jobType,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-card p-4 rounded-lg shadow max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-center">Profile</h2>
      <div className="space-y-2">
        <Label className="block font-medium">Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label className="block font-medium">Location</Label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label className="block font-medium">Years of Experience</Label>
        <Input
          type="number"
          min="0"
          value={experience || ""}
          onChange={(e) => setExperience(parseInt(e.target.value))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label className="block font-medium">Skills</Label>
        <div className="flex flex-wrap gap-3">
          {skillsList.map((skill) => (
            <Button
              type="button"
              key={skill}
              className="rounded-full"
              variant={skills.includes(skill) ? "default" : "outline"}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label className="block font-medium">Preferred Job Type</Label>
        <Select
          value={jobType}
          onValueChange={(value) => setJobType(value as User["preference"])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a job type" />
          </SelectTrigger>
          <SelectContent>
            {jobTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={profileLoading}>
        {profileLoading ? "Saving..." : "Save Profile"}
      </Button>
    </motion.form>
  );
}
