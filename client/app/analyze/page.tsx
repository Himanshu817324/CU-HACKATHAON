'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroInput from '@/components/HeroInput';
import OptimizationResults from '@/components/OptimizationResults';
import EmissionDashboard from '@/components/Analyze/CarbonTracker/EmissionDashboard';

export default function Analyze() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [inputType, setInputType] = useState<'url' | 'github'>('url');

  const handleAnalyze = (type: 'url' | 'github') => {
    // Reset results when starting a new analysis or when type changes
    if (inputType !== type) {
      setHasResults(false);
    }
    setInputType(type);
    setIsAnalyzing(true);
    setHasResults(false); // Clear results before new analysis
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
            <HeroInput 
              onAnalyze={handleAnalyze}
              onInputTypeChange={(type) => {
                // Clear results immediately when switching input type
                setHasResults(false);
                setInputType(type);
              }}
            />
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

          {/* Results - Website Analysis (Emission Metrics) */}
          {hasResults && inputType === 'url' && (
            <motion.div
              key={`results-${inputType}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <EmissionDashboard />
            </motion.div>
          )}

          {/* Results - GitHub Analysis (Code Optimization Only) */}
          {hasResults && inputType === 'github' && (
            <motion.div
              key={`results-${inputType}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Code Optimization Results */}
              <OptimizationResults key={`optimization-${inputType}`} />
            </motion.div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

