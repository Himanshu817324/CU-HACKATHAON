'use client';

import { motion } from 'framer-motion';
import { ExternalLink, TrendingDown, TrendingUp } from 'lucide-react';

interface ProjectCardProps {
  name: string;
  score: number;
  co2Saved: number;
  trend: 'up' | 'down';
  lastAnalyzed: string;
  url?: string;
}

export default function ProjectCard({ name, score, co2Saved, trend, lastAnalyzed, url }: ProjectCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-accent';
    return 'text-danger';
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className="glass rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{name}</h3>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <span>Last analyzed: {lastAnalyzed}</span>
            {trend === 'up' && (
              <div className="flex items-center space-x-1 text-success">
                <TrendingUp className="w-4 h-4" />
                <span>Improving</span>
              </div>
            )}
            {trend === 'down' && (
              <div className="flex items-center space-x-1 text-danger">
                <TrendingDown className="w-4 h-4" />
                <span>Needs attention</span>
              </div>
            )}
          </div>
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <div className="text-sm text-text-secondary mb-1">Eco Score</div>
          <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score}
            <span className="text-base text-text-secondary">/100</span>
          </div>
        </div>
        <div>
          <div className="text-sm text-text-secondary mb-1">CO₂ Saved</div>
          <div className="text-3xl font-bold text-success">
            {co2Saved.toFixed(1)}
            <span className="text-base text-text-secondary"> kg</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

