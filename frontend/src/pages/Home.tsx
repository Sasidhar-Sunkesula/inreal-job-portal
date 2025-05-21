import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { buttonVariants } from "../components/ui/button";
import { ROUTES } from "../constants/routes";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-6xl font-bold text-primary"
      >
        Find Your{" "}
        <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
          Perfect Job
        </span>{" "}
        with AI
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="text-lg text-muted-foreground max-w-xl"
      >
        Sign up, create your profile, and let our AI recommend the best jobs for
        you. Fast, smart, and personalized.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex gap-4 justify-center"
      >
        <Link
          to="/login"
          className={buttonVariants({
            variant: "default",
            size: "lg",
          })}
        >
          Get Started
        </Link>
        <Link
          to={ROUTES.Jobs}
          className={buttonVariants({
            variant: "outline",
            size: "lg",
          })}
        >
          Browse Jobs
        </Link>
      </motion.div>
    </section>
  );
}
