'use client';

import { motion } from 'framer-motion';
import { Search, GitBranch } from 'lucide-react';
import { useState } from 'react';

interface HeroInputProps {
  onAnalyze?: (inputType: 'url' | 'github') => void;
  onInputTypeChange?: (inputType: 'url' | 'github') => void;
}

export default function HeroInput({ onAnalyze, onInputTypeChange }: HeroInputProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputType, setInputType] = useState<'url' | 'github'>('url');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsLoading(false);
      onAnalyze?.(inputType);
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
          <div className="flex rounded-2xl glass border border-white/10 p-1">
            <button
              type="button"
              onClick={() => {
                const newType = 'url';
                setInputType(newType);
                onInputTypeChange?.(newType);
              }}
              className={`px-4 py-2 rounded-xl transition-all ${
                inputType === 'url'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span className="text-sm font-medium">Website</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                const newType = 'github';
                setInputType(newType);
                onInputTypeChange?.(newType);
              }}
              className={`px-4 py-2 rounded-xl transition-all ${
                inputType === 'github'
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="flex items-center space-x-2">
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
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                inputType === 'url'
                  ? 'https://example.com'
                  : 'owner/repository'
              }
              className="w-full px-6 py-4 rounded-2xl glass border border-white/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/5 text-text-primary placeholder:text-text-secondary"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-8 py-4 bg-primary text-white rounded-2xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing...</span>
              </div>
            ) : (
              'Analyze My Site'
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
              onClick={() => setInput('vercel/next.js')}
              className="text-xs px-3 py-1 rounded-full glass border border-white/10 text-text-secondary hover:text-text-primary transition-colors"
            >
              vercel/next.js
            </button>
            <button
              onClick={() => setInput('facebook/react')}
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

