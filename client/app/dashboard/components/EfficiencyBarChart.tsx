'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Zap } from 'lucide-react';

interface EfficiencyGain {
  category: string;
  gain: number;
}

interface EfficiencyBarChartProps {
  data: EfficiencyGain[];
}

export default function EfficiencyBarChart({ data }: EfficiencyBarChartProps) {
  // Determine color based on gain value
  const getColor = (gain: number) => {
    if (gain >= 35) return '#34D399'; // Green
    if (gain >= 20) return '#38BDF8'; // Blue
    return '#FACC15'; // Yellow
  };

  const dataWithColors = data.map(item => ({
    ...item,
    color: getColor(item.gain)
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-2xl p-6 border border-black/10"
    >
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-[#FACC15]" />
        <h3 className="text-2xl font-bold">Efficiency Gains</h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataWithColors} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis type="number" domain={[0, 50]} stroke="#9CA3AF" style={{ fontSize: '12px' }} />
          <YAxis 
            type="category" 
            dataKey="category" 
            stroke="#9CA3AF" 
            style={{ fontSize: '12px' }}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(7, 20, 40, 0.95)',
              border: '1px solid rgba(250, 204, 21, 0.3)',
              borderRadius: '12px',
              color: '#E6E8EB'
            }}
            formatter={(value: number) => [`+${value}%`, 'Efficiency Gain']}
          />
          <Bar dataKey="gain" radius={[0, 8, 8, 0]}>
            {dataWithColors.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
