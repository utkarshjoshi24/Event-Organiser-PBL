import dbConnect from '../../../lib/mongodb';
import Event from '../../../models/Event';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find({});
    const response = NextResponse.json(events);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  } catch (err) {
    console.error("DEBUG ERROR:", err);
    return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}
