import dbConnect from '../../../lib/mongodb';
import Club from '../../../models/Club';
import { NextResponse } from 'next/server';

export async function GET(req) {
  await dbConnect();
  
  let clubs = await Club.find({});
  // If no clubs, seed some
  if (clubs.length === 0) {
    const seedClubs = [
      { id: '1', name: 'Swaragini: Monsoon Ragas', description: 'Experience the magic of traditional ragas performed live.' },
      { id: '2', name: 'Synthoria: Digital Pulse', description: 'Join us for a mesmerizing night of digital synths and futuristic beats.' }
    ];
    await Club.insertMany(seedClubs);
    clubs = await Club.find({});
  }
  
  const response = NextResponse.json(clubs);
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const newClub = await Club.create(body);
    const response = NextResponse.json(newClub, { status: 201 });
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}
