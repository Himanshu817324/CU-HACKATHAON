import { NextResponse } from 'next/server';

export async function GET() {
  const dashboardData = {
    kpis: [
      {
        label: "Average Page Load",
        value: "1.2",
        unit: "s",
        change: -15
      },
      {
        label: "Total CO₂ Saved",
        value: "2.5",
        unit: "kg",
        change: 28
      },
      {
        label: "Eco Score",
        value: "79",
        change: 12
      },
      {
        label: "Optimizations Applied",
        value: "24",
        change: 8
      }
    ],
    projects: [
      {
        name: "EcoWeb",
        score: 86,
        co2Saved: 1.4,
        trend: "up",
        lastAnalyzed: "2 hours ago"
      },
      {
        name: "SustainBlog",
        score: 72,
        co2Saved: 0.8,
        trend: "up",
        lastAnalyzed: "1 day ago"
      },
      {
        name: "GreenStore",
        score: 58,
        co2Saved: 0.3,
        trend: "down",
        lastAnalyzed: "3 days ago"
      }
    ]
  };

  return NextResponse.json({
    success: true,
    data: dashboardData
  });
}

