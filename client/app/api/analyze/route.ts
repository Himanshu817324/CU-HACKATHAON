import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, type } = body;

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock response
    const response = {
      success: true,
      data: {
        project: url || 'example.com',
        score: 86,
        emissions: 312,
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
        ],
        analyzedAt: new Date().toISOString()
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Analysis failed' },
      { status: 500 }
    );
  }
}

