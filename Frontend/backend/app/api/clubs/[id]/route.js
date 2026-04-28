import dbConnect from '../../../../lib/mongodb';
import Club from '../../../../models/Club';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const { id } = await params;
    await Club.findOneAndDelete({ id });
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
