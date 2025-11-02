'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Target, Award, AlertCircle, CheckCircle, LucideIcon } from 'lucide-react';

interface Insight {
  type: 'achievement' | 'warning' | 'info';
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const insights: Insight[] = [
  {
    type: 'achievement',
    title: 'Eco Champion',
    description: 'You\'ve reduced emissions by 24% this month',
    icon: Award,
    color: '#34D399'
  },
  {
    type: 'info',
    title: 'Weekly Goal',
    description: 'On track to save 2.5 kg CO₂ this week',
    icon: Target,
    color: '#38BDF8'
  },
  {
    type: 'warning',
    title: 'Attention Needed',
    description: '3 projects need optimization',
    icon: AlertCircle,
    color: '#FACC15'
  }
];

export default function RightSidebar() {
  return (
    <aside className="hidden xl:flex w-80 flex-col glass border-l border-white/10 overflow-y-auto">
      <div className="p-6 border-b border-white/10">
        <h3 className="text-xl font-bold mb-1">Live Insights</h3>
        <p className="text-sm text-text-secondary">Real-time updates</p>
      </div>

      <div className="flex-1 p-6 space-y-4">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-[#34D399]" />
            <h4 className="font-semibold">This Week</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">CO₂ Saved</span>
              <span className="text-[#34D399] font-bold">1.2 kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Optimizations</span>
              <span className="text-[#38BDF8] font-bold">18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Projects</span>
              <span className="text-[#FACC15] font-bold">12</span>
            </div>
          </div>
        </motion.div>

        {/* Insights */}
        <div className="space-y-3">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-4 border border-white/10 hover:border-opacity-30 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${insight.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: insight.color }} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-sm mb-1">{insight.title}</h5>
                    <p className="text-xs text-text-secondary">{insight.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl p-6 border border-white/10 flex flex-col items-center"
        >
          <div className="relative w-32 h-32 mb-4">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                stroke="#34D399"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 0.78 }}
                transition={{ duration: 2, ease: "easeOut" }}
                strokeDasharray={2 * Math.PI * 56}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-[#34D399]">78%</span>
              <span className="text-xs text-text-secondary">Monthly Goal</span>
            </div>
          </div>
          <p className="text-sm text-text-secondary text-center">
            6.2 of 8 kg CO₂ saved
          </p>
          <div className="flex items-center gap-2 mt-2">
            <CheckCircle className="w-4 h-4 text-[#34D399]" />
            <span className="text-xs text-[#34D399]">On track</span>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
