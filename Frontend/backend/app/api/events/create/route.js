import dbConnect from '../../../../lib/mongodb';
import Event from '../../../../models/Event';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    // Auto generate id if not provided
    if (!body.id) {
        body.id = 'e' + Date.now().toString().slice(-4);
    }
    if (body.club_id && !body.clubId) {
        body.clubId = body.club_id.toString();
    }
    if (!body.available_seats) {
        body.available_seats = body.total_seats || 0;
    }
    
    const newEvent = await Event.create(body);
    const response = NextResponse.json({ success: true, event: newEvent }, { status: 201 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}
