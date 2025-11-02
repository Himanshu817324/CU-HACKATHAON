'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity } from 'lucide-react';

interface BreakdownItem {
  name: string;
  value: number;
  color: string;
}

interface BreakdownDonutChartProps {
  data: BreakdownItem[];
}

export default function BreakdownDonutChart({ data }: BreakdownDonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-6 border border-white/10 relative"
    >
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-[#34D399]" />
        <h3 className="text-2xl font-bold">Emission Breakdown</h3>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(7, 20, 40, 0.95)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                borderRadius: '12px',
                color: '#E6E8EB'
              }}
              formatter={(value: number) => [`${value}%`, 'Emission']}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ height: '300px' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#34D399]">{total}%</div>
            <div className="text-sm text-text-secondary">Total</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-text-secondary">{item.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
