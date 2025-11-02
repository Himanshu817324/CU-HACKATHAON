import { NextResponse } from 'next/server';
import { mockProjects } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockProjects
  });
}

