'use client';

import { Gauge, Leaf, TrendingUp, Zap, Sparkles, Trophy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { dashboardAnalytics } from '@/lib/mockData';
import Header from './components/Header';
import StatCard from './components/StatCard';
import EmissionLineChart from './components/EmissionLineChart';
import BreakdownDonutChart from './components/BreakdownDonutChart';
import EfficiencyBarChart from './components/EfficiencyBarChart';
import AIInsightsPanel from './components/AIInsightsPanel';

export default function Dashboard() {
  const { 
    emissionScore, 
    co2Saved, 
    energyEfficiency, 
    requestsOptimized, 
    aiRecommendationsUsed, 
    ecoRank,
    emissionTrend,
    breakdown,
    efficiencyGains,
    aiRecommendations
  } = dashboardAnalytics;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        {/* Header */}
        <Header />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
            icon={TrendingUp}
            label="Requests Optimized"
            value={requestsOptimized}
            color="#38BDF8"
            delay={0.4}
          />
          <StatCard
            icon={Sparkles}
            label="AI Recommendations Used"
            value={aiRecommendationsUsed}
            unit="%"
            color="#FACC15"
            delay={0.5}
          />
          <StatCard
            icon={Trophy}
            label="Eco Rank"
            value={ecoRank}
            color="#34D399"
            delay={0.6}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Line Chart - Span 2 columns */}
          <div className="lg:col-span-2">
            <EmissionLineChart data={emissionTrend} />
          </div>
          
          {/* Donut Chart */}
          <div className="relative">
            <BreakdownDonutChart data={breakdown} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2">
            <EfficiencyBarChart data={efficiencyGains} />
          </div>

          {/* AI Insights Panel */}
          <div>
            <AIInsightsPanel 
              recommendations={aiRecommendations}
              overallScore={emissionScore}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}