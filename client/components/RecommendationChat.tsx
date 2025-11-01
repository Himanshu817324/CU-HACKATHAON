'use client';

import { motion } from 'framer-motion';
import { Sparkles, Check, Code } from 'lucide-react';
import { useState } from 'react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: string;
  category: string;
}

interface RecommendationChatProps {
  recommendations: Recommendation[];
}

export default function RecommendationChat({ recommendations }: RecommendationChatProps) {
  const [accepted, setAccepted] = useState<Set<string>>(new Set());

  const handleAccept = (id: string) => {
    setAccepted(new Set([...accepted, id]));
  };

  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <motion.div
          key={rec.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold mb-1">{rec.title}</h4>
                  <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent">
                    {rec.category}
                  </span>
                </div>
              </div>
              <p className="text-text-secondary text-sm mb-3">{rec.description}</p>
              <div className="text-sm text-success font-medium mb-4">
                Predicted improvement: {rec.impact}
              </div>
              <div className="flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAccept(rec.id)}
                  disabled={accepted.has(rec.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                    accepted.has(rec.id)
                      ? 'bg-success/10 text-success cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>{accepted.has(rec.id) ? 'Accepted' : 'Accept'}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl border border-white/10 text-text-secondary hover:text-text-primary hover:border-primary/50 transition-colors"
                >
                  <Code className="w-4 h-4" />
                  <span>View Code</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

