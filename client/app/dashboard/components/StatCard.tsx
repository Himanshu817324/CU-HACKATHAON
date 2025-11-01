'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  unit?: string;
  color: string;
  delay?: number;
}

export default function StatCard({ icon: Icon, label, value, unit, color, delay = 0 }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState<number | string>(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated && typeof value === 'number') {
      const duration = 1500;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.floor(value * easeOutQuart));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
          setHasAnimated(true);
        }
      };
      
      const timeoutId = setTimeout(() => animate(), delay * 1000);
      return () => clearTimeout(timeoutId);
    } else if (typeof value === 'string') {
      setDisplayValue(value);
    }
  }, [value, delay, hasAnimated]);

  // Determine border color based on value
  const getBorderColor = () => {
    if (typeof value === 'string') return 'from-[#34D399] to-[#12B76A]';
    if (value >= 80) return 'from-[#34D399] to-[#12B76A]'; // Green
    if (value >= 50) return 'from-[#38BDF8] to-[#0EA5E9]'; // Blue
    return 'from-[#FACC15] to-[#F59E0B]'; // Yellow
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass rounded-2xl p-6 border border-white/10 hover:border-opacity-30 transition-all cursor-pointer relative overflow-hidden group"
    >
      {/* Gradient border effect on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getBorderColor()} opacity-0 group-hover:opacity-20 transition-opacity`} />
      
      <div className="relative z-10">
        {/* Icon */}
        <div 
          className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
          style={{ background: `${color}20` }}
        >
          <Icon 
            className="w-6 h-6" 
            style={{ color }}
          />
        </div>
        
        {/* Value */}
        <div className="flex items-end gap-2 mb-2">
          <span 
            className="text-3xl md:text-4xl font-bold"
            style={{ color }}
          >
            {typeof displayValue === 'string' ? displayValue : displayValue.toLocaleString()}
          </span>
          {unit && (
            <span className="text-text-secondary text-lg mb-1">{unit}</span>
          )}
        </div>
        
        {/* Label */}
        <p className="text-text-secondary text-sm font-medium">
          {label}
        </p>
        
        {/* Glowing dot indicator */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-6 right-6 w-2 h-2 rounded-full"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    </motion.div>
  );
}
