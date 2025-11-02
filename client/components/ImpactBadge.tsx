'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ImpactBadgeProps {
  label: string;
  value: number;
  unit?: string;
  trend?: number[];
}

export default function ImpactBadge({ label, value, unit = 'gCO₂', trend }: ImpactBadgeProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const isGrade = label.includes('A+') || label.includes('A') || label.includes('B') || label.includes('C') || label.includes('D') || label.includes('F');
  
  const getGradeColor = (label: string) => {
    if (label.includes('A+') || label.includes('A')) return 'text-success';
    if (label.includes('B')) return 'text-accent';
    return 'text-danger';
  };

  // Counter animation for carbon emitted values
  useEffect(() => {
    if (!isGrade) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = value / steps;
      const stepDuration = duration / steps;

      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [value, isGrade]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center space-x-3 px-4 py-3 rounded-2xl glass border border-black/10"
    >
      <div className="flex flex-col">
        <motion.span
          className={`text-sm font-bold ${getGradeColor(label)}`}
          animate={isGrade ? {
            scale: [1, 1.15, 1],
            textShadow: [
              '0 0 0px currentColor',
              '0 0 10px currentColor, 0 0 20px currentColor',
              '0 0 0px currentColor',
            ],
          } : {}}
          transition={isGrade ? {
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          } : {}}
        >
          {label}
        </motion.span>
        <motion.span 
          className="text-2xl font-semibold text-text-primary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {isGrade ? value.toFixed(0) : displayValue.toFixed(0)}
          <span className="text-sm text-text-secondary ml-1">/{unit}</span>
        </motion.span>
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

