'use client';

import { motion } from 'framer-motion';

interface ImpactBadgeProps {
  label: string;
  value: number;
  unit?: string;
  trend?: number[];
}

export default function ImpactBadge({ label, value, unit = 'gCO₂', trend }: ImpactBadgeProps) {
  const getGradeColor = (label: string) => {
    if (label.includes('A+') || label.includes('A')) return 'text-success';
    if (label.includes('B')) return 'text-accent';
    return 'text-danger';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center space-x-3 px-4 py-3 rounded-2xl glass border border-white/10"
    >
      <div className="flex flex-col">
        <span className={`text-sm font-bold ${getGradeColor(label)}`}>{label}</span>
        <span className="text-2xl font-semibold text-text-primary">
          {value.toFixed(0)}
          <span className="text-sm text-text-secondary ml-1">/{unit}</span>
        </span>
      </div>

      {/* Mini Sparkline */}
      {trend && trend.length > 0 && (
        <div className="hidden md:block">
          <svg width="40" height="20" viewBox="0 0 40 20">
            <polyline
              points={trend.map((val, i) => `${(i / (trend.length - 1)) * 40},${20 - (val / 100) * 20}`).join(' ')}
              fill="none"
              stroke="url(#sparklineGradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E85A4F" />
                <stop offset="100%" stopColor="#00B87C" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </motion.div>
  );
}

