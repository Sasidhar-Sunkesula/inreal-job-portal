import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Jobs" },
  { to: "/profile", label: "Profile" },
  { to: "/recommendations", label: "Find My Matches" },
  { to: "/login", label: "Login" },
  { to: "/signup", label: "Sign Up" },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white dark:bg-background shadow-sm sticky top-0 z-50"
    >
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="font-bold text-xl text-primary">
          inreal.jobs
        </Link>
        <div className="flex gap-4 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={buttonVariants({
                variant: location.pathname === link.to ? "default" : "ghost",
                size: "sm",
              })}
            >
              {link.label}
            </Link>
          ))}
          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
