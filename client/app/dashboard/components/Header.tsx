'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-[#34D399] to-[#38BDF8] bg-clip-text text-transparent">
            Sustainability Insights Dashboard
          </h1>
          <p className="text-xl text-text-secondary">
            Real-time intelligence on your project's digital emissions
          </p>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 glass px-4 py-2 rounded-xl cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#34D399] to-[#38BDF8] flex items-center justify-center">
            <User className="w-5 h-5 text-[#071428]" />
          </div>
        </motion.div>
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
