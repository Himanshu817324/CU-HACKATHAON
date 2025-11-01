'use client';

import { Gauge, Leaf, Zap } from 'lucide-react';
import { dashboardAnalytics } from '@/lib/mockData';
import StatCard from './components/StatCard';
import Header from './components/Header';
import LiveInsightsCard from './components/LiveInsightsCard';

export default function DashboardPage() {
  const { emissionScore, co2Saved, energyEfficiency } = dashboardAnalytics;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <Header />

      {/* Main Content Grid - 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Stats (2/3 width) */}
        <div className="lg:col-span-2">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
          </div>
        </div>

        {/* Right Column - Live Insights (1/3 width) */}
        <div className="lg:col-span-1">
          <LiveInsightsCard />
        </div>
      </div>
    </div>
  );
}