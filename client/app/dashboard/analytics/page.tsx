'use client';

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';
import EmissionLineChart from '../components/EmissionLineChart';
import BreakdownDonutChart from '../components/BreakdownDonutChart';
import EfficiencyBarChart from '../components/EfficiencyBarChart';
import { dashboardAnalytics } from '@/lib/mockData';

export default function AnalyticsPage() {
  const { emissionTrend, breakdown, efficiencyGains } = dashboardAnalytics;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-8 h-8 text-[#34D399]" />
          <h1 className="text-4xl font-bold">Advanced Analytics</h1>
        </div>
        <p className="text-text-secondary">
          Deep insights into your carbon footprint and optimization opportunities
        </p>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <EmissionLineChart data={emissionTrend} />
        </div>
        <BreakdownDonutChart data={breakdown} />
        <EfficiencyBarChart data={efficiencyGains} />
      </div>
    </div>
  );
}
