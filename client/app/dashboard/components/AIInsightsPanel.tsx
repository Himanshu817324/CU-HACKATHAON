'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, CheckCircle, Circle } from 'lucide-react';

interface AIRecommendation {
  text: string;
  impact: 'High' | 'Medium' | 'Low';
  category: string;
  saved: string;
}

interface AIInsightsPanelProps {
  recommendations: AIRecommendation[];
  overallScore: number;
}

export default function AIInsightsPanel({ recommendations, overallScore }: AIInsightsPanelProps) {
  const [completed, setCompleted] = useState<string[]>([]);

  const toggleCompleted = (index: string) => {
    setCompleted(prev => 
      prev.includes(index) 
        ? prev.filter(id => id !== index)
        : [...prev, index]
    );
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-[#34D399] text-[#071428]';
      case 'Medium': return 'bg-[#38BDF8] text-[#071428]';
      case 'Low': return 'bg-[#FACC15] text-[#071428]';
      default: return 'bg-gray-500';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'High': return '🔥';
      case 'Medium': return '⚡';
      case 'Low': return '💡';
      default: return '•';
    }
  };

  // Calculate radial progress
  const circumference = 2 * Math.PI * 45;
  const progress = (overallScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass rounded-2xl p-6 border border-black/10"
    >
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-[#38BDF8]" />
        <h3 className="text-2xl font-bold">AI Recommendations</h3>
      </div>

      {/* Radial Progress Widget */}
      <div className="mb-8 flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="transform -rotate-90 w-40 h-40">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="45"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <motion.circle
              cx="80"
              cy="80"
              r="45"
              stroke="#34D399"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: overallScore / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeDasharray={circumference}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-[#34D399]">{overallScore}</span>
            <span className="text-sm text-text-secondary">Eco Score</span>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {recommendations.map((rec, index) => {
          const isCompleted = completed.includes(rec.category);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="relative group"
            >
              <div 
                className={`
                  glass rounded-xl p-4 border cursor-pointer transition-all
                  ${isCompleted ? 'border-[#34D399]/50 bg-[#34D399]/10' : 'border-black/10 hover:border-[#34D399]/30'}
                `}
                onClick={() => toggleCompleted(rec.category)}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="mt-0.5"
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-[#34D399]" />
                    ) : (
                      <Circle className="w-5 h-5 text-text-secondary" />
                    )}
                  </motion.button>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-sm">{rec.text}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getImpactColor(rec.impact)}`}>
                        {getImpactIcon(rec.impact)} {rec.impact}
                      </span>
                      <span className="text-xs text-text-secondary">{rec.saved}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
