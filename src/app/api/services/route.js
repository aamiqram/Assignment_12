import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db.js';
import { Service } from '@/lib/models/Service.js';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    await connectDB();
    
    if (slug) {
      const service = await Service.findOne({ slug }).lean();
      if (!service) {
        return NextResponse.json({ message: 'Service not found' }, { status: 404 });
      }
      return NextResponse.json({ service });
    }

    const services = await Service.find({}).lean();
    return NextResponse.json({ services });
  } catch (error) {
    console.error('Services error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}