import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db.js';
import { Booking } from '@/lib/models/Booking.js';
import { Service } from '@/lib/models/Service.js';
import { cookies } from 'next/headers';

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('next-auth.session-token');

    if (!sessionToken?.value) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { serviceId, duration, durationType, division, district, city, area, address, userEmail } = body;

    if (!serviceId || !duration || !durationType || !division || !district || !city || !area || !address) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    await connectDB();
    const service = await Service.findById(serviceId);
    
    if (!service) {
      return NextResponse.json(
        { message: 'Service not found' },
        { status: 404 }
      );
    }

    const rate = durationType === 'hours' ? service.pricePerHour : service.pricePerDay;
    const totalCost = rate * duration;

    const booking = await Booking.create({
      user: userEmail,
      service: serviceId,
      duration,
      durationType,
      division,
      district,
      city,
      area,
      address,
      totalCost,
      status: 'pending',
    });

    return NextResponse.json(
      { message: 'Booking created successfully', booking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('next-auth.session-token');

    if (!sessionToken?.value) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get('email');

    if (!userEmail) {
      return NextResponse.json(
        { message: 'Email required' },
        { status: 400 }
      );
    }

    await connectDB();
    const bookings = await Booking.find({ user: userEmail })
      .populate('service')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}