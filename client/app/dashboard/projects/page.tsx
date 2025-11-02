'use client';

import { motion } from 'framer-motion';
import { Users, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { mockProjects } from '@/lib/mockData';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-[#34D399]" />
            <h1 className="text-4xl font-bold">Projects</h1>
          </div>
          <p className="text-text-secondary">
            Manage and track your sustainability projects
          </p>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#34D399] to-[#38BDF8] text-[#071428] font-semibold hover:shadow-lg hover:shadow-[#34D399]/30 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-6 border border-black/10 hover:border-[#34D399]/30 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{project.name}</h3>
              {project.trend === 'up' ? (
                <TrendingUp className="w-5 h-5 text-[#34D399]" />
              ) : (
                <TrendingDown className="w-5 h-5 text-[#E85A4F]" />
              )}
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">Eco Score</span>
                  <span className="font-bold">{project.score}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.score}%` }}
                    transition={{ delay: index * 0.2 }}
                    className="h-full bg-gradient-to-r from-[#34D399] to-[#38BDF8]"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">CO₂ Saved</span>
                <span className="font-bold text-[#34D399]">{project.co2Saved} kg</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary">Last Analyzed</span>
                <span>{project.lastAnalyzed}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
