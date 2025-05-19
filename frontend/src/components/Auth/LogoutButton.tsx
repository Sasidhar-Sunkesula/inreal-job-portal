import { motion } from "motion/react";
import { buttonVariants } from "../ui/button";

export default function LogoutButton() {
  const handleLogout = () => {
    // TODO: Call logout API
    alert("Logged out");
  };
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={buttonVariants({ variant: "default" })}
      onClick={handleLogout}
    >
      Logout
    </motion.button>
  );
}
