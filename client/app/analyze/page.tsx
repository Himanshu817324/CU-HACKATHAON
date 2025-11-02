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
  const [githubData, setGithubData] = useState<{
    fileName: string;
    problemDescription: string;
    problematicCode: string;
    problematicCodeOptimized: string;
    codeOptimisationSummary: string;
  }[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (type: 'url' | 'github', inputValue?: string) => {
    // Reset results when starting a new analysis or when type changes
    if (inputType !== type) {
      setHasResults(false);
      setGithubData(null);
    }
    setInputType(type);
    setIsAnalyzing(true);
    setHasResults(false);
    setError(null);
    setGithubData(null);

    if (type === 'github' && inputValue) {
      try {
        // Create FormData with repo_url
        const formData = new FormData();
        formData.append('repo_url', inputValue);

        const response = await fetch('https://llm-ai-fx0s.onrender.com/analyze_repo', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Failed to analyze repository');
        }

        const apiResponse = await response.json();
        
        // Extract analysis array and map to our component's expected format
        if (!apiResponse.analysis || !Array.isArray(apiResponse.analysis)) {
          throw new Error('Invalid response format from API');
        }

        const mappedData = apiResponse.analysis.map((item: any) => ({
          fileName: item.fileName || '',
          problemDescription: item.problemDescription || '',
          problematicCode: item.problematicCode || '',
          problematicCodeOptimized: item.optimizedCode || '',
          codeOptimisationSummary: item.optimization || ''
        }));

        setGithubData(mappedData);
        setIsAnalyzing(false);
        setHasResults(true);
      } catch (err) {
        console.error('Error analyzing repository:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to analyze repository. Please try again.';
        setError(errorMessage);
        setIsAnalyzing(false);
      }
    } else {
      // For URL type, use the existing mock flow
      setTimeout(() => {
        setIsAnalyzing(false);
        setHasResults(true);
      }, 3000);
    }
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
              {inputType === 'github' ? (
                <div className="space-y-6">
                  {/* Interactive Loader */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-24 h-24">
                      <motion.div
                        className="absolute inset-0 border-4 border-primary/20 rounded-full"
                      />
                      <motion.div
                        className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.div
                        className="absolute inset-0 border-4 border-transparent border-r-accent rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-8 h-8 bg-primary rounded-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-semibold text-text-primary">
                        Analyzing your GitHub repository...
                      </p>
                      <p className="text-lg text-text-secondary">
                        This may take around 40–50 seconds.
                      </p>
                      <motion.div
                        className="mt-4 max-w-md mx-auto"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 45, ease: 'linear' }}
                      >
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary via-accent to-success rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 45, ease: 'linear' }}
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="inline-block w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                  <p className="text-lg text-text-secondary">
                    Analyzing your project... This may take a few moments.
                  </p>
                </>
              )}
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 border border-danger/50 mb-8"
            >
              <p className="text-danger text-center">{error}</p>
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
          {hasResults && inputType === 'github' && githubData && (
            <motion.div
              key={`results-${inputType}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Code Optimization Results */}
              <OptimizationResults 
                key={`optimization-${inputType}`}
                data={githubData}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

