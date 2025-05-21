import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@/types";
import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function SignupForm() {
  // Step tracking
  const [step, setStep] = useState(1);

  // Basic info (Step 1)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Profile info (Step 2)
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState<number | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [preference, setPreference] = useState<User["preference"]>("Any");

  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSkillToggle = (skill: string) => {
    setSkills(
      skills.includes(skill)
        ? skills.filter((s) => s !== skill)
        : [...skills, skill]
    );
  };

  function nextStep() {
    setStep(2);
  }

  function prevStep() {
    setStep(1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === 1) {
      nextStep();
      return;
    }

    await signup(
      name,
      email,
      password,
      location,
      experience || 0,
      skills,
      preference
    );
    navigate(ROUTES.Home);
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-8 bg-card p-8 rounded-lg shadow max-w-md mx-auto relative overflow-hidden"
    >
      <h2 className="text-2xl font-bold text-center">
        {step === 1 ? "Sign Up" : "Complete Your Profile"}
      </h2>

      <motion.div key="step-indicator" className="flex justify-center mb-4">
        <div className="flex items-center space-x-2">
          <motion.div
            className={`h-3 w-3 rounded-full ${
              step === 1 ? "bg-primary" : "bg-muted"
            }`}
            animate={{ scale: step === 1 ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className={`h-3 w-3 rounded-full ${
              step === 2 ? "bg-primary" : "bg-muted"
            }`}
            animate={{ scale: step === 2 ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      <motion.div
        key={`step-${step}`}
        initial={{ x: step === 1 ? -300 : 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: step === 1 ? -300 : 300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {step === 1 ? (
          // Step 1: Basic Information
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                placeholder="Enter your name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                placeholder="Enter your email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                placeholder="Enter your password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        ) : (
          // Step 2: Profile Information
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={location}
                placeholder="Enter your location"
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <Input
                type="number"
                min="0"
                value={experience || ""}
                placeholder="Enter years of experience"
                onChange={(e) => setExperience(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Job Preference</Label>
              <Select
                value={preference}
                onValueChange={(value) =>
                  setPreference(value as (typeof jobTypes)[number])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {skillsList.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      skills.includes(skill)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {step === 2 && (
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            className="flex-1"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Back
            </motion.span>
          </Button>
        )}
        <Button type="submit" className="flex-1" disabled={loading}>
          <motion.span
            key={`button-text-${step}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {loading
              ? "Processing..."
              : step === 1
              ? "Next"
              : "Complete Signup"}
          </motion.span>
        </Button>
      </motion.div>
    </motion.form>
  );
}
