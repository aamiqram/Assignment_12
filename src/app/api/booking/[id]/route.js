import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db.js';
import { Booking } from '@/lib/models/Booking.js';
import { cookies } from 'next/headers';

export async function DELETE(req, { params }) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('next-auth.session-token');

    if (!sessionToken?.value) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('email');

    if (!userEmail) {
      return NextResponse.json({ message: 'Email required' }, { status: 400 });
    }

    await connectDB();

    const booking = await Booking.findOne({ _id: id, user: userEmail });
    
    if (!booking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    if (booking.status !== 'pending') {
      return NextResponse.json(
        { message: 'Can only cancel pending bookings' },
        { status: 400 }
      );
    }

    booking.status = 'cancelled';
    await booking.save();

    return NextResponse.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Cancel booking error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}