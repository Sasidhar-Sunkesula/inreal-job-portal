import { useAuth } from "@/context/AuthContext";
import { motion } from "motion/react";
import { buttonVariants } from "../ui/button";

export default function LogoutButton() {
  const { logout, loading } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={buttonVariants({ variant: "secondary" })}
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </motion.button>
  );
}
