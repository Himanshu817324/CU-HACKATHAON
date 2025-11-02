'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingDown } from 'lucide-react';

interface EmissionTrend {
  day: string;
  emission: number;
}

interface EmissionLineChartProps {
  data: EmissionTrend[];
}

export default function EmissionLineChart({ data }: EmissionLineChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-6 border border-black/10"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-1">Emission Over Time</h3>
          <p className="text-text-secondary text-sm">7-day trend</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#34D399]/20">
          <TrendingDown className="w-4 h-4 text-[#34D399]" />
          <span className="text-sm font-semibold text-[#34D399]">-20%</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorEmission" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34D399" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="day" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            label={{ value: 'gCO₂e', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(7, 20, 40, 0.95)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              borderRadius: '12px',
              color: '#E6E8EB'
            }}
            formatter={(value: number) => [`${value} gCO₂e`, 'Emission']}
          />
          <Area
            type="monotone"
            dataKey="emission"
            stroke="#34D399"
            strokeWidth={3}
            fill="url(#colorEmission)"
            dot={{ fill: '#34D399', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
