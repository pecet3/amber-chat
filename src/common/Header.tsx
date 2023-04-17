import React from "react";
import { motion } from "framer-motion";
export const Header = () => {
  return (
    <header className="my-6">
      <p>Welcome to...</p>

      <motion.h1
        className="text-4xl"
        animate={{ x: 0, scale: 1 }}
        initial={{ x: -1000, scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        JakubChat
      </motion.h1>
    </header>
  );
};
