'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  TrendingUp, 
  Server, 
  Network, 
  Cpu, 
  Download,
  Clock,
  Navigation,
  FileText,
  Paintbrush,
  MemoryStick,
  Zap,
  Leaf
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data structure (will be replaced with API call later)
const mockEmissionData = {
  url: 'https://example.com',
  metrics: {
    navigation: { duration: 950, ttfb: 340.6, loadTime: 950 },
    resources: { totalResources: 1, totalTransferSize: 813, byType: { other: '0.79 KB' } },
    paint: { 'first-paint': '984.00', 'first-contentful-paint': '984.00' },
    memory: { jsHeapUsed: '1.07 MB', jsHeapTotal: '1.51 MB' }
  },
  co2Estimate: {
    co2: {
      total: 0.0001204866,
      dataCenterCO2e: 0.00002690867,
      networkCO2e: 0.00002891678,
      consumerDeviceCO2e: 0.00006466114,
      rating: 'A+'
    },
    green: false,
    variables: {
      bytes: 813,
      gridIntensity: {
        device: { value: 494 },
        dataCenter: { value: 494 },
        network: { value: 494 }
      }
    }
  }
};

interface EmissionData {
  url: string;
  metrics: {
    navigation: { duration: number; ttfb: number; loadTime: number };
    resources: { totalResources: number; totalTransferSize: number; byType: Record<string, string> };
    paint: Record<string, string>;
    memory: { jsHeapUsed: string; jsHeapTotal: string };
  };
  co2Estimate: {
    co2: {
      total: number;
      dataCenterCO2e: number;
      networkCO2e: number;
      consumerDeviceCO2e: number;
      rating: string;
    };
    green: boolean;
    variables: {
      bytes: number;
      gridIntensity: {
        device: { value: number };
        dataCenter: { value: number };
        network: { value: number };
      };
    };
  };
}

