'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroInput from '@/components/HeroInput';
import ImpactBadge from '@/components/ImpactBadge';
import RecommendationChat from '@/components/RecommendationChat';
import OptimizationResults from '@/components/OptimizationResults';
import { mockEmissionData } from '@/lib/mockData';

export default function Analyze() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [inputType, setInputType] = useState<'url' | 'github'>('url');

  const handleAnalyze = (type: 'url' | 'github') => {
    setInputType(type);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResults(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-6 py-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Analyze Your Project
            </h1>
            <p className="text-xl text-text-secondary">
              Enter your website URL or GitHub repository to get instant carbon insights
            </p>
          </div>

          {/* Input */}
          <div className="mb-12">
            <HeroInput onAnalyze={handleAnalyze} />
          </div>

          {/* Loading State */}
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-block w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
              <p className="text-lg text-text-secondary">
                Analyzing your project... This may take a few moments.
              </p>
            </motion.div>
          )}

          {/* Results */}
          {hasResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {/* Score Cards */}
              <div className="flex flex-wrap justify-center gap-4">
                <ImpactBadge label="A+" value={mockEmissionData.score} unit="score" />
                <ImpactBadge label="312" value={312} trend={[400, 350, 320, 312]} />
              </div>

              {/* Breakdown */}
              <div className="glass rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-6">Emissions Breakdown</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-text-secondary mb-2">Scripts</div>
                    <div className="text-3xl font-bold text-primary">
                      {mockEmissionData.breakdown.scripts}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary mb-2">Images</div>
                    <div className="text-3xl font-bold text-accent">
                      {mockEmissionData.breakdown.images}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary mb-2">Backend</div>
                    <div className="text-3xl font-bold text-success">
                      {mockEmissionData.breakdown.backend}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-text-secondary mb-2">Hosting</div>
                    <div className="text-3xl font-bold text-danger">
                      {mockEmissionData.breakdown.hosting}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Optimization Results - Only for GitHub */}
              {inputType === 'github' && (
                <div>
                  <OptimizationResults />
                </div>
              )}

              {/* Recommendations */}
              <div>
                <h2 className="text-2xl font-bold mb-6">AI Recommendations</h2>
                <RecommendationChat recommendations={mockEmissionData.recommendations} />
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

