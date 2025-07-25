"use client";
import { motion } from "framer-motion";

interface ThemedCardProps {
  children: React.ReactNode;
  className?: string;
  maskSelector?: string;
}

export default function ThemedCard({ children, className = "", maskSelector }: ThemedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`w-full max-w-xl main-card mb-8 ${className}`}
    >
      {children}
    </motion.div>
  );
} 