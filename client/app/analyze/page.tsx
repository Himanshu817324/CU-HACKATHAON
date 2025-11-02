'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, memo, useMemo } from 'react';
import { Sparkles, TrendingUp, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroInput from '@/components/HeroInput';
import OptimizationResults from '@/components/OptimizationResults';
import EmissionDashboard from '@/components/Analyze/CarbonTracker/EmissionDashboard';
import CreditsModal from '@/components/CreditsModal';
import { useAuth } from '@/contexts/AuthContext';
import { ScrollReveal } from '@/lib/scrollAnimations';

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
  const { user, deductCredits } = useAuth();
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
  const [creditsModalOpen, setCreditsModalOpen] = useState(false);

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
    // Check credits before analysis
    const creditsNeeded = type === 'url' ? 5 : 10;
    
    if (!user) {
      setError('Please log in to analyze projects.');
      return;
    }

    if (user.credits < creditsNeeded) {
      setError(`Insufficient credits. You need ${creditsNeeded} credits to analyze.`);
      setCreditsModalOpen(true);
      return;
    }

    // Deduct credits
    const success = deductCredits(creditsNeeded);
    if (!success) {
      setError('Failed to deduct credits. Please try again.');
      return;
    }

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

        const mappedData = apiResponse.analysis.map((item: {
          fileName?: string;
          problemDescription?: string;
          problematicCode?: string;
          optimizedCode?: string;
          optimization?: string;
        }) => ({
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
      // For URL type, send POST request to our API route (which proxies to GCP)
      try {
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: inputValue, type: 'url' })
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-success/5 rounded-full blur-3xl" />
      </div>

      <Navbar />
      
      <div className="container mx-auto px-6 py-24 pt-32 relative z-10">
        <ScrollReveal variant="fadeInUp" className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Carbon Analysis</span>
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-text-primary via-primary to-success bg-clip-text text-transparent"
            >
              Analyze Your Project
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
            >
              Enter your website URL or GitHub repository to get instant carbon insights
            </motion.p>
          </div>

          {/* Input */}
          <ScrollReveal variant="fadeInUp" delay={0.2} className="mb-16">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="glass rounded-3xl p-8 border border-black/10 bg-white/80 backdrop-blur-xl shadow-xl mb-8"
              >
                <HeroInput 
                  onAnalyze={handleAnalyze}
                  onInputTypeChange={(type) => {
                    // Clear results immediately when switching input type
                    setHasResults(false);
                    setInputType(type);
                  }}
                  isAnalyzing={isAnalyzing}
                />
              </motion.div>
              
              {/* Quick stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                {[
                  { icon: TrendingUp, label: 'AI-Powered', value: 'Analysis' },
                  { icon: Zap, label: 'Real-time', value: 'Insights' },
                  { icon: Sparkles, label: 'Actionable', value: 'Recommendations' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="glass rounded-2xl p-6 border border-black/10 bg-white/60 backdrop-blur-xl text-center group"
                  >
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-sm font-medium text-text-secondary mb-1">{stat.label}</div>
                    <div className="text-lg font-bold text-text-primary">{stat.value}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Loading State */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-20"
              >
                {inputType === 'github' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <GitHubAnalyzingLoader hints={HINTS} currentHintIndex={currentHintIndex} />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block w-20 h-20 border-4 border-primary/30 border-t-primary rounded-full mb-6"
                    />
                    <p className="text-xl text-text-secondary font-medium">
                      Analyzing your project... This may take a few moments.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence>
            {error && (
              <ScrollReveal variant="fadeInUp">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass rounded-2xl p-6 border border-danger/50 bg-red-50/50 backdrop-blur-xl mb-8 shadow-lg"
                >
                  <p className="text-danger text-center font-medium">{error}</p>
                </motion.div>
              </ScrollReveal>
            )}
          </AnimatePresence>

          {/* Results - Website Analysis (Emission Metrics) */}
          <AnimatePresence mode="wait">
            {hasResults && inputType === 'url' && (
              <ScrollReveal variant="fadeInUp" delay={0.3}>
                <motion.div
                  key={`results-${inputType}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-12"
                >
                  <EmissionDashboard />
                </motion.div>
              </ScrollReveal>
            )}

            {/* Results - GitHub Analysis (Code Optimization Only) */}
            {hasResults && inputType === 'github' && githubData && (
              <ScrollReveal variant="fadeInUp" delay={0.3}>
                <motion.div
                  key={`results-${inputType}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-12 mt-12"
                >
                  {/* Code Optimization Results */}
                  <OptimizationResults 
                    key={`optimization-${inputType}`}
                    data={githubData}
                  />
                </motion.div>
              </ScrollReveal>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>

      <Footer />

      {/* Credits Modal */}
      <CreditsModal isOpen={creditsModalOpen} onClose={() => setCreditsModalOpen(false)} />
    </div>
  );
}

