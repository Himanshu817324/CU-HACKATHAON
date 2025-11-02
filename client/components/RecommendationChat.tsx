'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

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
  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <motion.div
          key={rec.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass rounded-2xl p-6 border border-black/10"
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
              <div className="text-sm text-success font-medium">
                Predicted improvement: {rec.impact}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