export default function EmissionDashboard() {
  const [data, setData] = useState<EmissionData>(mockEmissionData);

  useEffect(() => {
    // Get data from localStorage if it exists (set by analyze page)
    const storedData = localStorage.getItem('websiteAnalysis');
    if (storedData) {
      try {
        const apiResponse = JSON.parse(storedData);
        
        // Map API response to our component's data structure
        if (apiResponse.analysis) {
          const analysis = apiResponse.analysis;
          const mappedData: EmissionData = {
            url: analysis.url || 'Unknown URL',
            metrics: {
              navigation: {
                duration: Number(analysis.metrics?.navigation?.duration) || 0,
                ttfb: Number(analysis.metrics?.navigation?.ttfb) || 0,
                loadTime: Number(analysis.metrics?.navigation?.loadTime) || 0
              },
              resources: {
                totalResources: Number(analysis.metrics?.resources?.totalResources) || 0,
                totalTransferSize: Number(analysis.metrics?.resources?.totalTransferSize) || 0,
                byType: analysis.metrics?.resources?.byType || {}
              },
              paint: analysis.metrics?.paint || {},
              memory: {
                jsHeapUsed: analysis.metrics?.memory?.jsHeapUsed || '0 MB',
                jsHeapTotal: analysis.metrics?.memory?.jsHeapTotal || '0 MB'
              }
            },
            co2Estimate: {
              co2: {
                total: Number(analysis.co2) || 0,
                dataCenterCO2e: 0, // Not provided in API response
                networkCO2e: 0, // Not provided in API response
                consumerDeviceCO2e: 0, // Not provided in API response
                rating: analysis.green ? 'A' : 'C' // Simple rating based on green status
              },
              green: analysis.green || false,
              variables: {
                bytes: Number(analysis.totalTransferBytes) || 0,
                gridIntensity: {
                  device: { value: Number(analysis.variables?.gridIntensity?.device?.value) || 494 },
                  dataCenter: { value: Number(analysis.variables?.gridIntensity?.dataCenter?.value) || 494 },
                  network: { value: Number(analysis.variables?.gridIntensity?.network?.value) || 494 }
                }
              }
            }
          };
          
          setData(mappedData);
        } else {
          // If no analysis field, use mock data
          setData(mockEmissionData);
        }
      } catch (error) {
        console.error('Error parsing stored data:', error);
        setData(mockEmissionData);
      }
    } else {
      // Fallback to mock data if nothing stored
      setData(mockEmissionData);
    }
  }, []);

  // Format CO2 values
  const formatCO2 = (value: number) => {
    // Ensure value is a number
    const numValue = typeof value === 'number' && !isNaN(value) ? value : parseFloat(String(value)) || 0;
    
    if (numValue === 0 || isNaN(numValue)) {
      return '0 g';
    }
    if (numValue < 0.001) {
      return `${(numValue * 1000).toFixed(3)} mg`;
    }
    return `${numValue.toFixed(6)} g`;
  };

  // Calculate total CO2 in grams
  const totalCO2Grams = data.co2Estimate.co2.total * 1000;

  // Stats cards data
  const statsCards = [
    {
      icon: TrendingUp,
      label: 'Total CO₂ Emission',
      value: formatCO2(data.co2Estimate.co2.total),
      color: '#E85A4F'
    },
    {
      icon: Server,
      label: 'Data Center CO₂',
      value: formatCO2(data.co2Estimate.co2.dataCenterCO2e),
      color: '#38BDF8'
    },
    {
      icon: Network,
      label: 'Network CO₂',
      value: formatCO2(data.co2Estimate.co2.networkCO2e),
      color: '#FACC15'
    },
    {
      icon: Cpu,
      label: 'Device CO₂',
      value: formatCO2(data.co2Estimate.co2.consumerDeviceCO2e),
      color: '#34D399'
    },
    {
      icon: Download,
      label: 'Total Transfer Size',
      value: `${(data.co2Estimate.variables.bytes / 1024).toFixed(2)} KB`,
      color: '#A855F7'
    },
    {
      icon: Clock,
      label: 'Total Load Time',
      value: `${(data.metrics.navigation.loadTime / 1000).toFixed(2)} s`,
      color: '#00B87C'
    }
  ];

  // Pie chart data for CO2 distribution - filter out zero values
  const co2Distribution = [
    { name: 'Data Center', value: data.co2Estimate.co2.dataCenterCO2e * 1000, color: '#38BDF8' },
    { name: 'Network', value: data.co2Estimate.co2.networkCO2e * 1000, color: '#FACC15' },
    { name: 'Device', value: data.co2Estimate.co2.consumerDeviceCO2e * 1000, color: '#34D399' }
  ].filter(item => item.value > 0); // Only show non-zero values

  // Bar chart data for performance metrics
  const performanceMetrics = [
    { name: 'TTFB', value: data.metrics.navigation.ttfb },
    { name: 'Load Time', value: data.metrics.navigation.loadTime },
    { name: 'Duration', value: data.metrics.navigation.duration },
    { name: 'First Paint', value: parseFloat(data.metrics.paint['first-paint'] || '0') }
  ];

  // Get rating color
  const getRatingColor = (rating: string) => {
    if (rating.includes('A+') || rating.includes('A')) return 'text-success';
    if (rating.includes('B')) return 'text-accent';
    return 'text-danger';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-text-primary">{data.url}</h3>
              <p className="text-sm text-text-secondary">
                Estimated carbon output: {formatCO2(data.co2Estimate.co2.total)} CO₂ per load
              </p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 border border-primary/30`}
          >
            <span className={`text-2xl font-bold ${getRatingColor(data.co2Estimate.co2.rating)}`}>
              {data.co2Estimate.co2.rating}
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass rounded-2xl p-6 border border-white/10 hover:border-opacity-30 transition-all cursor-pointer relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div 
                className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                style={{ background: `${card.color}20` }}
              >
                <card.icon 
                  className="w-6 h-6" 
                  style={{ color: card.color }}
                />
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span 
                  className="text-3xl font-bold"
                  style={{ color: card.color }}
                >
                  {card.value}
                </span>
              </div>
              <p className="text-text-secondary text-sm font-medium">
                {card.label}
              </p>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-6 right-6 w-2 h-2 rounded-full"
                style={{ background: card.color, boxShadow: `0 0 8px ${card.color}` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CO2 Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold mb-6">CO₂ Distribution</h3>
          {co2Distribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={co2Distribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: any) => {
                    const name = props.name || '';
                    const percent = props.percent || 0;
                    return `${name}: ${(percent * 100).toFixed(0)}%`;
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {co2Distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `${value.toFixed(3)} mg CO₂`}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px]">
              <p className="text-text-secondary text-center">
                CO₂ breakdown data not available.<br />
                Showing only total CO₂ emissions.
              </p>
            </div>
          )}
        </motion.div>

        {/* Performance Metrics Bar Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold mb-6">Load Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                label={{ value: 'Time (ms)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(7, 20, 40, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#E6E8EB'
                }}
                formatter={(value: number) => [`${value.toFixed(2)} ms`, 'Time']}
              />
              <Bar dataKey="value" fill="#00B87C" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Breakdown Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-xl font-bold mb-6">Detailed Breakdown</h3>
        <div className="space-y-4">
          {/* Navigation Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <Navigation className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-text-primary">Navigation Metrics</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-text-secondary mb-1">Duration</div>
                <div className="text-lg font-bold text-primary">{data.metrics.navigation.duration} ms</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">TTFB</div>
                <div className="text-lg font-bold text-accent">{Number(data.metrics.navigation.ttfb).toFixed(2)} ms</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">Load Time</div>
                <div className="text-lg font-bold text-success">{data.metrics.navigation.loadTime} ms</div>
              </div>
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="glass rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-text-primary">Resources</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-text-secondary mb-1">Total Resources</div>
                <div className="text-lg font-bold text-primary">{data.metrics.resources.totalResources}</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">Transfer Size</div>
                <div className="text-lg font-bold text-accent">{data.metrics.resources.totalTransferSize} bytes</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">Other</div>
                <div className="text-lg font-bold text-success">{data.metrics.resources.byType.other}</div>
              </div>
            </div>
          </motion.div>

          {/* Paint */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="glass rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <Paintbrush className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-text-primary">Paint Metrics</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-text-secondary mb-1">First Paint</div>
                <div className="text-lg font-bold text-primary">{data.metrics.paint['first-paint']} ms</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">First Contentful Paint</div>
                <div className="text-lg font-bold text-accent">{data.metrics.paint['first-contentful-paint']} ms</div>
              </div>
            </div>
          </motion.div>

          {/* Memory */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
            className="glass rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <MemoryStick className="w-5 h-5 text-primary" />
              <h4 className="font-semibold text-text-primary">Memory</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-text-secondary mb-1">JS Heap Used</div>
                <div className="text-lg font-bold text-primary">{data.metrics.memory.jsHeapUsed}</div>
              </div>
              <div>
                <div className="text-sm text-text-secondary mb-1">JS Heap Total</div>
                <div className="text-lg font-bold text-accent">{data.metrics.memory.jsHeapTotal}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Variables Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <h3 className="text-xl font-bold mb-6">System Variables</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Grid Intensity */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Grid Intensity (gCO₂/kWh)
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-text-secondary">Device</span>
                  <span className="text-sm font-semibold">{data.co2Estimate.variables.gridIntensity.device.value}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.co2Estimate.variables.gridIntensity.device.value / 600) * 100}%` }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="h-full bg-accent rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-text-secondary">Data Center</span>
                  <span className="text-sm font-semibold">{data.co2Estimate.variables.gridIntensity.dataCenter.value}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.co2Estimate.variables.gridIntensity.dataCenter.value / 600) * 100}%` }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-text-secondary">Network</span>
                  <span className="text-sm font-semibold">{data.co2Estimate.variables.gridIntensity.network.value}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(data.co2Estimate.variables.gridIntensity.network.value / 600) * 100}%` }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="h-full bg-success rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Green Hosting Status */}
          <div>
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-success" />
              Green Hosting Status
            </h4>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className={`flex items-center gap-3 p-4 rounded-xl ${
                  data.co2Estimate.green 
                    ? 'bg-success/20 border border-success/30' 
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${data.co2Estimate.green ? 'bg-success' : 'bg-danger'} animate-pulse`} />
                <div>
                  <div className="font-semibold">
                    {data.co2Estimate.green ? 'Green Energy Hosting' : 'Standard Hosting'}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {data.co2Estimate.green 
                      ? 'Powered by renewable energy sources' 
                      : 'Standard grid energy mix'}
                  </div>
                </div>
              </motion.div>
              <div className="glass rounded-xl p-4 border border-white/10">
                <div className="text-sm text-text-secondary mb-2">Green Energy Factor</div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.co2Estimate.green ? 100 : 0}%` }}
                    transition={{ delay: 1.3, duration: 1 }}
                    className="h-full bg-success rounded-full"
                  />
                </div>
                <div className="text-xs text-text-secondary mt-2">
                  {data.co2Estimate.green ? '100%' : '0%'} renewable energy
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center py-4"
      >
        <p className="text-sm text-text-secondary italic">
          All results are mock estimates. Live API integration coming soon.
        </p>
      </motion.div>
    </div>
  );
}

