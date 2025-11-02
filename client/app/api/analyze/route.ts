import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, type } = body;

    // If type is 'url', proxy to the GCP backend
    if (type === 'url' && url) {
      try {
        // Forward request to GCP HTTP backend
        const response = await fetch('http://34.63.195.56/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url })
        });

        if (!response.ok) {
          throw new Error('Failed to analyze website');
        }

        const data = await response.json();
        return NextResponse.json(data);
      } catch (error) {
        console.error('Error proxying to GCP backend:', error);
        return NextResponse.json(
          { success: false, error: 'Failed to analyze website' },
          { status: 500 }
        );
      }
    }

    // For GitHub type or fallback, return mock response
    await new Promise(resolve => setTimeout(resolve, 2000));

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

