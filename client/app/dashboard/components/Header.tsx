'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#34D399] to-[#38BDF8] bg-clip-text text-transparent">
          Sustainability Insights Dashboard
        </h1>
        <p className="text-xl text-text-secondary">
          Real-time intelligence on your project's digital emissions
        </p>
      </div>
      
      {/* Animated eco-glow line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mt-6 h-1 bg-gradient-to-r from-transparent via-[#34D399] to-transparent rounded-full"
      />
    </motion.div>
  );
}
