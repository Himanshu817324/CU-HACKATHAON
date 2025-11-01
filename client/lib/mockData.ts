export const mockEmissionData = {
  project: "EcoWeb",
  score: 86,
  co2Saved: 1.4,
  trend: [70, 75, 80, 86],
  breakdown: {
    scripts: 30,
    images: 20,
    backend: 25,
    hosting: 25
  },
  recommendations: [
    {
      id: "1",
      title: "Compress high-resolution images",
      description: "Reduce image file sizes by 60% without visible quality loss using modern formats like WebP and AVIF.",
      impact: "Save ~45 gCO₂/page",
      category: "Optimization"
    },
    {
      id: "2",
      title: "Use serverless functions",
      description: "Replace always-on servers with serverless functions to cut idle compute power by 70%.",
      impact: "Save ~120 gCO₂/page",
      category: "Backend"
    },
    {
      id: "3",
      title: "Implement lazy loading",
      description: "Defer loading of below-the-fold assets until they're needed, reducing initial page weight.",
      impact: "Save ~28 gCO₂/page",
      category: "Performance"
    }
  ]
};

export const mockProjects = [
  {
    name: "EcoWeb",
    score: 86,
    co2Saved: 1.4,
    trend: "up" as const,
    lastAnalyzed: "2 hours ago",
    url: "https://example.com"
  },
  {
    name: "SustainBlog",
    score: 72,
    co2Saved: 0.8,
    trend: "up" as const,
    lastAnalyzed: "1 day ago",
    url: "https://example.com"
  },
  {
    name: "GreenStore",
    score: 58,
    co2Saved: 0.3,
    trend: "down" as const,
    lastAnalyzed: "3 days ago",
    url: "https://example.com"
  }
];

export const mockKPIs = [
  {
    icon: "Zap",
    label: "Average Page Load",
    value: "1.2",
    unit: "s",
    change: -15
  },
  {
    icon: "Leaf",
    label: "Total CO₂ Saved",
    value: "2.5",
    unit: "kg",
    change: 28
  },
  {
    icon: "TrendingUp",
    label: "Eco Score",
    value: "79",
    change: 12
  },
  {
    icon: "CheckCircle",
    label: "Optimizations Applied",
    value: "24",
    change: 8
  }
];

export const mockComparison = {
  before: 820,
  after: 312,
  label: "Carbon Emissions per Page"
};

