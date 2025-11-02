'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, memo, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroInput from '@/components/HeroInput';
import OptimizationResults from '@/components/OptimizationResults';
import EmissionDashboard from '@/components/Analyze/CarbonTracker/EmissionDashboard';

// Hints array - defined outside component to avoid recreating on every render
const HINTS = [
  "Analyzing code complexity...",
  "Detecting redundant functions...",
  "Evaluating cyclomatic complexity...",
  "Checking import optimizations...",
  "Scanning file dependencies...",
  "Identifying performance bottlenecks...",
  "Analyzing memory usage patterns...",
  "Detecting unused code blocks...",
  "Evaluating bundle size optimizations...",
  "Checking for code duplication...",
  "Analyzing network request patterns...",
  "Evaluating render performance...",
  "Detecting inefficient algorithms...",
  "Scanning for security vulnerabilities...",
  "Analyzing API call patterns...",
  "Checking component re-render patterns...",
  "Evaluating state management efficiency...",
  "Detecting memory leaks...",
  "Analyzing async/await patterns...",
  "Checking for optimal data structures..."
];

// Three-dot loader component with shifting forward animation
function ThreeDotLoader() {
  return (
    <div className="flex items-center justify-center gap-3">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-3 h-3 bg-primary rounded-full"
          animate={{
            y: [0, -12, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.4,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// GitHub analyzing loader component - memoized to prevent unnecessary re-renders
interface GitHubAnalyzingLoaderProps {
  hints: string[];
  currentHintIndex: number;
}

const GitHubAnalyzingLoader = memo(function GitHubAnalyzingLoader({ hints, currentHintIndex }: GitHubAnalyzingLoaderProps) {
  const currentHint = useMemo(() => hints[currentHintIndex] || hints[0], [hints, currentHintIndex]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-6">
        {/* Three-dot loader */}
        <div className="py-4">
          <ThreeDotLoader />
        </div>

        {/* Main message */}
        <div className="space-y-4">
          <p className="text-xl font-semibold text-text-primary">
            Analyzing your GitHub repository...
          </p>
          
          {/* Rotating hints - simplified animation for better performance */}
          <div className="min-h-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentHintIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="text-lg text-text-secondary"
              >
                {currentHint}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
});

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
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  // Rotate through hints while analyzing - optimized with useMemo and faster interval
  useEffect(() => {
    if (!isAnalyzing || inputType !== 'github') {
      setCurrentHintIndex(0);
      return;
    }

    // Faster rotation to show more hints (1.5 seconds instead of 2)
    const interval = setInterval(() => {
      setCurrentHintIndex((prev) => (prev + 1) % HINTS.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [isAnalyzing, inputType]);

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
    setCurrentHintIndex(0);

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
    } else if (type === 'url' && inputValue) {
      // For URL type, send POST request to the API
      try {
        const response = await fetch('http://34.63.195.56/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: inputValue })
        });

        if (!response.ok) {
          throw new Error('Failed to analyze website');
        }

        const apiResponse = await response.json();
        
        // Store the response for later use
        localStorage.setItem('websiteAnalysis', JSON.stringify(apiResponse));
        
        setIsAnalyzing(false);
        setHasResults(true);
      } catch (err) {
        console.error('Error analyzing website:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to analyze website. Please try again.';
        setError(errorMessage);
        setIsAnalyzing(false);
      }
    } else {
      // Fallback for URL type without input
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
              isAnalyzing={isAnalyzing}
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
                <GitHubAnalyzingLoader hints={HINTS} currentHintIndex={currentHintIndex} />
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

