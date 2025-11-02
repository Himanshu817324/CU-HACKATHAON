'use client';

import { motion } from 'framer-motion';
import { Search, GitBranch } from 'lucide-react';
import { useState } from 'react';

interface HeroInputProps {
  onAnalyze?: (inputType: 'url' | 'github', inputValue?: string) => void;
  onInputTypeChange?: (inputType: 'url' | 'github') => void;
  isAnalyzing?: boolean; // Parent's analyzing state
}

export default function HeroInput({ onAnalyze, onInputTypeChange, isAnalyzing = false }: HeroInputProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputType, setInputType] = useState<'url' | 'github'>('url');
  const [error, setError] = useState<string | null>(null);
  
  // Use parent's isAnalyzing state for GitHub type, local isLoading for URL type
  const showLoading = inputType === 'github' ? isAnalyzing : isLoading;

  const validateGitHubUrl = (url: string): boolean => {
    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
    return githubRegex.test(url.trim());
  };

  const normalizeGitHubUrl = (url: string): string => {
    let normalized = url.trim();
    // If user enters owner/repo format, convert to full URL
    if (!normalized.includes('github.com') && !normalized.startsWith('http')) {
      normalized = `https://github.com/${normalized}`;
    }
    // Ensure it starts with https://
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      normalized = `https://${normalized}`;
    }
    return normalized;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Validate GitHub URL if GitHub tab is selected
    if (inputType === 'github') {
      const normalizedUrl = normalizeGitHubUrl(input);
      if (!validateGitHubUrl(normalizedUrl)) {
        setError('Please enter a valid GitHub repository URL.');
        return;
      }
      setError(null);
      // Pass control to parent for API call - parent will handle loading state
      // Don't set isLoading here, let parent manage the loading UI
      onAnalyze?.(inputType, normalizedUrl);
      return;
    }

    // For URL type, proceed as before
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onAnalyze?.(inputType, input.trim());
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Input Type Toggle */}
          <div className="flex w-full md:w-auto rounded-2xl glass border border-white/10 p-1">
            <button
              type="button"
              onClick={() => {
                const newType = 'url';
                setInputType(newType);
                setIsLoading(false);
                setError(null);
                onInputTypeChange?.(newType);
              }}
              className={`flex-1 md:flex-none px-4 py-2 rounded-xl transition-all ${
                inputType === 'url'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Search className="w-4 h-4" />
                <span className="text-sm font-medium">Website</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                const newType = 'github';
                setInputType(newType);
                setIsLoading(false);
                setError(null);
                onInputTypeChange?.(newType);
              }}
              className={`flex-1 md:flex-none px-4 py-2 rounded-xl transition-all ${
                inputType === 'github'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <GitBranch className="w-4 h-4" />
                <span className="text-sm font-medium">GitHub</span>
              </div>
            </button>
          </div>

          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(null); // Clear error on input change
              }}
              placeholder={
                inputType === 'url'
                  ? 'https://example.com'
                  : 'https://github.com/owner/repo'
              }
              className={`w-full px-6 py-4 rounded-2xl glass border ${
                error ? 'border-danger/50' : 'border-white/10'
              } focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/5 text-text-primary placeholder:text-text-secondary`}
            />
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 mt-2 text-sm text-danger"
              >
                {error}
              </motion.div>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={showLoading || !input.trim()}
            className="px-8 py-4 bg-primary text-white rounded-2xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing...</span>
              </div>
            ) : (
              <>
                {inputType === 'github' ? 'Analyze Repository' : 'Analyze My Site'}
                <span className="ml-2 text-xs opacity-90">
                  ({inputType === 'github' ? '10' : '5'} credits)
                </span>
              </>
            )}
          </motion.button>
        </div>
      </form>

      {/* Quick Examples */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <span className="text-xs text-text-secondary">Try:</span>
        {inputType === 'url' ? (
          <>
            <button
              onClick={() => setInput('https://google.com')}
              className="text-xs px-3 py-1 rounded-full glass border border-white/10 text-text-secondary hover:text-text-primary transition-colors"
            >
              google.com
            </button>
            <button
              onClick={() => setInput('https://github.com')}
              className="text-xs px-3 py-1 rounded-full glass border border-white/10 text-text-secondary hover:text-text-primary transition-colors"
            >
              github.com
            </button>
          </>
          ) : (
          <>
            <button
              onClick={() => setInput('https://github.com/vercel/next.js')}
              className="text-xs px-3 py-1 rounded-full glass border border-white/10 text-text-secondary hover:text-text-primary transition-colors"
            >
              vercel/next.js
            </button>
            <button
              onClick={() => setInput('https://github.com/facebook/react')}
              className="text-xs px-3 py-1 rounded-full glass border border-white/10 text-text-secondary hover:text-text-primary transition-colors"
            >
              facebook/react
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

