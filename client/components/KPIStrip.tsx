'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: number;
  unit?: string;
  delay?: number;
}

export default function KPICard({ icon: Icon, label, value, change, unit, delay = 0 }: KPICardProps) {
  const getChangeColor = (change?: number) => {
    if (!change) return 'text-text-secondary';
    return change > 0 ? 'text-success' : 'text-danger';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="glass rounded-2xl p-6 border border-black/10"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        {change !== undefined && (
          <span className={`text-sm font-semibold ${getChangeColor(change)}`}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold mb-1">
        {value}
        {unit && <span className="text-base text-text-secondary ml-1">{unit}</span>}
      </div>
      <div className="text-sm text-text-secondary">{label}</div>
    </motion.div>
  );
}

// Container for multiple KPI cards
export function KPIStrip({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{children}</div>;
}

