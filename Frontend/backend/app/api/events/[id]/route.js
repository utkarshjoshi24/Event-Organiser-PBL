import dbConnect from '../../../../lib/mongodb';
import Event from '../../../../models/Event';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = await params;
  
  let events = await Event.find({ clubId: id });
  
  // Seed events if none for club 1
  if (events.length === 0 && id === '1') {
    const seedEvents = [
      { id: 'e1', title: 'Classical Evening', clubId: '1', total_seats: 100, available_seats: 20 },
      { id: 'e2', title: 'Raga Workshops', clubId: '1', total_seats: 50, available_seats: 50 },
      { id: 'e3', title: 'Symphony Under Stars', clubId: '1', total_seats: 200, available_seats: 15 },
    ];
    await Event.insertMany(seedEvents);
    events = await Event.find({ clubId: id });
  }

  const response = NextResponse.json(events);
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { id } = await params;
    await Event.findOneAndDelete({ id });
    const response = NextResponse.json({ success: true }, { status: 200 });
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
