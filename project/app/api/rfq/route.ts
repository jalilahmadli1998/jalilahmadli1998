import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log('RFQ submission', data);
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
