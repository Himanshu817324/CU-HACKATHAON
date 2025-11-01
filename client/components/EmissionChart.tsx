'use client';

import { motion } from 'framer-motion';

interface EmissionChartProps {
  data: { category: string; value: number; color: string }[];
  total: number;
}

export default function EmissionChart({ data, total }: EmissionChartProps) {
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  return (
    <div className="glass rounded-2xl p-8 border border-white/10">
      <h3 className="text-2xl font-bold mb-6">Emissions Breakdown</h3>
      <div className="space-y-4">
        {sortedData.map((item, index) => {
          const percentage = (item.value / total) * 100;
          return (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-secondary">{item.category}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold">{item.value}%</span>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                </div>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

