'use client';

import { motion } from 'framer-motion';
import { Zap, Leaf, TrendingUp, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import KPICard, { KPIStrip } from '@/components/KPIStrip';
import ProjectCard from '@/components/ProjectCard';
import RecommendationChat from '@/components/RecommendationChat';
import { mockProjects, mockKPIs, mockEmissionData } from '@/lib/mockData';

// Icon mapping
const iconMap: Record<string, any> = {
  Zap,
  Leaf,
  TrendingUp,
  CheckCircle,
};

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-20 pt-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Welcome back, Himanshu 👋
          </h1>
          <p className="text-xl text-text-secondary">
            Here's your sustainability overview
          </p>
        </motion.div>

        {/* KPI Strip */}
        <KPIStrip>
          {mockKPIs.map((kpi, index) => {
            const Icon = iconMap[kpi.icon];
            return (
              <KPICard
                key={index}
                icon={Icon}
                label={kpi.label}
                value={kpi.value}
                change={kpi.change}
                unit={kpi.unit}
                delay={index * 0.1}
              />
            );
          })}
        </KPIStrip>

        {/* Projects Grid */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Your Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">AI Recommendations</h2>
          <RecommendationChat recommendations={mockEmissionData.recommendations} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

