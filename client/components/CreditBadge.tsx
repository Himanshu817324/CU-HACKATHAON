'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, Sparkles } from 'lucide-react';

interface CreditBadgeProps {
  credits: number;
  className?: string;
  showLabel?: boolean;
  onClick?: () => void;
}

export default function CreditBadge({ credits, className = '', showLabel = false, onClick }: CreditBadgeProps) {
  const [displayCredits, setDisplayCredits] = useState(credits);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animate credit changes
  useEffect(() => {
    if (credits !== displayCredits) {
      setIsAnimating(true);
      const diff = credits - displayCredits;
      const steps = Math.abs(diff);
      const stepSize = diff / steps;
      const duration = Math.min(steps * 20, 1000);

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setDisplayCredits(Math.round(displayCredits + (stepSize * currentStep)));
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setDisplayCredits(credits);
          setIsAnimating(false);
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }
  }, [credits]);

  // Get color based on credit amount
  const getColorClass = () => {
    if (credits > 50) return 'text-success';
    if (credits > 20) return 'text-accent';
    return 'text-danger';
  };

  const getBgColor = () => {
    if (credits > 50) return 'bg-success/20 border-success/30';
    if (credits > 20) return 'bg-accent/20 border-accent/30';
    return 'bg-danger/20 border-danger/30';
  };

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${getBgColor()} border cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={isAnimating ? { rotate: [0, -10, 10, -10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        <Coins className={`w-4 h-4 ${getColorClass()}`} />
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.span
          key={displayCredits}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`text-sm font-bold ${getColorClass()}`}
        >
          {displayCredits}
        </motion.span>
      </AnimatePresence>
      {showLabel && (
        <span className="text-xs text-text-secondary">credits</span>
      )}
    </motion.div>
  );
}

