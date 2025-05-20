import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "../ui/mode-toggle";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "@/context/AuthContext";
import LogoutButton from "../Auth/LogoutButton";

export default function Navbar() {
  const { user } = useAuth();
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
          {Object.entries(ROUTES).map(([key, value]) => (
            <Link
              key={value}
              to={value}
              className={buttonVariants({
                variant: location.pathname === value ? "default" : "ghost",
                size: "sm",
              })}
            >
              {key}
            </Link>
          ))}
          {user ? (
            <LogoutButton />
          ) : (
            <>
              <Link
                to="/login"
                className={buttonVariants({
                  variant: location.pathname === "/login" ? "default" : "ghost",
                  size: "sm",
                })}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={buttonVariants({
                  variant:
                    location.pathname === "/signup" ? "default" : "ghost",
                  size: "sm",
                })}
              >
                Signup
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </motion.nav>
  );
}
