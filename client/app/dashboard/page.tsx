'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Gauge, Leaf, Zap, TrendingUp, Sparkles, Trophy, BarChart3, Activity, Clock, CheckCircle, Coins } from 'lucide-react';
import { dashboardAnalytics, mockProjects } from '@/lib/mockData';
import { useAuth } from '@/contexts/AuthContext';
import StatCard from './components/StatCard';
import Header from './components/Header';
import LiveInsightsCard from './components/LiveInsightsCard';
import EmissionLineChart from './components/EmissionLineChart';
import BreakdownDonutChart from './components/BreakdownDonutChart';
import CreditsModal from '@/components/CreditsModal';

export default function DashboardPage() {
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);
  const { user } = useAuth();
  const { 
    emissionScore, 
    co2Saved, 
    energyEfficiency, 
    requestsOptimized, 
    aiRecommendationsUsed, 
    ecoRank,
    emissionTrend,
    breakdown,
    aiRecommendations
  } = dashboardAnalytics;

  // Recent activity data
  const recentActivity = [
    { icon: CheckCircle, text: 'Optimized image compression for EcoWeb', time: '2 hours ago', color: '#34D399' },
    { icon: CheckCircle, text: 'Applied AI recommendation for lazy loading', time: '5 hours ago', color: '#34D399' },
    { icon: Activity, text: 'Generated weekly emission report', time: '1 day ago', color: '#38BDF8' },
  ];

  // Quick stats
  const quickStats = [
    { label: 'Requests Optimized', value: requestsOptimized.toLocaleString(), icon: TrendingUp, color: '#38BDF8' },
    { label: 'AI Recommendations Used', value: `${aiRecommendationsUsed}%`, icon: Sparkles, color: '#FACC15' },
    { label: 'Eco Rank', value: ecoRank, icon: Trophy, color: '#34D399' },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <Header />

      {/* Main Content Layout - flex on desktop */}
      <div className="flex flex-col lg:flex-row gap-3 mb-8">
        {/* Left Column - Main Stats (flexible width) */}
        <div className="flex-1 min-w-0">
          {/* Top Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <StatCard
              icon={Gauge}
              label="Emission Score"
              value={emissionScore}
              color="#34D399"
              delay={0.1}
            />
            <StatCard
              icon={Leaf}
              label="CO₂ Saved"
              value={co2Saved}
              unit="kg"
              color="#38BDF8"
              delay={0.2}
            />
            <StatCard
              icon={Zap}
              label="Energy Efficiency"
              value={energyEfficiency}
              unit="%"
              color="#34D399"
              delay={0.3}
            />
            <StatCard
              icon={Coins}
              label="Credits"
              value={user?.credits || 0}
              color="#FACC15"
              delay={0.4}
            />
          </div>

          {/* Chart Section */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <EmissionLineChart data={emissionTrend} />
          </div>

          {/* Breakdown Chart */}
          <div className="mb-6">
            <BreakdownDonutChart data={breakdown} />
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="glass rounded-xl p-4 border border-white/10 hover:border-opacity-30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-text-secondary mb-1">{stat.label}</p>
                      <p className="text-xl font-bold" style={{ color: stat.color }}>
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Right Column - Live Insights & Activity (fixed width) */}
        <div className="lg:w-80 shrink-0 space-y-6">
          <LiveInsightsCard />

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-[#34D399]" />
              <h3 className="text-xl font-bold">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0"
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${activity.color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: activity.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">{activity.text}</p>
                      <p className="text-xs text-text-secondary">{activity.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* AI Recommendations Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#38BDF8]" />
              <h3 className="text-xl font-bold">Top AI Recommendations</h3>
            </div>
            <div className="space-y-3">
              {aiRecommendations.slice(0, 3).map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full bg-[#38BDF8] mt-2 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-1">{rec.text}</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        rec.impact === 'High' 
                          ? 'bg-[#34D399]/20 text-[#34D399]'
                          : 'bg-[#FACC15]/20 text-[#FACC15]'
                      }`}>
                        {rec.impact}
                      </span>
                      <span className="text-xs text-text-secondary">{rec.saved}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Projects Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#34D399]" />
            <h3 className="text-xl font-bold">Recent Projects</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockProjects.slice(0, 3).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + index * 0.1 }}
              className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">{project.name}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-[#34D399]/20 text-[#34D399] font-bold">
                  {project.score}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">CO₂ Saved</span>
                  <span className="font-bold text-[#34D399]">{project.co2Saved} kg</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#34D399] to-[#38BDF8]"
                    style={{ width: `${project.score}%` }}
                  />
                </div>
                <p className="text-xs text-text-secondary">Analyzed {project.lastAnalyzed}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Get More Credits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="glass rounded-2xl p-8 border border-white/10 bg-gradient-to-br from-accent/10 to-primary/10"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FACC15] to-[#34D399] flex items-center justify-center">
              <Coins className="w-8 h-8 text-[#071428]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Running Low on Credits?</h3>
              <p className="text-text-secondary">
                You currently have {user?.credits || 0} credits remaining
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCreditsModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-[#FACC15] to-[#34D399] text-[#071428] font-bold rounded-2xl hover:shadow-lg hover:shadow-[#FACC15]/30 transition-all"
          >
            Get More Credits
          </motion.button>
        </div>
      </motion.div>

      {/* Credits Modal */}
      <CreditsModal isOpen={creditsModalOpen} onClose={() => setCreditsModalOpen(false)} />
    </div>
  );
}