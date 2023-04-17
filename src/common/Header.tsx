import React from "react";
import { motion } from "framer-motion";
export const Header = () => {
  return (
    <header className="my-10">
      <p>Welcome to...</p>

      <motion.h1
        className="text-4xl"
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        JakubChat
      </motion.h1>
    </header>
  );
};
