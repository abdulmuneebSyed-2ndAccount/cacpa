"use client";

import { motion, useAnimation } from "framer-motion";
import { TypeIcon as type, type LucideIcon } from "lucide-react";
import { useEffect } from "react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: FeatureCardProps) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.2 },
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-lg"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent opacity-0"
        initial={false}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Icon with animations */}
      <motion.div
        className="mb-4 inline-block rounded-lg bg-blue-100 p-3"
        whileHover={{
          scale: 1.2,
          rotate: 360,
          transition: { duration: 0.8 },
        }}
      >
        <Icon className="h-6 w-6 text-blue-600" />
      </motion.div>

      {/* Content */}
      <motion.h3
        className="mb-2 text-xl font-semibold text-gray-900"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.3 }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="text-gray-600"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.4 }}
      >
        {description}
      </motion.p>

      {/* Animated border */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-400"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
